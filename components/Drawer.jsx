import React from 'react';
import Link from 'next/link';

const Drawer = ({ categories, isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-1/2 bg-white transition-transform transform z-[100] border-r-8 border-b-8 ${
        isOpen
          ? 'translate-x-0 transition-transform duration-500 ease-out'
          : '-translate-x-full transition-transform duration-300 ease-in'
      }`}
    >
      <button className="p-4 text-black" onClick={onClose}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="flex flex-col items-center text-center">
        <div className="justify-center">
          {categories.map((category, index) => (
            <Link key={index} href={`/category/${category.slug}`}>
              <span className="block font-black text-lg text-black mb-3">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
