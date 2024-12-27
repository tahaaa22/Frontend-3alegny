import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    day: "",
    month: "",
    year: "",
    gender: "",
    allergies: "",
    drugs: "",
    medicalConditions: "",
    familyHistory: "",
    radiologyImages: null,
    labResults: null,
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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // try {
    //   // Replace this with an actual API call
    //   console.log("Submitted data:", data);
    //   alert(`${activeTab} account created successfully!`);
    //   navigate("/home");
    // } catch (error) {
    //   alert("Error occurred while signing up.");
    // }
  };

  return (
    <div className="login-tabs-container ">
      <div className="tab-content">
        <div className="login-form">
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
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
            <label>Date of Birth</label>
            <div className="dob-inputs">
              <input
                name="day"
                type="number"
                value={formData.day}
                onChange={handleInputChange}
                placeholder="DD"
                required
              />
              <input
                name="month"
                type="number"
                value={formData.month}
                onChange={handleInputChange}
                placeholder="MM"
                required
              />
              <input
                name="year"
                type="number"
                value={formData.year}
                onChange={handleInputChange}
                placeholder="YYYY"
                required
              />
            </div>
            <div classname="select-container">
            <label>Gender</label>
                <select 
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  classname="custom-select"
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
            </div>
            
            {/* <label>Allergies</label>
            <select
              name="allergies"
              value={formData.allergies}
              onChange={handleInputChange}
            >
              <option value="">Select Allergy</option>
              {[
                "Pollen",
                "Dust mites",
                "Mold",
                "Pet dander",
                "Almonds",
                "Walnuts",
                "Shellfish",
                "Eggs",
                "Soy",
                "Wheat",
                "Latex",
                "Insect stings",
                "Sesame",
                "Corn",
                "Fish",
                "Citrus fruits",
                "Beef",
                "Tomatoes",
                "Celery",
                "Mustard",
              ].map((allergy) => (
                <option key={allergy} value={allergy}>
                  {allergy}
                </option>
              ))}
            </select>
            <label>Drugs</label>
            <select
              name="drugs"
              value={formData.drugs}
              onChange={handleInputChange}
            >
              <option value="">Select Drug</option>
              {[
                "Aspirin",
                "Ibuprofen",
                "Metoprolol",
                "Lisinopril",
                "Clopidogrel",
                "Losartan",
                "Atorvastatin",
                "Levodopa",
                "Phenytoin",
                "Carbamazepine",
                "Gabapentin",
                "Donepezil",
                "Formaldehyde",
                "Ethanol",
                "Xylene",
                "Paraffin",
                "Hematoxylin",
                "Panadol",
              ].map((drug) => (
                <option key={drug} value={drug}>
                  {drug}
                </option>
              ))}
            </select>
            <label>Medical Conditions</label>
            <input
              name="medicalConditions"
              value={formData.medicalConditions}
              onChange={handleInputChange}
              placeholder="Enter medical conditions"
            />
            <label>Family History</label>
            <input
              name="familyHistory"
              value={formData.familyHistory}
              onChange={handleInputChange}
              placeholder="Enter family history"
            />
            <label>Radiology Images</label>
            <input
              type="file"
              name="radiologyImages"
              onChange={handleFileChange}
            />
            <label>Lab Results</label>
            <input type="file" name="labResults" onChange={handleFileChange} />
            <label>Create Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a password"
              required
            /> */}
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              required
            />
            <button className="login-btn" type="submit">
              Sign Up
            </button>
          </form>
          <p className="forgot-password">
            Already have an account?{" "}
            <button
              className="create-account-btn"
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
