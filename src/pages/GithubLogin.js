import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import homePageImg from '../assets/homepage.jpg';
import { UserContext } from '../store';
import { sweetAlert } from '../utilities/helper';
import useLogOut from '../utilities/logOut';

const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';
const API_BASEURL = 'https://task-api-vercel.vercel.app';
const clientId = process.env.REACT_APP_CLIENTID;
const clientSecret = process.env.REACT_APP_CLIENTSECRET;
const scope = 'user, public_repo';

const GithubLogin = () => {
  const logOut = useLogOut();
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useContext(UserContext);
  const redirectUrI = window.location.href;
  const handleGithubLogin = async () => {
    const githubAuthUrl = `${GITHUB_AUTH_URL}?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUrI}`;
    window.location.href = githubAuthUrl;
  };
  function clearPathParams() {
    const currentPath = window.location.pathname;
    window.history.replaceState(null, '', currentPath);
  }

  const getAccessToken = async (code) => {
    try {
      const res = await axios.post(`${API_BASEURL}/getAccessToken`, {
        clientId,
        clientSecret,
        code,
      });
      if (res.status === 200) {
        localStorage.setItem('github_accessToken', res.data.access_token);
        setAccessToken(res.data.access_token);
      } else {
        sweetAlert('Login timeout, please login again', 'error');
        logOut();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // 從 URL 中獲取授權碼(code)
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    // 如果 URL 中存在授權碼(code)且還沒有accesstoken，則發送 POST 請求以獲取訪問權限令牌(access token)
    if (code && !accessToken) {
      getAccessToken(code);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      clearPathParams();
      setTimeout(() => {
        navigate('/tasklist');
      }, 600);
    }
  }, [accessToken]);

  return (
    <>
      <div className='row justify-content-center align-items-center mb-4'>
        <div className='col-md-6 mb-4 mb-md-0'>
          <img src={homePageImg} alt='' className='homeImg' />
        </div>
        <div className='col-md-6'>
          {accessToken ? (
            <h3 className='text-primary'>you are logged in, redirecting...</h3>
          ) : (
            <>
              <h3 className='text-primary'>Welcome to the entrance</h3>
              <h3 className='text-primary'>Log in to continue.</h3>
              <p className='text-muted'>
                Don't have an account?{' '}
                <a
                  href='https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home'
                  target='_blank'
                  rel='noreferrer'
                  className='link-secondary'
                >
                  Create a new account
                </a>
              </p>
              <button
                type='button'
                className='btn btn-primary rounded-pill CTA mt-3'
                onClick={handleGithubLogin}
              >
                GitHub Log In
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default GithubLogin;
