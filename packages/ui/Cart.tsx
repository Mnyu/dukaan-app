import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import {
  userEmailSelector,
  userRoleSelector,
  UserAtom,
  userCartSelector,
  getTotals,
} from 'store';
import CartItem from './CartItem';

const Cart = () => {
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userEmailSelector);
  const userRole = useRecoilValue(userRoleSelector);
  const userCart = useRecoilValue(userCartSelector);
  const setUserState = useSetRecoilState(UserAtom);

  const cartItems = Array.from(userCart.entries());
  const { totalCost } = getTotals(userCart);

  const submitOrder = () => {
    navigate('/orders');
    alert('Order Submitted');
  };

  const clearCart = () => {
    setUserState({
      email: userEmail,
      role: userRole,
      isLoading: false,
      cart: new Map(),
    });
  };

  if (cartItems.length === 0) {
    return (
      <section className='cart'>
        <header>
          <h3>your cart</h3>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className='cart'>
      <header>
        <h3>your cart</h3>
      </header>
      <div>
        {cartItems.map((cartItem) => {
          const [productId, orderItem] = cartItem;
          return <CartItem key={productId} {...{ productId }} />;
        })}
      </div>
      <footer>
        <hr />
        <div>
          <h5 className='cart-total'>
            total <span>Rs{totalCost.toFixed(2)}</span>
          </h5>
        </div>
        <button className='btn btn-hipster' onClick={clearCart}>
          clear cart
        </button>
        <button className='btn btn-hipster' onClick={submitOrder}>
          Order
        </button>
      </footer>
    </section>
  );
};
export default Cart;
