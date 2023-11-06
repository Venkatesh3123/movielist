import "../styles/signup.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  faUser,
  faLocationDot,
  faHeart,
  faLock,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    phoneNumber: "",
    repassword: "",
    profession: "",
  });
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;
  const hasNumber = /[0-9]/;
  const hasSpecialChar = /[!@#$%^&*]/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const namePattern = /[A-Za-z]/;
  const mobilePattern = /[0-9]/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    const errors = { ...formErrors };

    switch (fieldName) {
      case "name":
        if (value.trim() === "") {
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
      case "email":
        if (!value.match(/^\S+@\S+\.\S+$/i)) {
          errors.email = "Invalid email format";
        } else if (value.length < 4) {
          errors.email = "Location should be greater than 3 letters";
        } else if (!emailPattern.test(value)) {
          errors.email = "Please enter valid email format @gmail.com";
        } else {
          delete errors.email;
        }
        break;
      case "repassword":
        if (!value.match(formData.password)) {
          errors.repassword = "please enter the password as previous password";
        } else {
          delete errors.repassword;
        }
        break;
      case "phoneNumber":
        if (!value.match(/^\d{10}$/)) {
          errors.phoneNumber = "Phone number must be 10 digits";
        } else if (!value.match(mobilePattern)) {
          errors.phoneNumber = "Please Enter Numbers only";
        } else if (value.match(namePattern)) {
          errors.phoneNumber = "Please Enter Numbers only";
        } else {
          delete errors.phoneNumber;
        }
        break;
      case "profession":
        if (value === "") {
          errors.profession = "please select one of the option";
        } else {
          delete errors.profession;
        }
        break;
      default:
        break;
    }

    setFormErrors(errors);
  };
  const [errorMessage, setErrorMessage] = useState("");
  const Otp = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem("userData")) || [];
    const isEmailExists = existingUsers.some(
      (user) => user.email === formData.email
    );
    if (isEmailExists) {
      alert("User with this email already exists.");
      console.log(setErrorMessage);
    } else {
      const updatedUsers = [...existingUsers, formData];
      localStorage.setItem("userData", JSON.stringify(updatedUsers));
      alert("Registration successful!");
      navigate("/loginform");
    }
  };
  const login = () => {
    navigate("/loginform");
  };
  return (
    <>
      <div className="mainContainer">
        <div className="head-main">
          <div className="main">
            <h2 className="head">SIGN UP</h2>
            <form onSubmit={Otp}>
              <label className="label12">NAME:</label>
              <div className="nameDiv">
                <FontAwesomeIcon icon={faUser} size="xl" className="user" />
                <input
                  type="textbox"
                  className="nameInput"
                  name="name"
                  placeholder="Enter Your Name"
                  required
                  onChange={handleChange}
                  value={formData.name}
                  // onClick={nameClick}
                ></input>
              </div>

              {formErrors.name && <p className="error">{formErrors.name}</p>}

              <label className="label12">EMAIL:</label>

              <div className="nameDiv">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  size="xl"
                  className="user"
                />

                <input
                  type="textbox"
                  className="nameInput"
                  placeholder="Enter Your Email"
                  required
                  onChange={handleChange}
                  name="email"
                  value={formData.email}

                  // onClick={locationClick}
                ></input>
              </div>
              {/* {submit1 & (locate == false) ? (
              <p className="error">{error.location1}</p>
            ) : (
              <p></p>
            )}
            {(location === "") & (submit1 == false) ? (
              <p className="error">{error.location1}</p>
            ) : (
              <p></p>
            )} */}
              {formErrors.email && <p className="error">{formErrors.email}</p>}

              <label className="label12">PROFESSION</label>
              <div className="nameDiv">
                <FontAwesomeIcon icon={faHeart} size="xl" className="user" />
                <select
                  className="nameInput"
                  onChange={handleChange}
                  value={formData.profession}
                  name="profession"
                >
                  <option value="">Profession Status</option>
                  <option value="Student">Student</option>
                  <option value="Employee">Employee</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              {formErrors.profession && (
                <p className="error">{formErrors.profession}</p>
              )}
              <label className="label12">PASSWORD:</label>
              <div className="nameDiv">
                <FontAwesomeIcon icon={faLock} size="xl" className="user" />
                <input
                  type="password"
                  className="nameInput"
                  placeholder="Enter Your Password"
                  required
                  onChange={handleChange}
                  // onBlur={passClick}
                  value={formData.password}
                  name="password"
                ></input>
              </div>
              {/* {passSubmit & (pass == false) ? (
              <p className="error">{error.password1}</p>
            ) : (
              <p></p>
            )} */}
              {formErrors.password && (
                <p className="error">{formErrors.password}</p>
              )}

              <label className="label12">CONFIRM-PASSWORD:</label>
              <div className="nameDiv">
                <FontAwesomeIcon icon={faLock} size="xl" className="user" />
                <input
                  type="password"
                  className="nameInput"
                  placeholder="Enter Your Password"
                  required
                  onChange={handleChange}
                  value={formData.repassword}
                  name="repassword"
                  //   onClick={repassClick}
                ></input>
              </div>

              {formErrors.repassword && (
                <p className="error">{formErrors.repassword}</p>
              )}
              <label className="label12">MOBILE NUMBER:</label>
              <div className="nameDiv">
                <FontAwesomeIcon icon={faPhone} size="xl" className="user" />

                <input
                  type="text"
                  className="input1"
                  placeholder="Enter your mobile number"
                  required
                  onChange={handleChange}
                  value={formData.phoneNumber}
                  name="phoneNumber"
                  // onClick={mobileClick}
                ></input>
              </div>

              {formErrors.phoneNumber && (
                <p className="error">{formErrors.phoneNumber}</p>
              )}

              <button className="otp">Signup</button>
            </form>
            <div className="text">
              Exisiting user?
              <p className="Register" onClick={login}>
                login
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
