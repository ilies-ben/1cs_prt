import React, { useState } from "react";
import classes from './ProdSize.module.css'

const Product = () => {
  const [size, setSize] = useState("");

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  return (
    <div className={classes[`product-container`]}>
    
        <select className={classes[`size-dropdown-box`]} id="sizeSelect" value={size} onChange={handleSizeChange}>
          <option value="">Size : </option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
   
        </select>
        
      
    </div>
  );
};

export default Product;