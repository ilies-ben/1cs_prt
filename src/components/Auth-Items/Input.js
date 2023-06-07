/* import classes from './Input.module.css'
import React, { forwardRef } from 'react';
import { useState } from 'react';

const Input = React.forwardRef((props, ref) => {
  const [focused ,setFocused]=useState(false)
 const handleFocus =(e)=>{
  setFocused(true)
 }
  return (
    <div className={classes['input-box']}>
      <input type={props.type} onKeyUp={props.validation}  ref={ref} pattern={props.pattern} onBlur={handleFocus} focused={focused.toString()} required/>
      <span>{props.label}</span>
      <div className={classes.error}>{props.errorMessage}</div>
      
    </div>
  );
})

export default Input; */


import React, { forwardRef, useState } from 'react';
import classes from './Input.module.css';

const Input = forwardRef(({ type, label, pattern, validation, errorMessage }, ref) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className={classes['input-box']}>
      <input
        type={type}
        ref={ref}
        pattern={pattern}
        onKeyUp={validation}
        onBlur={handleFocus}
        className={errorMessage ? classes.error : ''}
        required
      />
      <span>{label}</span>
      {errorMessage && <div className={classes.error}>{errorMessage}</div>}
    </div>
  );
});

export default Input;