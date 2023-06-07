import classes from "./Checkout.module.css";
import InputList from "../components/CheckoutItems/InputList";
import CartContent from "../components/CheckoutItems/CartContent";
function Checkout() {
    

    return(
        <section className={classes.checkout}>
            <div className={classes.checkoutContent}>
                <h1 className={classes.checkoutHeader}>Billing Details</h1>
                <div className={classes.container}>
                    <InputList/>
                    <CartContent/>
                </div>
            </div>
      </section>
    )
 
}

export default Checkout;
