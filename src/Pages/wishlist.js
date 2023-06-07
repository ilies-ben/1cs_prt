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
    <div>
      <h1>Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ProductCard products={wishlist} />
      )}
    </div>
  );
};

export default WishlistPage;
