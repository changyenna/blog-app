import React, { useContext } from 'react';

import Link from 'next/link';
// import { getCategories } from '../services';

const categories = [
  { name: 'ARCHIVE', slug: 'archive' },

  { name: 'LISTS', slug: 'top10' },
];

const Header = () => {
  return (
    <div className="container flex-col h-auto mx-auto max-w-screen-lg px-10">
      <div className="py-7">
        <div className="flex justify-between items-center">
          <Link href={`/category/${categories[0].slug}`}>
            <span className="cursor-pointer font-bold text-2xl text-black">
              {categories[0].name}
            </span>
          </Link>

          <Link href="/">
            <div className="bg-yellow-500 w-40 h-50 flex justify-center items-center">
              <span className="cursor-pointer font-bold text-4xl text-black">
                JOLF
              </span>
            </div>
          </Link>

          {categories.slice(1).map((category, index) => (
            <Link key={index} href={`/category/${category.slug}`}>
              <span className="cursor-pointer font-bold text-2xl text-black">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
