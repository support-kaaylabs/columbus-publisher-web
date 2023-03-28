import React, { type FC } from 'react';
import './App.scss';

import Dashboard from './pages/Dashboard';
import Layout from './container/Layout';
import Home from './components/Home';
import HomePage from './components/HomePage';
import Chats from './components/Dashboard/Chart';
import Insight from './components/Insight';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReportTable from './components/Home/reportTable';
import ProductList from './components/Product';
import ProductDetail from './components/Product/detail';


const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/:reportname" element={<ReportTable />} />
        <Route path="/chart" element={<Chats/>} />
        <Route path="/insight" element={<Insight/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
