import { useContext } from 'react';
import { UserContext } from '../store';

const useLogOut = () => {
  const { setUserName, setAccessToken } = useContext(UserContext);
  return () => {
    localStorage.clear();
    setUserName('');
    setAccessToken('');
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };
};

export default useLogOut;
