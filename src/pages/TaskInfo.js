import { useEffect, useState, useContext } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { marked } from 'marked';
import axios from 'axios';
import TaskDropdown from '../components/TaskDropdown';
import useLogOut from '../utilities/logOut';
import { UserContext } from '../store';
import { sweetAlert, sweetAlertToast, formatTime } from '../utilities/helper';

const TaskInfo = () => {
  const navigate = useNavigate();
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

  const handleEdit = () => {
    navigate(`/edittask/${owner}/${repo}/${issueNumber}`);
  };

  const handleDelete = async (e) => {
    try {
      await axios.patch(
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
        navigate('/tasklist');
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
    if (!accessToken) {
      navigate('/');
      return;
    }
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
  }, [navigate, accessToken]);

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
                  <TaskDropdown
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
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
