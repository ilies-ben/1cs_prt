import { Link } from "react-router-dom";
import { useRef } from "react";
import { IoSearch } from 'react-icons/io5';
import Cart from "../Icons/Cart";
import User from "../Icons/User"
import { IoHeartOutline } from 'react-icons/io5';
import classes from "./Navigation.module.css";
import logoImage from "../../Assets/logo.png";
import Input from "../Auth-Items/Input";

function Navigation() {
  const navRef = useRef();

  return (
    <nav>
      <div className={classes.logo}>
        <img src={logoImage} className={classes.logoImage} alt="Logo" />
      </div>
      <ul className={classes.categories} ref={navRef}>
        <li>
          <Link to="/products" className={classes.action}>
            Store
          </Link>
        </li>
       
        <li>
          <Link to="" className={classes.action}>
            Support
          </Link>
        </li>
      </ul>

      <div className={classes.icons}>
        <Cart />
        <Link to="myWishlist">
          <IoHeartOutline className="text-2xl" />
        </Link>
        <User />
      </div>
    </nav>
  );
}

export default Navigation;
