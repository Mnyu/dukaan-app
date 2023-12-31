'use client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import HomePage from './HomePage';
import { Navbar, InitUser, Products, Register, Login, CreateProduct } from 'ui';

export default function Page() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <InitUser {...{ expectedRole: 'admin' }} />
          <Navbar {...{ title: 'Administration' }} />
          <Routes>
            <Route path={'/'} element={<HomePage />} />
            <Route
              path={'/register'}
              element={<Register {...{ role: 'admin' }} />}
            />
            <Route
              path={'/login'}
              element={<Login {...{ expectedRole: 'admin' }} />}
            />
            <Route path={'/add-product'} element={<CreateProduct />} />
            <Route path={'/products'} element={<Products />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}
