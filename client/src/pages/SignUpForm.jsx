"use client";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../styles/SignUpForm.module.css"; // Import styles

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    contactInfo: "",
    address: "",
    username: "",
    dateofbirth: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      username,
      gender,
      dateofbirth,
      confirmPassword,
      password,
      contactInfo,
      address,
    } = formData;

    try {
      await axios.post(
        "https://backend-3alegny-hpgag2fkg4hrb9c0.canadacentral-01.azurewebsites.net/users/signup",
        {
          name: `${firstName} ${lastName}`,
          dateBirth: dateofbirth,
          contactInfo: contactInfo,
          address: address,
          userName: username,
          createPassword: password,
          confirmPassword: confirmPassword,
          gender: gender,
        }
      );
      alert("Welcome! Account created successfully.");
      navigate("/home");
    } catch (error) {
      alert(error.response?.data || "An error occurred during signup.");
    }
  };

  return (
    <div className={styles.loginTabsContainer}>
      <div className={styles.tabContent}>
        <div className={styles.loginForm}>
          <h2>
            Welcome to 3alegny!
            <br />
          </h2>
          <form onSubmit={submit}>
            <label>First Name</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter your first name"
              required
            />
            <label>Last Name</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter your last name"
              required
            />
            <label>Contact Info</label>
            <input
              name="contactInfo"
              type="number"
              value={formData.contactInfo}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              required
            />
            <label>Username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              required
            />
            <label>Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your Address"
            />
            <label>Date of Birth</label>
            <div className={styles.dobInputs}>
              <input
                name="dateofbirth"
                type="date"
                value={formData.dateofbirth}
                onChange={handleInputChange}
                placeholder="DD"
                required
              />
            </div>
            <div className={styles.selectContainer}>
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              required
            />
            <button className={styles.loginBtn} type="submit">
              Sign Up
            </button>
          </form>
          <p className={styles.forgotPassword}>
            Already have an account?{" "}
            <button
              className={styles.createAccountBtn}
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
