'use client';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  userEmailSelector,
  userRoleSelector,
  UserAtom,
  userCartSelector,
  getTotals,
} from 'store';
import CartItem from './CartItem';
import Loading from './Loading';

interface ProductInterface {
  _id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  price: number;
  inStock: boolean;
  rating: number;
  seller: string;
}

interface OrderItemInterface {
  product: ProductInterface;
  quantity: number;
}

type OrderPayload = {
  orderItems: OrderItemInterface[];
  amount: number;
};

const Cart = () => {
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userEmailSelector);
  const userRole = useRecoilValue(userRoleSelector);
  const userCart = useRecoilValue(userCartSelector);
  const setUserState = useSetRecoilState(UserAtom);
  const [isLoading, setIsLoading] = useState(false);

  const cartItems = Array.from(userCart.entries());
  const { totalCost } = getTotals(userCart);

  const submitOrder = async () => {
    setIsLoading(true);
    const orderPayload: OrderPayload = {
      orderItems: [],
      amount: totalCost,
    };
    userCart.forEach((value, key) => {
      orderPayload.orderItems.push({
        product: value.product._id,
        quantity: value.quantity,
      });
    });
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/v1/orders',
        orderPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      clearCart();
      setIsLoading(false);
      navigate('/orders');
      alert('Order Submitted');
    } catch (error) {
      console.error(error);
      alert('Error creating order.');
      setIsLoading(false);
    }
  };

  const clearCart = () => {
    setUserState({
      email: userEmail,
      role: userRole,
      isLoading: false,
      cart: new Map(),
    });
  };

  if (isLoading) {
    return <Loading />;
  }

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
