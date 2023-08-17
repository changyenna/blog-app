import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <div className="container grid-rows-3 flex flex-row justify-between items-center mx-auto max-w-screen-lg bg-red-700">
        <div className="box-content h-40 w-40 p-10 flex justify-center items-end bg-red-200">
          <Link href={'/admin'}>LOGIN</Link>
        </div>
        <div className="box-content h-40 w-40 p-10 flex justify-center items-end bg-red-100">
          LOGO
        </div>
        <div className="box-content h-40 w-40 p-10 flex justify-center items-end bg-red-300">
          SOCIALS
        </div>
      </div>
    </footer>
  );
};

export default Footer;
