import React from 'react';
import { Link } from 'react-router-dom';
import CatHeader from '../CategoryHeader';

const FeatureCard = ({ cards = [1, 2, 3] }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-20 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">OUR CATEGORIES</h1>
        </div>
        
        <div className="flex flex-wrap justify-between">
          
          {cards?.map((card) => {
            return (
              <Link
                to={`/categories/${card.name}`}
                className="p-4 w-[23%] cursor-pointer text-center" 
                key={card.id}
              >
                <div className="flex rounded-lg justify-center h-full bg-gray-100 p-4 flex-col">
                  <div className="flex justify-center items-center mb-3">
                    <h2 className="text-gray-900 text-lg title-font font-medium capitalize">{card.name || 'Example card'}</h2>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureCard;