import { useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  UserAtom,
  userCartSelector,
  userRoleSelector,
  userEmailSelector,
  userNameSelector,
} from 'store';
import { ProductInterface } from 'common';

const Product = (product: ProductInterface) => {
  const navigate = useNavigate();
  const userName = useRecoilValue(userNameSelector);
  const userEmail = useRecoilValue(userEmailSelector);
  const userRole = useRecoilValue(userRoleSelector);
  const userCart = useRecoilValue(userCartSelector);
  const setUserState = useSetRecoilState(UserAtom);

  const handleAddToCart = (product: ProductInterface) => {
    const productId = product._id;
    const existingOrderItem = userCart.get(productId);
    let newQuantity = 1;
    if (existingOrderItem) {
      newQuantity = existingOrderItem.quantity + 1;
      product = existingOrderItem.product;
    }
    const newCart = new Map(userCart);
    newCart.set(productId, { product, quantity: newQuantity });
    setUserState({
      name: userName,
      email: userEmail,
      role: userRole,
      isLoading: false,
      cart: newCart,
    });
  };

  const handleEditProduct = (productId: string) => {
    alert('To be implemented soon.');
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://localhost:5000/api/v1/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/products');
    } catch (error) {
      console.error(error);
      alert('Error in deleting product.');
    }
  };

  const { _id, name, description, image, price, category, inStock, seller } =
    product;
  return (
    <article className='single-product'>
      <img src={`http://localhost:5000${image}`} alt={name} className='img' />
      <span className='product-price'>Rs{price}</span>
      <div className='product-info'>
        <h5>{name}</h5>
        <p>{description}</p>
        <div className='product-category'>
          <p>{category}</p>
          {inStock ? <p>In stock</p> : <p>Not in stock</p>}
        </div>
        {userRole === 'admin' && (
          <div className='product-btn'>
            <button
              type='button'
              className='btn edit-btn'
              onClick={() => handleEditProduct(_id)}
            >
              Edit Product
            </button>
            <button
              type='button'
              className='btn edit-btn'
              onClick={() => handleDeleteProduct(_id)}
            >
              Delete Product
            </button>
          </div>
        )}
        {userRole === 'user' && (
          <div className='add-cart-btn'>
            <button
              type='button'
              className='btn edit-btn'
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </article>
  );
};
export default Product;
