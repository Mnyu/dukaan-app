'use client';
import axios from 'axios';
import { useState } from 'react';
import Loading from './Loading';

const Register = () => {
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
    const registerPayload = { firstName, lastName, email, password };
    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/auth/register',
        registerPayload
      );
      localStorage.setItem('token', response.data.token);
      clearStateValues();
      setIsLoading(false);
      alert('Registration successful.');
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
      <button type='submit' className='btn btn-block register-btn'>
        Register
      </button>
    </form>
  );
};
export default Register;
