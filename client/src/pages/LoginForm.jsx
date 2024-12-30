import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
// import axios from "axios";

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    // try {
    //   if (email === "test@patient.com" && password === "password") {
    //     alert("Login successful!");
    //     navigate("/home"); 
    //   } else {
    //     alert("Invalid email or password.");
    //   }
    // } catch (error) {
    //   alert("Login failed. Please try again.");
    // }
  };

  const handleSignUpRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="login-tabs-container">
      <div>
        <Navigation></Navigation>
      </div>
      <div className="tabs">
        <button
          className={activeTab === "patient" ? "tab active-tab" : "tab"}
          onClick={() => handleTabChange("patient")}
        >
          Patient Login
        </button>
        <button
          className={activeTab === "business" ? "tab active-tab" : "tab"}
          onClick={() => handleTabChange("business")}
        >
          Business Login
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "patient" && (
          <div className="login-form">
            <h2>
              Welcome to 3alegny!
              <br />
              Please Log in as a Patient
            </h2>
            <p>Please sign in to book appointments</p>
            <form onSubmit={submit}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Enter your email"
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
              <button className="login-btn" type="submit">
                Log In
              </button>
            </form>
            <button className="create-account-btn" onClick={handleSignUpRedirect}>
              Create an Account
            </button>
            <p className="forgot-password">
              Forget Password? <a href="#">Click Here</a>
            </p>
          </div>
        )}
        {activeTab === "business" && (
          <div className="login-form">
            <h2>
              Welcome to 3alegny!
              <br />
              Please Log in as a Business
            </h2>
            <p>Sign in to manage your business profile</p>
            <form onSubmit={submit}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Enter your email"
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
              <button className="login-btn" type="submit">
                Log In
              </button>
            </form>
            <button className="create-account-btn" onClick={handleSignUpRedirect}>
              Create an Account
            </button>
            <p className="forgot-password">
              Forget Password? <a href="#">Click Here</a>
            </p>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
