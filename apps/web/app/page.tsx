'use client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Navbar } from 'ui';
import CreateProduct from 'ui/CreateProduct';
import InitUser from 'ui/InitUser';
import Login from 'ui/Login';
import Products from 'ui/Products';
import Register from 'ui/Register';
import HomePage from './HomePage';

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
            <Route path={'/add-product'} element={<CreateProduct />} />
            <Route path={'/products'} element={<Products />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}
