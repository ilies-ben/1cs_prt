import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard/ProductCard';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  return (
    <div className='w-full h-screen py-44 px-5'>
      <h1 className='text-xl font-semibold'>My Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className='flex items-center justify-center'><p className='text-lg'>Your wishlist is empty.</p></div>
        
      ) : (
        <ProductCard products={wishlist} />
      )}
    </div>
  );
};

export default WishlistPage;
