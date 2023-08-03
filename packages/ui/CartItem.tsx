import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  userCartSelector,
  UserAtom,
  userEmailSelector,
  userRoleSelector,
  userNameSelector,
} from 'store';

type CartItemProps = {
  productId: string;
};

const CartItem = ({ productId }: CartItemProps) => {
  const userName = useRecoilValue(userNameSelector);
  const userEmail = useRecoilValue(userEmailSelector);
  const userRole = useRecoilValue(userRoleSelector);
  const userCart = useRecoilValue(userCartSelector);
  const setUserState = useSetRecoilState(UserAtom);
  const orderItem = userCart.get(productId);
  const quantity = orderItem.quantity;
  const { name, image, price } = orderItem.product;

  const remove = (productId: string) => {
    const newCart = new Map(userCart);
    newCart.delete(productId);
    setUserState({
      name: userName,
      email: userEmail,
      role: userRole,
      isLoading: false,
      cart: newCart,
    });
  };

  const increase = (productId: string) => {
    const newCart = new Map(userCart);
    const existingOrderItem = userCart.get(productId);
    const newQuantity = existingOrderItem.quantity + 1;
    newCart.set(productId, { ...existingOrderItem, quantity: newQuantity });
    setUserState({
      name: userName,
      email: userEmail,
      role: userRole,
      isLoading: false,
      cart: newCart,
    });
  };

  const decrease = (productId: string) => {
    const newCart = new Map(userCart);
    const existingOrderItem = userCart.get(productId);
    if (existingOrderItem.quantity === 1) {
      newCart.delete(productId);
    } else {
      const newQuantity = existingOrderItem.quantity - 1;
      newCart.set(productId, { ...existingOrderItem, quantity: newQuantity });
    }
    setUserState({
      name: userName,
      email: userEmail,
      role: userRole,
      isLoading: false,
      cart: newCart,
    });
  };

  return (
    <article className='cart-item'>
      <img src={`http://localhost:5000${image}`} alt={name} />
      <div>
        <h5>{name}</h5>
        <span className='item-price'>Rs{price}</span>
        <button className='remove-btn' onClick={() => remove(productId)}>
          remove
        </button>
      </div>
      <div>
        <button className='amount-btn' onClick={() => increase(productId)}>
          <FaChevronUp className='amount-icon' />
        </button>

        <span className='amount'>{quantity}</span>

        <button className='amount-btn' onClick={() => decrease(productId)}>
          <FaChevronDown className='amount-icon' />
        </button>
      </div>
    </article>
  );
};
export default CartItem;
