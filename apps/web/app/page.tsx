'use client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from 'ui';
import Login from 'ui/Login';
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
        </Routes>
      </BrowserRouter>
    </>
  );
}
