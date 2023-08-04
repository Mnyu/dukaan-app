import axios from 'axios';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { UserAtom } from 'store';
import { BASE_API_URL, UserResponse } from 'common';

type InitUserProps = {
  expectedRole: string;
};

const InitUser = ({ expectedRole }: InitUserProps) => {
  const setUserState = useSetRecoilState(UserAtom);

  const initUser = async () => {
    let name = '';
    let isLoading = false;
    let email = '';
    let role = '';
    let cart = new Map();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user: UserResponse = response.data;
      if (user.email && user.role === expectedRole) {
        name = user.name;
        email = user.email;
        role = user.role;
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
