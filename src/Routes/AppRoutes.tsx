import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import Home from '../Components/Home/Home';
import Login from '../Components/Login/Login'
import MovieDetail from '../Components/MovieDetail/MovieDetail';
import User from '../Components/User/User';






const AppRoutes: React.FC = () => {
  return (
      <Routes>
        <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/User" element={<User />} />
      </Routes>
  );
};

export default AppRoutes;
