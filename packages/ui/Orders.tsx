import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './Loading';

type OrderItem = {
  product: string;
  quantity: number;
  _id: string;
};

type Order = {
  _id: string;
  orderItems: OrderItem[];
  amount: number;
  user: string;
};

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  const BASE_URL = 'http://localhost:5000/api/v1';

  const findTotalItems = (orderItems: OrderItem[]): number => {
    let totalItems = 0;
    orderItems.forEach((orderItem) => (totalItems += orderItem.quantity));
    return totalItems;
  };

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data.orders);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      alert('Error fetching products');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className='cart'>
      <header>
        <h3>Your Orders</h3>
      </header>
      <div>
        {orders.map((order) => {
          return (
            <article key={order._id} className='cart-item'>
              <img src='http://localhost:5000/order.jpeg' alt='order' />
              <div>
                <h5>Order Id : {order._id}</h5>
                <h5>Amount : Rs{order.amount}</h5>
                <h5>Items : {findTotalItems(order.orderItems)}</h5>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
export default Orders;
