import React, { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import styles from "../styles/ProfilePage.module.css";
import axios from "axios";

function ProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [patientData, setPatientData] = useState(null);
  const patient =location.state.patientdata
  // Extract patient ID from state
  const patientId = patient.id;
  console.log("id", patientId)


  useEffect(() => {
    if (!patientId) {
      console.error("Patient ID not found");
      return;
    }

    // Fetch patient data using GET method
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(
          `https://backend-3alegny-hpgag2fkg4hrb9c0.canadacentral-01.azurewebsites.net/patient/${patientId}`
        );
        console.log("API Response:", response.data);

        // if (!response.ok) {
        //   throw new Error(`Error: ${response.statusText}`);
        // }

        // const data = await response.json();

        // Extract relevant details
        setPatientData({
          name: response.data.name,
          email: response.data.contactInfo.email,
          phone: response.data.contactInfo.phone,
          birthdate: response.data.dateOfBirth,
        });
        console.log("data:",patientData);

      } catch (error) {
        console.error("Failed to fetch patient data:", error);
      } //finally {
      //   setLoading(false);
      // }
    };

    fetchPatientData();
  }, [patientId]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (!patientData) {
    return <div>Patient data not available</div>;
  }


  // // Mock Patient Data
  // const patientData = {
  //   image: "https://via.placeholder.com/150",
  //   name: "Edward Vincent",
  //   email: "edward.vincent@example.com",
  //   phone: "+1 123 456 7890",
  //   birthdate: "July 15, 1980",
  //   allergies: "None",
  //   drugs: "Paracetamol",
  //   medicalConditions: "Hypertension",
  //   familyHistory: "Heart Disease",
  // };

  const appointments = [
    { doctor: "Dr. Abigail Jones", specialty: "Cardiologist", date: "12/12/2024" },
    { doctor: "Dr. Michael Smith", specialty: "Dermatologist", date: "15/12/2024" },
  ];

  const orders = [
    { medicine: "Aspirin", quantity: "2 packs", status: "Delivered" },
    { medicine: "Paracetamol", quantity: "1 pack", status: "Pending" },
  ];

  return (
    <div className={styles.dashboardContainer}>
    {/* Profile Card */}
    <div className={styles.profileCard}>
      <h2>My Profile</h2>
      <img src={patientData.image} alt="Profile" className={styles.profileImage} />
      <div className={styles.profileInfo}>
        <div className={styles.profileDetails}>
          <p><strong>Name:</strong> {patientData.name}</p>
          <p><strong>Email:</strong> {patientData.email}</p>
          <p><strong>Phone:</strong> {patientData.phone}</p>
          <p><strong>Birthdate:</strong> {patientData.birthdate}</p>

          <button className={styles.btn} onClick={() => navigate("/edit-profile",{ state: { patientId} })}>
            Edit Profile
          </button>
          <hr />
          <button className={`${styles.btn} ${styles.myPhrBtn}`}   onClick={() => {
    console.log(patientId); // Log patientId before navigation
    navigate("/phr", { state: { patientId } });
  }}>
            My PHR
          </button>
        </div>
      </div>
              {/* Progress Notes Section */}
        <div className={styles.progressNotesContainer}>
          <h2>Progress Notes</h2>
          {/* Progress Note 1 */}
          <div className={styles.progressNoteCard}>
            <div className={styles.noteSummary}>
              Follow-up appointment needed with <strong>Dermatology</strong>.
            </div>
            <div className={styles.noteDetails}>
              <p>
                Last visited: <strong>05/11/2024</strong>
              </p>
              <p>
                Reason: Skin allergy treatment.
              </p>
              <p>
                Recommended next appointment: <strong>10/12/2024</strong>.
              </p>
            </div>
          </div>

          {/* Progress Note 2 */}
          <div className={styles.progressNoteCard}>
            <div className={styles.noteSummary}>
              Follow-up appointment needed with <strong>Cardiology</strong>.
            </div>
            <div className={styles.noteDetails}>
              <p>
                Last visited: <strong>28/10/2024</strong>
              </p>
              <p>
                Reason: Regular heart checkup.
              </p>
              <p>
                Recommended next appointment: <strong>30/01/2025</strong>.
              </p>
            </div>
          </div>

          {/* Progress Note 3 */}
          <div className={styles.progressNoteCard}>
            <div className={styles.noteSummary}>
              Follow-up appointment needed with <strong>Orthopedics</strong>.
            </div>
            <div className={styles.noteDetails}>
              <p>
                Last visited: <strong>15/09/2024</strong>
              </p>
              <p>
                Reason: Post-surgery consultation for knee replacement.
              </p>
              <p>
                Recommended next appointment: <strong>20/12/2024</strong>.
              </p>
            </div>
          </div>
        </div>

    </div>


  
    {/* Appointments Card */}
    <div className={styles.appointmentsCard}>
      <h2>My Appointments</h2>
      <table>
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Specialty</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.doctor}</td>
              <td>{appointment.specialty}</td>
              <td>{appointment.date}</td>
              <td>
                <button className={styles.cancelBtn}>Cancel Appointment</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={styles.addBtn} onClick={() => navigate("/patient")}>
        Add Appointment
      </button>
    </div>
  
    {/* Orders Card */}
    <div className={styles.ordersCard}>
      <h2>My Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Medicine</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.medicine}</td>
              <td>{order.quantity}</td>
              <td>{order.status}</td>
              <td>
                <button className={styles.reorderBtn}>Reorder</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={styles.addBtn} onClick={() => navigate("/patient")}>
        Add Order
      </button>
    </div>
  </div>
  
  );
}

export default ProfilePage;
