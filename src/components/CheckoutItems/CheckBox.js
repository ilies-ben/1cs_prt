import { useState } from "react";
import classes from "./CheckBox.module.css";


function Checkbox(props) {
    const { label, onChange } = props;
    const [isChecked, setIsChecked] = useState(false);
  
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
      onChange(!isChecked);
    };
  
    return (
      <label className={classes.CheckboxLabel}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className={classes.checkbox}
        />
        {label}
      </label>
    );
  }
  
  export default Checkbox;