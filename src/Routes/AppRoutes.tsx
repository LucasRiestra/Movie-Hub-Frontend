import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import Home from '../Components/Home/Home';
import Login from '../Components/Login/Login'



const AppRoutes: React.FC = () => {
  return (
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Login />} />
      </Routes>
  );
};

export default AppRoutes;
