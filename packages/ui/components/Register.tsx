'use client';
import axios from 'axios';
import { useState } from 'react';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { UserAtom } from 'store';
import { BASE_API_URL, RegisterLoginUserResponse } from 'common';

type RegisterProps = {
  role: string;
};

const Register = ({ role }: RegisterProps) => {
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(UserAtom);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const clearStateValues = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const registerPayload = { firstName, lastName, email, password, role };
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_API_URL}/auth/register`,
        registerPayload
      );
      const data: RegisterLoginUserResponse = response.data;
      localStorage.setItem('token', data.token);
      setUserState({
        name: data.name,
        isLoading: false,
        email: data.email,
        role: data.role,
        cart: new Map(),
      });
      clearStateValues();
      setIsLoading(false);
      navigate('/products');
    } catch (error) {
      console.error(error);
      alert('Error in registration.');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className='section-center'>
      <form onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='firstName'>First Name</label>
          <input
            name='firstName'
            type='text'
            value={firstName}
            className='form-input'
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='lastName'>Last Name</label>
          <input
            name='lastName'
            type='text'
            value={lastName}
            className='form-input'
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
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
            Register
          </button>
        </div>
        <div className='info-btn-container'>
          <span className='info-btn-text'>Already have an account?&nbsp;</span>
          <button
            type='button'
            className='info-btn'
            onClick={() => {
              navigate('/login');
            }}
          >
            Sign In
          </button>
        </div>
      </form>
    </section>
  );
};
export default Register;
