import React, { useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../Auth-Items/Input";
import Button from "../Auth-Items/Button";
import classes from "./Login.module.css";
import AuthContext from "../../AuthProvider";
const LOGIN_URL = "api/auth/login/";

function Login() {
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [success, setSuccess] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredUserName = usernameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const formData = {
      username: enteredUserName,
      email: enteredEmail,
      password: enteredPassword,
    };

    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify(formData), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const accessToken = response?.data?.key;
      const roles = response?.data;
      localStorage.setItem("token", accessToken);
      setAuth({ ...formData, roles, accessToken });
      setSuccess(true);
      navigate("/");
    } catch (error) {
      console.log(error);
      console.log(error);
  if (error.response && error.response.data && error.response.data.non_field_errors) {
    setErrors(error.response.data.non_field_errors[0].toString());
  } else {
    setErrors("An error occurred. Please try again later.");
  }
    }
  };

  return (
    <form className={classes[`form-container`]} onSubmit={submitHandler}>
      <Input
        type="text"
        label="User Name"
        ref={usernameInputRef}
        errorMessage={errors.username}
      />
      <Input
        type="email"
        label="Email Address"
        ref={emailInputRef}
        errorMessage={errors.email}
      />
      <Input
        type="password"
        label="Password"
        ref={passwordInputRef}
        errorMessage={errors.password}
      />
      
      <Button action="SIGN IN" />
    </form>
  );
}

export default Login;
