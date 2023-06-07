import classes from './CartContent.module.css'
import Headers from './Headers';
import ProductItem from './ProductItem';
import PaymentOptions from './PaimentOptions';
import CouponCode from './CouponCode';
import Button from './ActionButton';
import velo from "../../Assets/velo-50.png"
import batt from '../../Assets/batt-50.png'
function CartContent(){
    const total = JSON.parse(localStorage.getItem('total')) || []
return(
    <div className={classes.contentContainer}>
        <Headers title="Subtotal:" spanText={total} />
        <Headers title="Shipping:" spanText="Free" />
        <div className={classes.borderLine}></div>
        <Headers title="Total:" spanText={total} />
        <PaymentOptions />
        <div className={classes.giftCode}>
        <CouponCode/>
        <Button text="Apply Coupon" />
        </div>
        <Button text="Place Order" />
    </div>
)
}

export default CartContent;