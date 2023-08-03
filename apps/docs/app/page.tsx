'use client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Navbar } from 'ui';
import InitUser from 'ui/InitUser';
import HomePage from './HomePage';
import Products from 'ui/Products';
import Register from 'ui/Register';
import Login from 'ui/Login';
import Cart from 'ui/Cart';
import Orders from 'ui/Orders';

export default function Page() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <InitUser />
          <Navbar />
          <Routes>
            <Route path={'/'} element={<HomePage />} />
            <Route path={'/register'} element={<Register />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/products'} element={<Products />} />
            <Route path={'/cart'} element={<Cart />} />
            <Route path={'/orders'} element={<Orders />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}
