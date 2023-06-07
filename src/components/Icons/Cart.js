import { Link } from "react-router-dom";
import classes from "./icon.module.css"
import cart from "../../Assets/Cart.png"
function Cart(props){
    return(
        <span className={classes.cart}>
            <Link to="/cart">
                <img src={cart} className={classes.icon} />
              
            </Link>
        </span>
    )
}

export default Cart;