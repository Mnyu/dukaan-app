import { useRecoilValue } from 'recoil';
import {
  isUserLoadingSelector,
  userEmailSelector,
  userRoleSelector,
} from 'store';
import Loading from 'ui/Loading';
import Login from 'ui/Login';
import Products from 'ui/Products';

const HomePage = () => {
  const isUserLoading = useRecoilValue(isUserLoadingSelector);
  const userEmail = useRecoilValue(userEmailSelector);
  const userRole = useRecoilValue(userRoleSelector);

  if (isUserLoading) {
    return <Loading />;
  }

  if (userEmail && userRole === 'user') {
    return <Products />;
  }
  return <Login />;
};
export default HomePage;
