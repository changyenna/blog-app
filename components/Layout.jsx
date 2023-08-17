import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-50">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
