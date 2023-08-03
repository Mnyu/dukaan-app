'use client';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('electronics');
  const [price, setPrice] = useState(0.0);
  const [image, setImage] = useState('');
  const [inStock, setInStock] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const clearStateValues = () => {
    setName('');
    setDescription('');
    setCategory('');
    setPrice(0.0);
    setImage('');
    setInStock(false);
  };

  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      setIsLoading(true);
      const file = e.target.files[0];
      const fileReader = new FileReader();
      try {
        const token = localStorage.getItem('token');
        const imageData = new FormData();
        // imageData.append('files', previewImage);
        imageData.append('image', file);
        const imageUploadResponse = await axios.post(
          `http://localhost:5000/api/v1/products/upload`,
          imageData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setImage(imageUploadResponse.data.image.src);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        alert('Error uploading image.');
        setIsLoading(false);
      }
      fileReader.addEventListener('load', () => {
        if (
          fileReader &&
          fileReader.result &&
          typeof fileReader.result === 'string'
        ) {
          setPreviewImage(fileReader.result);
        }
      });
      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const addProductPayload = {
        name,
        description,
        category,
        price,
        image,
        inStock,
      };
      const response = await axios.post(
        'http://localhost:5000/api/v1/products',
        addProductPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      clearStateValues();
      setIsLoading(false);
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Error in adding product.');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className='section-center'>
      <div className='title'>
        <h4>Add Product</h4>
        <div className='title-underline'></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='name'>Name</label>
          <input
            name='name'
            type='text'
            value={name}
            className='form-input'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='description'>Description</label>
          <input
            name='description'
            type='text'
            value={description}
            className='form-input'
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='category'>Category</label>
          <select
            className='form-input'
            name='category'
            id='category'
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value='electronics'>Electronics</option>
            <option value='clothing'>Clothing</option>
            <option value='footwear'>Footwear</option>
            <option value='others'>Others</option>
          </select>
        </div>
        <div className='form-control'>
          <label htmlFor='price'>Price</label>
          <input
            name='price'
            type='text'
            value={price}
            className='form-input'
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='inStock'>In stock</label>
          <input
            name='inStock'
            type='checkbox'
            checked={inStock}
            className='form-input'
            onChange={(e) => setInStock(!inStock)}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='image'>Image</label>
          <input
            name='image'
            type='file'
            className='form-input'
            onChange={handleChangeImage}
          />
        </div>
        {previewImage && (
          <div className='form-control-img'>
            <img src={previewImage} alt='image' className='img' />
          </div>
        )}
        <div>
          <button type='submit' className='btn btn-block form-btn'>
            Add
          </button>
        </div>
      </form>
    </section>
  );
};
export default CreateProduct;
