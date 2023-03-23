import React, { type FC } from 'react';
import './App.scss';
import Home from '../src/pages/Login';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReportTable from './components/Home/reportTable';
import Dashboard from './pages/Dashboard';
import Layout from './container/Layout';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/:reportname" element={<ReportTable />} />
        <Route path="/layout" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
