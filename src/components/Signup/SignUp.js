import Input from "../Auth-Items/Input";
import Button from "../Auth-Items/Button";
import classes from "./SignUp.module.css";
import { useState, useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
const REGISTER_URL = "api/auth/registration/";

function SignUp() {
  const navigate =useNavigate();

  const [gender, setGender] = useState();
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const phoneInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordconfirmInputRef = useRef();
  const addressInputRef = useRef();
  const birthdateInputRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const firstNameEnteredValue = firstNameInputRef.current.value;
    const lastNameEnteredValue = lastNameInputRef.current.value;
    const emailEnteredValue = emailInputRef.current.value;
    const phoneEnteredValue = phoneInputRef.current.value;
    const passwordEnteredValue = passwordInputRef.current.value;
    const passwordconfirmEnteredValue = passwordconfirmInputRef.current.value;
    const addressEnteredValue = addressInputRef.current.value;
    const sexEnteredValue = gender;
    const birthdateEnteredValue = birthdateInputRef.current.value;
  
    const formData = {
      email: emailEnteredValue,
      password1: passwordEnteredValue,
      password2: passwordconfirmEnteredValue,
      first_name: firstNameEnteredValue,
      last_name: lastNameEnteredValue,
      phone: phoneEnteredValue,
      adress: addressEnteredValue,
      sex: sexEnteredValue,
      date_of_birth: birthdateEnteredValue,
    };
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify(formData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data?.key);
      navigate("/auth")
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
    
    console.log(formData);
  };

  useEffect(() => {
    const passwordInput = passwordInputRef.current;
    const passwordConfirmInput = passwordconfirmInputRef.current;

    const updateConfirmPasswordPattern = () => {
      passwordConfirmInput.setCustomValidity("");
      passwordConfirmInput.pattern = passwordInput.value;
    };

    passwordInput.addEventListener("input", updateConfirmPasswordPattern);

    return () => {
      passwordInput.removeEventListener("input", updateConfirmPasswordPattern);
    };
  }, [passwordInputRef, passwordconfirmInputRef]);

  return (
    <form className={classes[`form-container`]} onSubmit={submitHandler}>
      <div className={classes[`input-100`]}>
        <div className={classes[`input-50`]}>
          <Input type="text" label="First Name" ref={firstNameInputRef} errorMessage={errors.first_name}  />
          <Input type="text" label="Last Name" ref={lastNameInputRef} errorMessage={errors.last_name}  />
        </div>
      </div>
      <Input type="email" label="Email Address" ref={emailInputRef} errorMessage={errors.email}  />
      <Input type="tel" label="Phone Number" ref={phoneInputRef} errorMessage={errors.phone}  />
      <Input type="password" label="Password" ref={passwordInputRef} errorMessage={errors.password1}  />
      <Input
        type="password"
        label="Confirm Password"
        ref={passwordconfirmInputRef}
        errorMessage={errors.password2}
        
      />
      <Input type="text" label="Address" ref={addressInputRef} errorMessage={errors.adress} />
      <div className={classes.genderOp}>
        <label className={classes.option}>
          <input
            type="radio"
            name="gender"
            value="Male"
            className={classes.radio}
            onChange={(e) => setGender(e.target.value)}
          />
          Male
        </label>
        <label className={classes.option}>
          <input
            type="radio"
            name="gender"
            value="Female"
            className={classes.radio}
            onChange={(e) => setGender(e.target.value)}
          />
          Female
        </label>
      </div>
      <Input type="date" label="" ref={birthdateInputRef} />
      <Button action="SIGN UP" />
    </form>
  );
}

export default SignUp;

//checked={gender === 'female'} onChange={() => setGender('female')}
/* try {
  const response = await axios.post("http://127.0.0.1:8000/api/auth/registration/", formData);
  const token = response.data.access;
  localStorage.setItem("token", token);
  setToken(token); 
  setErrors({});
} catch (error) {
  console.log(error);
  setErrors(error.response.data);
} */