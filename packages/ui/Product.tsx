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

const Product = (product: ProductInterface) => {
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
      </div>
    </article>
  );
};
export default Product;
