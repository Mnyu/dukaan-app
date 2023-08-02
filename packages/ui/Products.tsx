import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';
import Product from './Product';

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
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:5000/api/v1/products',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
        <h3>Our Products</h3>
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
