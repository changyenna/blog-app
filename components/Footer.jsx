import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <div className="container grid-rows-3 flex flex-row justify-between items-center mx-auto max-w-screen-lg">
        <div className="box-content h-40 w-40 p-10 flex justify-center items-end ">
          <Link href={'/admin'}>ADMIN</Link>
        </div>
        <div className="box-content h-40 w-40 p-10 flex justify-center items-end ">
          LOGO
        </div>
        <div className="box-content h-40 w-40 p-10 flex justify-center items-end ">
          SOCIALS
        </div>
      </div>
    </footer>
  );
};

export default Footer;
