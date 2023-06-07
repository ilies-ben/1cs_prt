import classes from "./inputItem.module.css";
import React, { forwardRef } from 'react';

const ProfileInput = forwardRef(({ label, type, id, name, placeholder }, ref) => {
  return (
    <div className="mb-8">
      <label htmlFor={id}>{label}</label>
      <input ref={ref} type={type} id={id} name={name} required placeholder={placeholder} className={classes.inputItem} />
    </div>
  );
});

export default ProfileInput;
