import React, { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './assets/all.scss';
import Navbar from './components/Navbar';
import {
  GithubLogin,
  TaskList,
  TaskInfo,
  AddTask,
  EditTask,
  ErrorPage,
} from './pages';
import ErrorBoundary from './components/ErrorBoundary';
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
        <HashRouter>
          <Navbar></Navbar>
          <div className='container mt-4'>
            <Routes>
              <Route path='/' element={<GithubLogin />} />
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
        </HashRouter>
      </UserContext.Provider>
    </ErrorBoundary>
  );
}
