'use client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import HomePage from './HomePage';
import { Navbar, InitUser, Products, Register, Login, Orders, Cart } from 'ui';

export default function Page() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <InitUser {...{ expectedRole: 'user' }} />
          <Navbar {...{ title: '' }} />
          <Routes>
            <Route path={'/'} element={<HomePage />} />
            <Route
              path={'/register'}
              element={<Register {...{ role: 'user' }} />}
            />
            <Route
              path={'/login'}
              element={<Login {...{ expectedRole: 'user' }} />}
            />
            <Route path={'/products'} element={<Products />} />
            <Route path={'/cart'} element={<Cart />} />
            <Route path={'/orders'} element={<Orders />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}
