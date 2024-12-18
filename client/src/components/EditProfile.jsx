import React, { useState, useEffect } from "react";
import styles from "../styles/EditProfile.module.css";

function EditProfile() {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    allergies: "",
    drugs: "",
    medicalConditions: "",
    familyHistory: "",
    password: "",
    image: "https://via.placeholder.com/150", // Default placeholder image
  });

  // Simulate fetching EHR data (replace with real API call)
  useEffect(() => {
    const fetchEHRData = async () => {
      const savedEHR = {
        firstName: "Edward",
        lastName: "Vincent",
        email: "edward.vincent@example.com",
        phone: "+1 123 456 7890",
        allergies: "Pollen, Peanuts",
        drugs: "Aspirin",
        medicalConditions: "Hypertension",
        familyHistory: "Diabetes, Heart Disease",
        password: "********",
        image: "https://via.placeholder.com/150", // Replace with real URL
      };
      setUserInfo(savedEHR);
    };

    fetchEHRData();
  }, []);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserInfo((prev) => ({ ...prev, image: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.editProfileContainer}>
      <div className={styles.fancyCard}>
        <h1 className={styles.title}>Edit Profile</h1>

        {/* Profile Picture Section */}
        <div className={styles.profilePictureSection}>
          <img
            src={userInfo.image}
            alt="Profile"
            className={styles.profilePicture}
          />
          <label htmlFor="profileImage" className={styles.uploadBtn}>
            Upload New Image
          </label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        {/* Form Section */}
        <form className={styles.editProfileForm}>
          {/* First Row (First Name & Last Name) */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                defaultValue={userInfo.firstName}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                defaultValue={userInfo.lastName}
              />
            </div>
          </div>

          {/* Second Row (Email & Phone) */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={userInfo.email}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                defaultValue={userInfo.phone}
              />
            </div>
          </div>

          {/* Third Row (Allergies & Drugs) */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="allergies">Allergies</label>
              <input
                type="text"
                id="allergies"
                name="allergies"
                defaultValue={userInfo.allergies}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="drugs">Drugs</label>
              <input
                type="text"
                id="drugs"
                name="drugs"
                defaultValue={userInfo.drugs}
              />
            </div>
          </div>

          {/* Fourth Row (Medical Conditions & Family History) */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="medicalConditions">Medical Conditions</label>
              <input
                type="text"
                id="medicalConditions"
                name="medicalConditions"
                defaultValue={userInfo.medicalConditions}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="familyHistory">Family History</label>
              <input
                type="text"
                id="familyHistory"
                name="familyHistory"
                defaultValue={userInfo.familyHistory}
              />
            </div>
          </div>

          {/* Fifth Row (Password & Confirm Password) */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                defaultValue={userInfo.password}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="********"
              />
            </div>
          </div>

          {/* Save Button */}
          <button type="submit" className={styles.saveBtn}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
