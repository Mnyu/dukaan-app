import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';
import Product from './Product';
import { useRecoilValue } from 'recoil';
import { userRoleSelector } from 'store';

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

const Products = () => {
  const userRole = useRecoilValue(userRoleSelector);
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const BASE_URL = 'http://localhost:5000/api/v1';
  const productsUrl = userRole === 'admin' ? '/products' : '/users/products';

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}${productsUrl}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data.products);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      alert('Error fetching products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className='products-section'>
      <div className='title'>
        {userRole === 'admin' ? (
          <h3>My Products</h3>
        ) : (
          <h3>All Products in stock</h3>
        )}
        <div className='title-underline'></div>
      </div>
      <div className='products'>
        {products.map((product) => {
          return <Product key={product._id} {...product} />;
        })}
      </div>
    </section>
  );
};
export default Products;
