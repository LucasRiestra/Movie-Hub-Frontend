import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import Home from '../Components/Home/Home';
import Login from '../Components/Login/Login'
import MovieDetail from '../Components/MovieDetail/MovieDetail';



const AppRoutes: React.FC = () => {
  return (
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Login />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
  );
};

export default AppRoutes;
