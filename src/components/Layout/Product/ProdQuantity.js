import React, { useState } from "react";
import classes from './ProdQuantity.module.css'

const Product = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className={classes["product-container"]}>
      
        <button
          className={classes["quantity-button"]}
          onClick={handleQuantityDecrease}
        >
          -
        </button>
        <input
          className={classes["quantity-input"]}
          type="number"
          value={quantity}
          onChange={(event) => setQuantity(parseInt(event.target.value))}
        />
        <button
          className={classes["quantity-button"]}
          onClick={handleQuantityIncrease}
        >
          +
        </button>
     
    </div>
  );
};

export default Product;