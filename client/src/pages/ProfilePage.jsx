import React from 'react';
import '../styles/ProfilePage.css'; // Import the CSS file

import {Link, Button} from "@nextui-org/react";

function ProfilePage() {
  return (
    
    <div className="dashboard-container">
      {/* Profile Card */}
      <div className="card profile-card">
        <h2>My Profile</h2>
        <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="profile-image"
          />
        <div className="profile-info">

          <div className="profile-details">
            <p><strong>Name:</strong> Edward Vincent</p>
            <p><strong>Email:</strong> edward.vincent@example.com</p>
            <p><strong>Phone:</strong> +1 123 456 7890</p>
            <p><strong>Birthdate:</strong> July 15, 1980</p>
            <Button 
              class="btn"
              as={Link}
              href="/edit-profile"
              variant="solid"
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Appointments Card */}
      <div className="card appointments-card">
        <h2>My Appointments</h2>
        <div className="small-card">
          <p><strong>Dr. Abigail Jones</strong></p>
          <p>Specialist: Cardiologist</p>
          <p>Date: 12/12/2024</p>
          <button className="btn">Cancel Appointment</button>
        </div>
        <div className="small-card">
          <p><strong>Dr. Michael Smith</strong></p>
          <p>Specialist: Dermatologist</p>
          <p>Date: 15/12/2024</p>
          <button className="btn">Cancel Appointment</button>
        </div>
        <button className="btn add-btn">Add Appointment</button>
      </div>

      {/* Orders Card */}
      <div className="card orders-card">
        <h2>My Orders</h2>
        <div className="small-card">
          <p><strong>Medicine:</strong> Aspirin</p>
          <p>Quantity: 2 packs</p>
          <p>Status: Delivered</p>
        </div>
        <div className="small-card">
          <p><strong>Medicine:</strong> Paracetamol</p>
          <p>Quantity: 1 pack</p>
          <p>Status: Pending</p>
        </div>
        <button className="btn add-btn">Add Order</button>
      </div>
    </div>
  );
}

export default ProfilePage;
