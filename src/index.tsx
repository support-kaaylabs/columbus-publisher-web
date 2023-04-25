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
import UserProfile from './components/Home/userProfile';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<App />}>
        <Route path="products" element={<ProductList />} />
        <Route path="products/:slug" element={<ProductDetail />} />
        <Route path=":dashboard" element={<Dashboard />} />
        <Route path="myProfile" element={<UserProfile />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
