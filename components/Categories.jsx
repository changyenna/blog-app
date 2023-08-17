import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { getCategories } from '../services';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  const [activeIndex, setActiveIndex] = useState(-1);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <div className="flex justify-center">
      <div className="accordion">
        {categories.map((category, index) => (
          <div
            className="accordion-item flex flex-col items-center"
            key={index}
          >
            <button
              className="accordion-button block uppercase text-black font-bold pb-3"
              onClick={() => toggleAccordion(index)}
            >
              {category.name}
            </button>
            <div
              className={`accordion-content ${
                activeIndex === index ? 'block' : 'hidden'
              } flex justify-center`}
            >
              <Link href={`/category/${category.slug}`}>
                <span className="accordion-button block uppercase text-black font-normal text-sm pb-3">
                  View {category.name} Posts
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
