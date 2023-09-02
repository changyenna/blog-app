import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer>
      <div className="container grid-rows-3 flex md:flex-row sm:flex-col space-y-0 xs:flex-col justify-between items-center mx-auto max-w-screen-lg">
        <div className="box-content font-bold text-sm md:h-28 w-40 md:pt-10 md:px-3 md:pb-7 sm:p-2 xs:p-2 flex md:justify-start sm:justify-center xs:justify-center items-end  ">
          <Link href={'/admin'}>ADMIN</Link>
        </div>
        <div className="box-content font-bold text-sm md:h-28 w-40 md:pt-10 md:px-3 md:pb-7 sm:p-2 xs:p-2 flex md:justify-center sm:justify-center xs:justify-center items-end  ">
          LOGO
        </div>
        <div className="box-content md:h-28 w-40 md:pt-10 md:px-3 md:pb-7 sm:pb-7 xs:py-b sm:pt-2 xs:pt-2 flex md:justify-end sm:justify-center xs:justify-center items-end space-x-3">
          <Instagram />
          <Twitter />
          <LinkedIn />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
