import { useRecoilValue } from 'recoil';
import {
  isUserLoadingSelector,
  userEmailSelector,
  userRoleSelector,
} from 'store';
import { Loading, Products, Login } from 'ui';

const HomePage = () => {
  const isUserLoading = useRecoilValue(isUserLoadingSelector);
  const userEmail = useRecoilValue(userEmailSelector);
  const userRole = useRecoilValue(userRoleSelector);

  if (isUserLoading) {
    return <Loading />;
  }
  if (userEmail && userRole === 'admin') {
    return <Products />;
  }
  return <Login {...{ expectedRole: 'admin' }} />;
};
export default HomePage;
