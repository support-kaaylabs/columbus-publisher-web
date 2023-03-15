import React, { type FC } from 'react';
import './App.scss';
import Home from './components/Reports';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReportTable from './components/Reports/reportTable';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:reportname" element={<ReportTable />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
