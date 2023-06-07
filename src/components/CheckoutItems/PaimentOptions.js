import { useState } from "react";
import classes from './PaimentOptions.module.css'
function PaymentOptions() {
  const [paymentOption, setPaymentOption] = useState("");

  const handleOptionChange = (event) => {
    setPaymentOption(event.target.value);
  };

  return (
    <div className={classes.paymentOptions}>
      <label className={classes.option}>
        <input
          type="radio"
          name="paymentOption"
          value="bank"
          checked={paymentOption === "bank"}
          onChange={handleOptionChange}
          className={classes.radio}
        />
        Bank
      </label>
      <label className={classes.option}>
        <input
          type="radio"
          name="paymentOption"
          value="cash"
          checked={paymentOption === "cash"}
          onChange={handleOptionChange}
          className={classes.radio}
        />
        Cash on deleviry
      </label>
    </div>
  );
}

export default PaymentOptions;