import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ToastContainer from './components/UI/ToastContainer';

// Lazy loading pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Feedback = lazy(() => import('./pages/Feedback'));

// A simple loading fallback
const PageLoader = () => (
  <div className="page-loader" style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div className="spinner" style={{ width: 40, height: 40, border: '3px solid var(--border)', borderTopColor: 'var(--c-deep-blue)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  return (
    <Router>
      <Header />
      <main className="main-content" style={{ marginTop: '80px', minHeight: 'calc(100vh - 80px - 200px)' }}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ToastContainer />
    </Router>
  );
}

export default App;
