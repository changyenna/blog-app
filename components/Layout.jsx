import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { UniversalControls } from './UniversalControls';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="pt-28">{children}</div>
      <Footer />
      <UniversalControls />
    </div>
  );
};

export default Layout;
