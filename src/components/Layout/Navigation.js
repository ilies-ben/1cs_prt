import { Link } from "react-router-dom";
import  { useRef } from "react";
import classes from "./Navigation.module.css";
import logoImage from "../../Assets/logo.png";
import Cart from "../Icons/Cart";
import User from "../Icons/User";

function Navigation() {
const navRef =useRef();



  return (
    <nav>
      <div className={classes.logo}>
         <img src={logoImage} className={classes.logoImage} />
        </div>
        <ul className={classes.categories} ref={navRef}>
          <li><Link to="" className={classes.action}>Vélos</Link></li>
          <li><Link to="" className={classes.action}>Scooters électriques</Link></li>
          <li><Link to="" className={classes.action}>Accessoires</Link></li>
          <li><Link to="" className={classes.action}>Service après vente</Link></li>
          <li><Link to="" className={classes.action}>Support</Link></li>
        </ul>
        
        <div className={classes.icons} >
          <Cart/>
          <User/>
        </div>
    </nav>
  );
}

export default Navigation;
