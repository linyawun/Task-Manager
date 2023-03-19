import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/all.scss';
import Navbar from './components/Navbar';
import TaskInfo from './components/TaskInfo';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import ErrorPage from './components/ErrorPage';
import GithubLogin from './components/GithubLogin';
import EditTask from './components/EditTask';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorScreen from './components/ErrorScreen';
import BackToTopButton from './components/BackToTopButton';
import { UserContext } from './store';

export function App() {
  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('github_accessToken')
  );
  return (
    <ErrorBoundary>
      <UserContext.Provider
        value={{ userName, setUserName, accessToken, setAccessToken }}
      >
        <BrowserRouter>
          <Navbar></Navbar>
          <div className='container mt-4'>
            <Routes>
              <Route exact path='/' element={<GithubLogin />} />
              <Route path='tasklist' element={<TaskList />}></Route>
              <Route
                path='taskinfo/:owner/:repo/:issueNumber'
                element={<TaskInfo />}
              />
              <Route path='/addtask' element={<AddTask />}></Route>
              <Route
                path='/edittask/:owner/:repo/:issueNumber'
                element={<EditTask />}
              ></Route>
              <Route path='/404' element={<ErrorPage />} />
              <Route path='*' element={<ErrorPage />} />
            </Routes>
          </div>
          <BackToTopButton />
        </BrowserRouter>
      </UserContext.Provider>
    </ErrorBoundary>
  );
}
