import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import { UserContext } from '../store';
import { sweetAlert, formatTime } from '../utilities/helper';
import useLogOut from '../utilities/logOut';

const TaskList = () => {
  const logOut = useLogOut();
  const { userName, setUserName, accessToken } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);
  const [issueData, setIssueData] = useState([]);
  const [filterCriteria, setfilterCriteria] = useState({
    label: 'all',
    sort: 'desc', //新到舊
  });
  const [search, setSearch] = useState('');
  const listObserver = useRef(null);
  const currentPage = useRef(1);
  const isPageEnd = useRef(false);

  const onSearchHandler = (e) => {
    if (e.key === 'Enter') {
      setSearch(e.target.value);
    }
  };

  const handleSelect = (e) => {
    setfilterCriteria((pre) => {
      return {
        ...pre,
        [e.target.name]: e.target.value,
      };
    });
  };

  const getUser = async () => {
    try {
      const response = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        localStorage.setItem('userName', response.data.login);
        setUserName(response.data.login);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        sweetAlert('Login timeout, please login again', 'error');
        logOut();
      }
      console.log(error);
    }
  };

  const getIssues = async (page = 1, isNew = true) => {
    try {
      setIsLoading(true);
      isLoadingRef.current = true;
      let res = [];
      if (userName) {
        const keyword = search === '' ? '' : `${search} in:title,body`;
        const label =
          filterCriteria.label === 'all'
            ? ''
            : `label:"${filterCriteria.label}"`;
        let query = `${keyword} type:issue assignee:@me state:open ${label}`;
        try {
          const response = await axios.get(
            'https://api.github.com/search/issues',
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              params: {
                q: query,
                sort: 'created',
                order: filterCriteria.sort,
                per_page: 10,
                page: page,
              },
            }
          );
          res = response.data.items;
        } catch (error) {
          console.log(error);
        }
      }
      setIssueData((preData) => {
        if (isNew) {
          isPageEnd.current = false;
          return [...res];
        }
        if (res.length === 0) {
          isPageEnd.current = true;
        }
        return [...preData, ...res];
      });
      currentPage.current = page; // 每次都需要確認當前頁
      setTimeout(() => {
        isLoadingRef.current = false;
        setIsLoading(false);
      }, 300);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getIssues(1, true); //每次更新字串時，都會是新的查詢字串

    const options = {
      root: null,
      rootMargin: '0px 0px 50px 0px',
      threshold: 0,
    }; //觀察條件，root 為 null 預設為整個視窗 viewpoint，rootMargin 擴展 root 的範圍，threshold 是碰觸到該物件多少比例時就觸發

    const observerCallback = ([entry]) => {
      if (
        entry &&
        entry.isIntersecting &&
        !isLoadingRef.current &&
        !isPageEnd.current
      ) {
        //非讀取狀態時
        currentPage.current++;
        getIssues(currentPage.current, false);
      }
    };
    const observer = new IntersectionObserver(observerCallback, options);
    observer.observe(listObserver.current);
    return () => {
      if (listObserver.current) {
        observer.unobserve(listObserver.current);
      }
    }; //移除舊的觀察(監聽)
  }, [search, filterCriteria, userName]);

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className='row'>
        <div className='col-md-4 mb-md-0 mb-3'>
          <h4 className='text-primary'>Task Filter</h4>
          <div className='mb-3'>
            <label htmlFor='search' className='form-label'>
              Search
            </label>
            <input
              id='search'
              type='search'
              className='form-control'
              name='search'
              placeholder='press enter to search...'
              defaultValue={search}
              onKeyDown={onSearchHandler}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='label' className='form-label'>
              State
            </label>
            <select
              name='label'
              id='label'
              value={filterCriteria?.labels}
              onChange={handleSelect}
              className='form-select'
            >
              <option value='all'>all</option>
              <option value='open'>Open</option>
              <option value='in progress'>In Progress</option>
              <option value='done'>Done</option>
            </select>
          </div>
          <div className='mb-3'>
            <label htmlFor='sort' className='form-label'>
              Sort By
            </label>
            <select
              name='sort'
              id='sort'
              value={filterCriteria.sort}
              onChange={handleSelect}
              className='form-select'
            >
              <option value='desc'>Newest</option>
              <option value='asc'>Oldest</option>
            </select>
          </div>
        </div>
        <div className='col-md-8'>
          <div className='d-flex justify-content-between mb-4'>
            <h4 className='text-primary'>Task List</h4>
            <Link
              to='/addtask'
              className='btn btn-primary rounded-pill actionBtn'
            >
              Create Task
            </Link>
          </div>
          {issueData.length === 0 ? (
            <p className='text-center'>No Data</p>
          ) : (
            issueData.map((issue) => {
              const repoUrl = new URL(issue.repository_url);
              const owner = repoUrl.pathname.split('/')[2];
              const repoName = repoUrl.pathname.split('/')[3];
              return (
                <div className='card mb-2' key={issue.id}>
                  <div className='card-body'>
                    <span
                      className='badge mb-2'
                      style={{ backgroundColor: `#${issue.labels[0].color}` }}
                    >
                      {issue.labels[0].name}
                    </span>
                    <h5 className='card-title'>
                      <small>{issue.repository_url.split('repos/')[1]}</small>
                      <Link
                        to={`/taskinfo/${owner}/${repoName}/${issue.number}`}
                        className='link-primary ms-2'
                      >
                        {issue.title}
                      </Link>
                    </h5>
                    <small className='text-light'>
                      {formatTime(issue.created_at)}
                    </small>
                  </div>
                </div>
              );
            })
          )}
          <div className='observer' ref={listObserver}></div>
        </div>
      </div>
    </>
  );
};

export default TaskList;
