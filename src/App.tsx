import React, { type FC } from 'react';
import './App.scss';
import Home from './components/Home';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReportTable from './components/Home/reportTable';
import Chats from './components/Dashboard/Chart';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:reportname" element={<ReportTable />} />
        <Route path="/Dashboard" element={<Chats/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
