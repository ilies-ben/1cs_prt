import React from 'react';
import { Link } from 'react-router-dom';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { useState, useEffect } from 'react';


const ProductCard = ({ products = [] }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (id) => {
    // Check if the product is already in the wishlist
    const existingProductIndex = wishlist.findIndex((product) => product.id === id);
    
    if (existingProductIndex !== -1) {
      // Product already exists in the wishlist, remove it
      const updatedWishlist = wishlist.filter((product) => product.id !== id);
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    } else {
      // Find the product in the products array
      const selectedProduct = products.find((product) => product.id === id);
      if (selectedProduct) {
        // Add the selected product to the wishlist array
        const updatedWishlist = [...wishlist, selectedProduct];
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      }
    }
  };
  
  useEffect(() => {
    
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);
  
  
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {products.map((product) => {
            const { id, name, price, description, category, image, discount } = product;
            const discountedPrice = price - (price * (discount / 100)); // Calculate discounted price

            return (
              <div
                className="lg:w-[23%] md:w-1/2 p-4 w-full mb-4 cursor-pointer rounded-lg shadow-xl border-2 ml-4 relative"
                key={id}
              >
                <Link to={`/products/${id}`} className="block relative h-48 rounded overflow-hidden">
                  <img alt={name} className="object-contain object-center w-full h-full block" src={image} />
                  {discount > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                      {discount}% off
                    </div>
                  )}
                </Link>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">{category}</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{name}</h2>
                  {discount > 0 ? (
                    <div className="flex items-center mt-1">
                      <p className="text-gray-500 line-through mr-2">{price} DA</p>
                      <p className="text-md font-semibold">{discountedPrice} DA</p>
                    </div>
                  ) : (
                    <p className="mt-1 text-md font-semibold">{price} DA</p>
                  )}
                  <Link
                      className="text-black mt-2 absolute top-2 right-2 focus:outline-none"
                      onClick={() => addToWishlist(id)}
                    >
                      {wishlist.some((product) => product.id === id) ? (
                        <IoHeart className="h-6 w-6" />
                      ) : (
                        <IoHeartOutline className="h-6 w-6" />
                      )}
                    </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductCard;