import React from "react";
import "../styles/EditProfile.css";


function EditProfile() {
  return (
    <div className="edit-profile-container">
      <div className="edit-profile-card">
        <h1>Edit Profile</h1>
        <form className="edit-profile-form">
          {/* First Row (First Name & Last Name) */}
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" />
          </div>

          {/* Second Row (Email & Phone) */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" name="phone" />
          </div>

          {/* Third Row (Password & Confirm Password) */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" />
          </div>

          {/* Save Button */}
          <button type="submit" className="save-btn">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
