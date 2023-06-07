import { useState } from "react";
import classes from "./InputList.module.css"
import Checkbox from "./CheckBox";
function InputList(){
    const [saveInfo, setSaveInfo] = useState(false);

    const handleSaveInfoChange = (isChecked) => {
      setSaveInfo(isChecked);
    };
  
    return(
        <form className={classes[`checkout-form`]} >
      <label htmlFor="first-name">First Name <span className={classes.required}>*</span></label>
      <input type="text" id="first-name" name="first-name" required className={classes.inputItem}/>

      <label htmlFor="last-name">Last Name <span className={classes.required}>*</span></label>
      <input type="text" id="last-name" name="last-name"  required className={classes.inputItem}/>

      <label htmlFor="street-address">Street Address <span className={classes.required}>*</span></label>
      <input type="text" id="street-address" name="street-address"  required className={classes.inputItem} />

      <label htmlFor="apartment">Apartment,Floor,etc (optional)</label>
      <input type="text" id="apartment" name="apartment" className={classes.inputItem} />

      <label htmlFor="town">Town/City <span className={classes.required}>*</span></label>
      <input type="text" id="town" name="town" required className={classes.inputItem} />

      <label htmlFor="phone-number">Phone Number <span className={classes.required}>*</span></label>
      <input type="tel" id="phone-number" name="phone-number"  required className={classes.inputItem} />

      <label htmlFor="email-address">Email Address <span className={classes.required}>*</span></label>
      <input type="email" id="email-address" name="email-address" required className={classes.inputItem} />
      <br/>
      <Checkbox
        label="Save this information for faster check-out next time"
        onChange={handleSaveInfoChange}
      />
    </form>
    )
}

export default InputList;