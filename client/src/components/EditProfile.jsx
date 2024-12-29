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
    image: "https://via.placeholder.com/150",
  });

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
        image: "https://via.placeholder.com/150",
      };
      setUserInfo(savedEHR);
    };

    fetchEHRData();
  }, []);

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
      <div className={`${styles.editProfileCard} ${styles.fancyCard}`}>
        <h1>Edit Profile</h1>
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

        <form className={styles.editProfileForm}>
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

          <button type="submit" className={styles.saveBtn}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
