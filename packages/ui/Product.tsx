import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  UserAtom,
  userCartSelector,
  userRoleSelector,
  userEmailSelector,
} from 'store';

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

const Product = (product: ProductInterface) => {
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
      email: userEmail,
      role: userRole,
      isLoading: false,
      cart: newCart,
    });
  };

  const handleEditProduct = (productId: string) => {
    console.log(productId);
  };
  const handleDeleteProduct = (productId: string) => {
    console.log(productId);
  };

  const { _id, name, description, image, price, category, inStock, seller } =
    product;
  return (
    <article className='single-product'>
      <img
        src='http://localhost:5000/computer-3.jpeg'
        alt={image}
        className='img'
      />
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
