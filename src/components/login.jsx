import React, { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
export default function LoginForm() {
  const [userLogin, setUserLogin] = useState({
    name: "",
    password: "",
  });
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;
  const hasNumber = /[0-9]/;
  const hasSpecialChar = /[!@#$%^&*]/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const namePattern = /[A-Za-z]/;
  const mobilePattern = /[0-9]/;

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
    validateField(name, value);
  };
  const validateField = (fieldName, value) => {
    const errors = { ...formErrors };

    switch (fieldName) {
      case "name":
        if (value === "") {
          errors.name = "Please enter your name";
        } else if (!value.match(namePattern)) {
          errors.name = "Please Enter Alphabets only";
        } else if (value.length < 4) {
          errors.name = "Name should be greater than 3 letters";
        } else {
          delete errors.name;
        }
        break;
      case "password":
        if (value.length < 8) {
          errors.password = "Password must be at least 8 characters long";
        } else if (!hasUpperCase.test(value)) {
          errors.password = "Password must contain atleast One capital letter";
        } else if (!hasLowerCase.test(value)) {
          errors.password =
            "Password must contain atleast One Lowercase letter";
        } else if (!hasNumber.test(value)) {
          errors.password = "Password must contain atleast One number";
        } else if (!hasSpecialChar.test(value)) {
          errors.password =
            "Password must contain atleast One special character like @#$%^ ";
        } else {
          delete errors.password;
        }
        break;
      default:
        break;
    }

    setFormErrors(errors);
  };
  const [errorMessage, setErrorMessage] = useState("");
  const login = (e) => {
    e.preventDefault();

    const storedData = JSON.parse(localStorage.getItem("userData")) || [];
    const userData = storedData.find(
      (user) =>
        user.name === userLogin.name && user.password === userLogin.password
    );
    console.log(storedData);
    console.log(userLogin);

    if (userData) {
      alert("login successfully");
      navigate("/movieslist");
    } else {
      alert("Invalid Credentials");
    }
  };
  const navigate = useNavigate();
  const register = () => {
    navigate("/");
  };

  return (
    <div className="center">
      <form className="form1">
        <div className="title">Login</div>
        <div className="inputs">
          <div className="inputf">
            <div className="label5">Name</div>
          </div>
          <input
            type="textbox"
            className="nameInput"
            placeholder="name"
            name="name"
            required
            onChange={handleChange}
            value={userLogin.name}
          ></input>
          {formErrors.name && <p className="error">{formErrors.name}</p>}
          <div className="inputf">
            <div className="label51">Password</div>
            <input
              type="textbox"
              className="nameInput"
              placeholder="Password"
              required
              onChange={handleChange}
              name="password"
              value={userLogin.password}
            ></input>
          </div>
        </div>
        {formErrors.password && <p className="error">{formErrors.password}</p>}

        <button type="button" className="bt" onClick={login}>
          {" "}
          Login
        </button>

        <div className="text">
          New user? Create an account{" "}
          <p className="Register" onClick={register}>
            Register
          </p>
        </div>
      </form>
    </div>
  );
}
