import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/LoginForm.module.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-3alegny-hpgag2fkg4hrb9c0.canadacentral-01.azurewebsites.net/users/login",
        { username, password }
      );
      const { role } = response.data; // Assuming the response contains the user role

      // Navigate based on the user's role
      switch (role) {
        case "Patient":
          navigate("/patient");
          break;
        case "Hospital":
          navigate("/hospitalportal");
          break;
        case "Pharmacy":
          navigate("/pharmacyportal");
          break;
        case "Admin":
          navigate("/adminportal");
          break;
        default:
          alert("Unknown role. Please contact support.");
      }
    } catch (error) {
      alert(error.response?.data || "An error occurred during login.");
    }
  };

  const handleSignUpRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h2>Welcome to 3alegny!</h2>
        <p>Please log in to access your account</p>
        <form onSubmit={submit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleInputChange}
            placeholder="Enter your username"
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
          />
          <button className={styles.loginBtn} type="submit">
            Log In
          </button>
        </form>
        <button
          className={styles.createAccountBtn}
          onClick={handleSignUpRedirect}
        >
          Create an Account
        </button>
        <p className={styles.forgotPassword}>
          Forgot Password? <a href="#">Click Here</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
