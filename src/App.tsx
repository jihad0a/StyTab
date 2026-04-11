import React, { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useRoutes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import About from './pages/About';
import Contact from './pages/Contact';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import Collection from './pages/Collection';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

function AnimatedRoutes() {
  const location = useLocation();
  
  const element = useRoutes([
    { path: "/", element: <PageWrapper><Home /></PageWrapper> },
    { path: "/products", element: <PageWrapper><Products /></PageWrapper> },
    { path: "/collection", element: <PageWrapper><Collection /></PageWrapper> },
    { path: "/product/:id", element: <PageWrapper><ProductDetail /></PageWrapper> },
    { path: "/checkout", element: <PageWrapper><Checkout /></PageWrapper> },
    { path: "/order-success", element: <PageWrapper><OrderSuccess /></PageWrapper> },
    { path: "/about", element: <PageWrapper><About /></PageWrapper> },
    { path: "/contact", element: <PageWrapper><Contact /></PageWrapper> },
    { path: "/shipping", element: <PageWrapper><Shipping /></PageWrapper> },
    { path: "/returns", element: <PageWrapper><Returns /></PageWrapper> },
  ], location);

  return (
    <AnimatePresence mode="wait">
      {element && React.cloneElement(element as React.ReactElement, { key: location.pathname })}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1">
              <AnimatedRoutes />
            </div>
            <Footer />
          </div>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}
