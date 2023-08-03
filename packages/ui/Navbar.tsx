import { FaCartPlus, FaUserAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  userEmailSelector,
  userRoleSelector,
  UserAtom,
  userCartSelector,
  getTotals,
} from 'store';

export const Navbar = () => {
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(UserAtom);
  const userEmail = useRecoilValue(userEmailSelector);
  const userRole = useRecoilValue(userRoleSelector);
  const userCart = useRecoilValue(userCartSelector);

  const { totalItems } = getTotals(userCart);

  const openCart = () => {
    navigate('/cart');
  };

  const viewOrders = () => {
    navigate('/orders');
  };

  const handleCreateProduct = () => {
    navigate('/add-product');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUserState({
      isLoading: false,
      email: null,
      role: null,
      cart: new Map(),
    });
    navigate('/');
  };

  return (
    <nav>
      <div className='nav-center'>
        <h4 className='logo' onClick={handleLogoClick}>
          Dukaan
        </h4>
        <div className='nav-container'>
          {userRole === 'admin' && (
            <button
              type='button'
              className='btn nav-btn'
              onClick={handleCreateProduct}
            >
              Add Product
            </button>
          )}
          {userEmail && userRole === 'user' && (
            <div className='cart-container'>
              <FaCartPlus className='cart-icon' onClick={openCart} />
              <div className='amount-container'>
                <p className='total-amount'>{totalItems}</p>
              </div>
            </div>
          )}
          {userEmail && userRole === 'user' && (
            <button type='button' className='btn nav-btn' onClick={viewOrders}>
              Your Orders
            </button>
          )}
          {userEmail && (
            <button type='button' className='btn nav-btn' onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
