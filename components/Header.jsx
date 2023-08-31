import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Drawer from './Drawer'; // Import the Drawer component

const categories = [
  { name: 'ARCHIVE', slug: 'archive' },
  { name: 'LISTS', slug: 'lists' },
];

const Header = () => {
  const halfCategories = Math.ceil(categories.length / 2);
  const categoriesBefore = categories.slice(0, halfCategories);
  const categoriesAfter = categories.slice(halfCategories);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="container flex-col h-auto mx-auto max-w-screen-lg">
      <div className="container fixed flex-col h-auto mx-auto bg-white max-w-screen-lg z-[99]">
        <div className="mx-3 md:px-10 sm:px-0">
          <div className="py-7">
            {isLargeScreen ? (
              <div className="flex justify-between flex items-center">
                {categoriesBefore.map((category, index) => (
                  <Link key={index} href={`/category/${category.slug}`}>
                    <span className="cursor-pointer font-extrabold text-2xl text-black mr-6">
                      {category.name}
                    </span>
                  </Link>
                ))}
                <Link href="/">
                  <div className="bg-[#FFD925] py-1 px-5 flex justify-center items-center">
                    <span className="cursor-pointer font-extrabold text-4xl text-black">
                      GOLF
                    </span>
                  </div>
                </Link>
                {categoriesAfter.map((category, index) => (
                  <Link key={index} href={`/category/${category.slug}`}>
                    <span className="cursor-pointer font-extrabold text-2xl text-black ml-6">
                      {category.name}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 ">
                <div className="col-span-1 flex items-center">
                  <button onClick={toggleDrawer}>
                    <svg
                      className="w-25 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 4 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeWidth="3" d="M1 12h22M1 18h22" />
                    </svg>
                  </button>
                </div>
                {/* Drawer */}
                <Drawer
                  categories={categories}
                  isOpen={isDrawerOpen}
                  onClose={toggleDrawer}
                />

                <div className="col-span-1 flex items-center">
                  <Link href="/">
                    <div className="bg-[#FFD925] py-1 px-5 flex justify-center items-center">
                      <span className="cursor-pointer font-extrabold text-4xl text-black">
                        GOLF
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            )}

            {isDrawerOpen && (
              <div
                className="fixed top-0 left-0 w-full h-full bg-black opacity-60 z-[99]"
                onClick={closeDrawer}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
