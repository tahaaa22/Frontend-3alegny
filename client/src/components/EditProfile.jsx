import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import axios from "axios";
import styles from "../styles/EditProfile.module.css";

function EditProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const patientId = location.state?.patientId; // Ensure safe access

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
    confirmPassword: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    image: "https://via.placeholder.com/150", // Default placeholder
  });

  // Fetch patient data
  useEffect(() => {
    if (!patientId) return;

    const fetchEHRData = async () => {
      try {
        const response = await axios.get(
          `https://backend-3alegny-hpgag2fkg4hrb9c0.canadacentral-01.azurewebsites.net/patient/${patientId}`
        );
        console.log("Fetched Patient Data:", response.data);

        const fullName = response.data.name || "";
        const nameParts = fullName.split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        setUserInfo((prev) => ({
          ...prev,
          firstName,
          lastName,
          email: response.data.contactInfo?.email || "",
          phone: response.data.contactInfo?.phone || "",
          password: response.data.password || "",
        }));
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchEHRData();
  }, [patientId]);

  // Handle form submission
  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (!patientId) {
      console.error("Patient ID is missing!");
      return;
    }

    const updatedData = {
      userName: `${userInfo.firstName} ${userInfo.lastName}`,
      password: userInfo.password,
      imageUrl: userInfo.image || "N/A",
      phone: userInfo.phone,
      email: userInfo.email,
      street: userInfo.street || "N/A",
      city: userInfo.city || "N/A",
      state: userInfo.state || "N/A",
      zipCode: userInfo.zipCode || "N/A",
    };

    try {
      console.log("Payload being sent:", updatedData);
      const response = await axios.put(
        `https://backend-3alegny-hpgag2fkg4hrb9c0.canadacentral-01.azurewebsites.net/patient/update/${patientId}`,
        updatedData
      );
      console.log("Patient data updated:", response.data);

      navigate("/MyProfile");
    } catch (error) {
      console.error("Error updating patient data:", error);
    }
  };

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

      <form className={styles.editProfileForm} onSubmit={handleSaveChanges}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={userInfo.firstName}
              onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={userInfo.lastName}
              onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
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
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={userInfo.phone}
              onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
            />
          </div>
        </div>

          {/* Add other form fields similarly */}
          <button type="submit" className={styles.saveBtn}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
