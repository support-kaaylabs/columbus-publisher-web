import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import Home from './components/Home';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './components/Product';
import ProductDetail from './components/Product/detail';
import Dashboard from './pages/Dashboard';
import { MyProvider } from './components/store/dataStore';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<App />}>
        <Route path="product" element={<ProductList />} />
        <Route path="product/:slug" element={<ProductDetail />} />
        <Route path=":dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
