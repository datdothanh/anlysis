import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../App.js';
import UsedTime from '../containers/UsedTime/UsedTime.jsx';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/used_time" element={<UsedTime />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
