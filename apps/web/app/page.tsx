'use client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from 'ui';
import CreateProduct from 'ui/CreateProduct';
import Login from 'ui/Login';
import Products from 'ui/Products';
import Register from 'ui/Register';

export default function Page() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path={'/'} element={<Login />}></Route>
          <Route path={'/register'} element={<Register />}></Route>
          <Route path={'/login'} element={<Login />}></Route>
          <Route path={'/add-product'} element={<CreateProduct />}></Route>
          <Route path={'/products'} element={<Products />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
