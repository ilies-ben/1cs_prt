import { useState } from "react";
import classes from "./CouponCode.module.css";

function CouponCode() {
  const [couponCode, setCouponCode] = useState("");

  const handleCouponChange = (event) => {
    setCouponCode(event.target.value);
  };

  return (
    <div className={classes.couponCode}>
      <label htmlFor="couponCode" className={classes.label}></label>
      <input
        type="text"
        id="couponCode"
        value={couponCode}
        onChange={handleCouponChange}
        className={classes.input}
        placeholder="Coupon Code"
      />
    </div>
  );
}

export default CouponCode;