'use client';
import axios from 'axios';
import { useState } from 'react';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const clearStateValues = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginPayload = { email, password };
    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/auth/login',
        loginPayload
      );
      localStorage.setItem('token', response.data.token);
      clearStateValues();
      setIsLoading(false);
      navigate('/products');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      alert('Login unsuccessful.');
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className='section-center'>
      <form onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='text'
            value={email}
            className='form-input'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            value={password}
            className='form-input'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type='submit' className='btn btn-block form-btn'>
            Login
          </button>
        </div>
        <div className='info-btn-container'>
          <span className='info-btn-text'>Don't have an account?&nbsp;</span>
          <button
            type='button'
            className='info-btn'
            onClick={() => {
              navigate('/register');
            }}
          >
            Sign Up
          </button>
        </div>
      </form>
    </section>
  );
};
export default Login;
