import { FaCartPlus, FaUserAlt } from 'react-icons/fa';

export const Navbar = () => {
  return (
    <nav>
      <div className='nav-center'>
        <h4>Test</h4>
        <div className='nav-container'>
          <FaUserAlt className='cart-icon' />
          <FaCartPlus className='cart-icon' />
          <div className='amount-container'>
            <p className='total-amount'>5</p>
          </div>
        </div>
      </div>
    </nav>
  );
};
