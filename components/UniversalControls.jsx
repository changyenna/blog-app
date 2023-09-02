import React, { useState, useEffect } from 'react';

export const UniversalControls = () => {
  const [isPastPost, setIsPastPost] = useState(false);

  const handleScroll = () => {
    const offset = 250;

    if (window.scrollY > offset) {
      setIsPastPost(true);
    } else {
      setIsPastPost(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div>
      {isPastPost && (
        <div
          onClick={scrollToTop}
          className="fixed bottom-3 right-3 bg-[#FFD925] w-12 h-12 rounded-full flex justify-center items-center border-2 border-gray-600 hover:cursor-pointer"
        >
          <span className="text-black text-3xl font-extrabold">J</span>
        </div>
      )}
    </div>
  );
};
