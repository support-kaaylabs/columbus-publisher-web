import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import ProductList from './components/Product';
// import ProductDetail from './components/Product/detail';
// import Dashboard from './pages/Dashboard';
// import UserProfile from './components/Home/userProfile';
// import Home from './components/Home';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);

reportWebVitals();
