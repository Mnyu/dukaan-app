import axios from 'axios';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { UserAtom } from 'store';

const InitUser = () => {
  const setUserState = useSetRecoilState(UserAtom);

  const initUser = async () => {
    let isLoading = false;
    let email = null;
    let role = null;
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:5000/api/v1/users/me',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.email && response.data.role) {
        email = response.data.email;
        role = response.data.role;
      }
    } catch (error) {
      console.log(error);
    }
    setUserState({ isLoading, email, role });
  };

  useEffect(() => {
    initUser();
  }, []);

  return <></>;
};
export default InitUser;
