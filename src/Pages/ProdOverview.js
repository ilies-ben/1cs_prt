import React, { useState } from "react";
import classes from './ProdOverview.module.css'
import ProductSize from "../components/Layout/Product/ProdSize";
import ProdQuantity from '../components/Layout/Product/ProdQuantity'
import Cart from "../components/Icons/Cart"
import Button from '../components/Auth-Items/Button'
import veloB from '../Assets/header.png'
import veloP from '../Assets/velo-violet.png'
import veloR from "../Assets/velo-rouge.png"
import veloV from '../Assets/velo-violet.png'
import veloG from '../Assets/velo-gris.png'
const ProductPage = () => {
  
  const colors = [
    {
      id: 1,
      name: "Blue",
      image: veloB,
      hexCode: "#00003b",
      swatchImage: veloB
    },
    {
      id: 2,
      name: "Red",
      image: veloR,
      hexCode: "#760000",
      swatchImage: veloR
    },
    {
      id: 3,
      name: "Purple",
      image: veloV,
      hexCode: "#943ce4",
      swatchImage: veloV
    },
    {
      id: 4,
      name: "Grey",
      image: veloG,
      hexCode: "#767676",
      swatchImage: veloG
    },
  ];

    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [selectedImage, setSelectedImage] = useState(selectedColor.image);
    const [selectedImageSwatch, setSelectedImageSwatch] = useState(colors[0]);
  
    const handleColorChange = (color) => {
        setSelectedColor(color);
        setSelectedImage(color.image);
        setSelectedImageSwatch(color);
      };
      const handleImageSwatchChange = (color) => {
        setSelectedImageSwatch(color);
        setSelectedImage(color.image);
      
        // Find the color object that matches the clicked image swatch
        const newSelectedColor = colors.find((c) => c.id === color.id);
      
        // Update the selected color state with the new color
        setSelectedColor(newSelectedColor);
      };

    return (
      <div className={classes[`product-section`]}>
        <div className={classes.productPage}>
          <div className={classes.productImages}>
          <div className={classes.productImageSwatcher}>
              {colors.map((color) => (
                <img
                  key={color.id}
                  src={color.swatchImage}
                  alt={`Product in ${color.name}`}
                  className={`${classes.imageSwatcherImage} ${
                    color.id === selectedImageSwatch.id
                      ? classes.activeImageSwatcherImage
                      : ""
                  }`}
                  onClick={() => handleImageSwatchChange(color)}
                />
              ))}
            </div>
            <img
              src={selectedImage}
              alt={`Product in ${selectedColor.name}`}
              className={`${classes.productImage} ${
                selectedImageSwatch.id === selectedColor.id
                  ? classes.activeImageSwatcherImage
                  : ""
              }`}
              onClick={() => handleImageSwatchChange(selectedColor)}
            />
            
          </div>
          <div className={classes.productDetails}>
            <h1 className={classes.productTitle}>Scott RC Pro</h1>
            <p className={classes.productPrice}>85000 DA</p>
            <div className={classes[`product-brand`]}>
            <h2 className={classes.colorTitle}>Brand:</h2> <span>Electron Bike</span>
            </div>
            <div className={classes.productColors}>
              <h2 className={classes.colorTitle}>Color:</h2>
              <div className={classes.productColorOptions}>
                {colors.map((color) => (
                  <div
                    key={color.id}
                    className={classes.colorOption}
                    onClick={() => handleColorChange(color)}
                  >
                    <div
                      className={classes.colorOptionButton}
                      style={{ backgroundColor: color.hexCode }}
                    >
                      {color.id === selectedColor.id && (
                        <div className={classes.checkmark}>
                          <span className={`${classes.checkmarkLine} ${classes.checkmarkLine1}`}></span>
                          <span className={`${classes.checkmarkLine} ${classes.checkmarkLine2}`}></span>
                        </div>
                      )}
                    </div>
                    
                  </div>
                ))}
              </div>
            </div>
            <div className={classes.actions}>
              <div className={classes[`size-container`]}>
              <ProductSize/>
              </div>
            <ProdQuantity/>
            <button className={classes[`checkout-button`]}><Cart/>ADD TO CART</button>
            </div>
            <div className={classes[`product-description`]}>
              <h5>DESCRIPTION :</h5>
                        <ul>
                          <li>Cadre en carbone Addict RC Disc HMX</li>
                          <li>Fourche Addict RC HMX</li>
                          <li>Transmission Shimano Dura-Ace Di2 Disc, 24 vitesses</li>
                          <li>Pneus Schwalbe PRO ONE TL</li>
                          <li>Cadre en carbone Addict RC Disc HMX</li>
                          <li>Fourche Addict RC HMX</li>
                          <li>Transmission Shimano Dura-Ace Di2 Disc, 24 vitesses</li>
                          <li>Pneus Schwalbe PRO ONE TL</li>
                        </ul>
            </div>
          </div>
        </div>
      </div>
        
      );
   
};



export default ProductPage;