import React, { type FC } from 'react';
import './App.scss';

import Dashboard from './pages/Dashboard';
import Layout from './container/Layout';
import Home from './components/Home';
import HomePage from './components/HomePage';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReportTable from './components/Home/reportTable';
import ProductList from './components/Product';
import ProductDetail from './components/Product/Detail';


const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/:reportname" element={<ReportTable />} />
        <Route path="/layout" element={<Layout />} />
        <Route path="/products" element={<ProductList />} />
        
        <Route path='/homePage' element={<HomePage />} />
        <Route path='/products/:slug' element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
