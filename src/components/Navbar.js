import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import task_logo from '../assets/task_logo.png';
import { UserContext } from '../store';
import useLogOut from '../utilities/logOut';
export default function Navbar() {
  const { userName, accessToken } = useContext(UserContext);
  const logOut = useLogOut();
  return (
    <nav className='navbar navbar-light bg-light'>
      <div className='container-fluid'>
        <Link to='/' className='navbar-brand'>
          <img
            src={task_logo}
            alt=''
            className='d-inline-block align-middle me-2'
            style={{ herght: '30px', width: '30px' }}
          />
          Task Manager
        </Link>

        {accessToken && userName ? (
          <div className='d-flex justify-content-between align-items-center'>
            <p className='mb-0'>{userName}</p>
            <Dropdown>
              <Dropdown.Toggle
                variant=''
                id='dropdown-basic'
                className='arrowBtn rounded-pill'
              >
                <span>
                  <i className='bi bi-caret-down-fill'></i>
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className='text-primary' container='body'>
                <Dropdown.Item onClick={logOut}>
                  <i className='bi bi-box-arrow-right me-2 text-secondary'></i>
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          ''
        )}
      </div>
    </nav>
  );
}
