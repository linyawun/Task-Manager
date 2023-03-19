import { useEffect, useState, useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { marked } from 'marked';
import axios from 'axios';
import { sweetAlert, sweetAlertToast } from '../utilities/helper';
import Dropdown from 'react-bootstrap/Dropdown';
import { formatTime } from '../utilities/helper';
import useLogOut from '../utilities/logOut';
import { UserContext } from '../store';

const TaskInfo = () => {
  const logOut = useLogOut();
  const { accessToken } = useContext(UserContext);
  const { owner, repo, issueNumber } = useParams();
  const [paramsIsVaild, setParamsIsVaild] = useState(true);
  const [issueInfo, setIssueInfo] = useState([]);

  const htmlTemplate = (content) => {
    return {
      __html: marked.parse(content),
    };
  };

  const handleDelete = async (e) => {
    try {
      const res = await axios.patch(
        `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`,
        { state: 'closed' },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      sweetAlertToast('Deleted successfully', 'success', 2000);
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (error) {
      if (error?.response?.status === 401) {
        sweetAlert('Login timeout, please login again', 'error');
        logOut();
      }
      console.log(error);
    }
  };

  useEffect(() => {
    const getIssueInfo = async () => {
      try {
        const res = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setParamsIsVaild(true);
        setIssueInfo([res.data]);
      } catch (error) {
        if (error?.response?.status === 401) {
          sweetAlert('Login timeout, please login again', 'error');
          logOut();
        }
        if (error?.response?.status === 404) {
          setParamsIsVaild(false);
        }
        console.log(error);
      }
    };

    getIssueInfo();
  }, []);

  return !paramsIsVaild ? (
    <Navigate to='/404' />
  ) : (
    <>
      {issueInfo.map((issue) => {
        return (
          <div className='card mb-5' key={issue.id}>
            <div className='card-body'>
              <div className='d-flex justify-content-between align-items-center'>
                <span
                  className='badge mb-2'
                  style={{ backgroundColor: `#${issue.labels[0].color}` }}
                >
                  {issue.labels[0].name}
                </span>
                <div className='dropdown'>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant=''
                      id='dropdown-basic'
                      className='dotBtn rounded-pill'
                    >
                      <span>
                        <i className='bi bi-three-dots-vertical'></i>
                      </span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='text-primary' container='body'>
                      <Dropdown.Item
                        href={`/edittask/${owner}/${repo}/${issueNumber}`}
                      >
                        <i className='bi bi-pencil-square me-2 text-secondary'></i>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleDelete}>
                        <i className='bi bi-trash3 me-2 text-danger'></i>Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>

              <p>
                <small>{issue.repository_url.split('repos/')[1]}</small>
              </p>
              <h3 className='card-title text-primary'>{issue.title}</h3>
              <div
                className='mb-6'
                dangerouslySetInnerHTML={htmlTemplate(issue.body)}
              ></div>
              <small className='text-light'>
                {formatTime(issue.created_at)}
              </small>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TaskInfo;
