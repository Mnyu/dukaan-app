import axios from 'axios';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { UserAtom } from 'store';

const InitUser = () => {
  const setUserState = useSetRecoilState(UserAtom);

  const initUser = async () => {
    let name = null;
    let isLoading = false;
    let email = null;
    let role = null;
    let cart = new Map();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:5000/api/v1/users/me',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.email && response.data.role) {
        name = response.data.name;
        email = response.data.email;
        role = response.data.role;
      }
    } catch (error) {
      console.log(error);
    }
    setUserState({ name, isLoading, email, role, cart });
  };

  useEffect(() => {
    initUser();
  }, []);

  return <></>;
};
export default InitUser;
