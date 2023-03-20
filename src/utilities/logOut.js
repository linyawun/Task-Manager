import { useContext } from 'react';
import { UserContext } from '../store';
import { useNavigate } from 'react-router';

const useLogOut = () => {
  const navigate = useNavigate();
  const { setUserName, setAccessToken } = useContext(UserContext);
  return () => {
    localStorage.clear();
    setUserName('');
    setAccessToken('');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };
};

export default useLogOut;
