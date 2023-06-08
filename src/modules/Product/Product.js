import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classes from "../../Pages/ProdOverview.module.css";
import Cart from "../../components/Icons/Cart";
const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };
    fetchProduct();
  }, []);

  const handleCart = (product, redirect) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isProductExist = cart.find((item) => item.id === product.id);
    if (isProductExist) {
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { ...product, quantity: 1 }])
      );
    }
    if (redirect) {
      navigate("/cart");
    }
  };

  if (!Object.keys(product).length > 0) return <div>Loading.....</div>;

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className={classes.productImages}>
            <img src={product?.image} className={classes.productImage} />
          </div>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
           
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product?.name}
            </h1>
            
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className={classes.productColors}>
                <h2 className={classes.colorTitle}>Color:</h2>
                <div className={classes.productColorOptions}>
                  <div className={classes.colorOption}>
                    <div
                      className={classes.colorOptionButton}
                      style={{ backgroundColor: "#000" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex ml-6  justify-between items-center">
                <div className="flex items-center ">
                <span className="mr-3">Size</span>
              <div className="relative">
                <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                </select>
                <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </div>
                </div>
              
              <button className={classes[`checkout-button`]} onClick={() => handleCart(product)}><Cart/>ADD TO CART</button>
            </div>
            <div className={classes[`product-description`]}>
              <h5>DESCRIPTION :</h5>
              <p className="leading-relaxed">{product?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
