import React, { useState ,useEffect} from "react";
import { Line } from "react-chartjs-2";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";
import styles from "../styles/PHRPage.module.css";

function PHRPage() {
    const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("phr");
  const [modalData, setModalData] = useState(null);
  const [phrData, setPhrData] = useState(null);
  const [appointment, setappointment] = useState(null); // State for appointment data
  const [order, setorder] = useState(null); // State for appointment data

  const location = useLocation(); // Get the location object

  const patientId = location.state.patientId ; 
  console.log("Patient ID:", patientId);
  const [weight, setweight] = useState([]);
  const [bmi, setbmi] = useState([]);
  const [labReports, setlabReports] = useState([]);
  const [radiologyImages, setradiologyImages] = useState([]);


  useEffect(() => {

    const fetchPHRData = async () => {
      
      try {
        console.log("About to call the API");
  
        const response = await axios.get(
          `https://backend-3alegny-hpgag2fkg4hrb9c0.canadacentral-01.azurewebsites.net/patient/getphr/${patientId}`
        );
  
        console.log("API Response Data:", response.data);
        console.log("weight Data:", response.data.data.weight);

        // Assuming the response.data contains the needed PHR data directly
        setPhrData(response.data.data); 
        setweight(response.data.data.weight);
        setbmi(response.data.data.bmi)
        setlabReports(response.data.data.labResultsURL)
        setradiologyImages(response.data.data.imagingResults)

      // Fetch appointment data after successfully fetching PHR data
      const appointmentResponse = await axios.get(
        `https://backend-3alegny-hpgag2fkg4hrb9c0.canadacentral-01.azurewebsites.net/appointment/get/${patientId}`
      );

      console.log("Appointment API Response Data:", appointmentResponse.data);

      // Update state with appointment data
    // Extract required fields from each appointment
    const formattedAppointments = appointmentResponse.data.map(appointment => ({
      appointmentDate: appointment.appointmentDate,
      department: appointment.department,
      doctorName: appointment.doctorName,
      hospitalName: appointment.hospitalName,
    }));

    console.log("Formatted Appointments:", formattedAppointments);

    // Store the formatted appointments in the state
    setappointment(formattedAppointments);
      // Fetch appointment data after successfully fetching PHR data
    //   const orderResponse = await axios.get(
    //     `https://backend-3alegny-hpgag2fkg4hrb9c0.canadacentral-01.azurewebsites.net/appointment/get/${patientId}`
    //   );

    //   console.log("order API Response Data:", orderResponse.data);

    //   // Update state with appointment data
    // // Extract required fields from each appointment
    // const formattedorders = appointmentResponse.data.map(order => ({
    //   pharm: order.appointmentDate,
    //   category: order.drugs.category,
    //   medicine: order.drugs.name,
    //   quantity: order.drugs.quantity,
    // }));

    // console.log("Formatted Appointments:", formattedAppointments);

    // // Store the formatted appointments in the state
    // setappointment(formattedAppointments);
      // Fetch Order Data
      const orderResponse = await axios.get(
        `https://backend-3alegny-hpgag2fkg4hrb9c0.canadacentral-01.azurewebsites.net/order/get/${patientId}`
      );
      console.log("Order Data:", orderResponse.data);
      setorder(orderResponse.data);  // Set order data

      } catch (error) {
        console.error("Failed to fetch patient data:", error.response || error.message);
      }
    };
  
    if (patientId) {
      fetchPHRData();
    } else {
      console.error("Patient ID is not available");
    }
  }, []);
  
  
  console.log("Patient data:", phrData);

  // Mock Data
  const patientData = {
    image: "https://via.placeholder.com/150", 
    name: "Edward Vincent",
    email: "edward.vincent@example.com",
    phone: "+1 123 456 7890",
    birthdate: "July 15, 1980",
    allergies: "None",
    drugs: "Paracetamol",
    medicalConditions: "Hypertension",
    familyHistory: "Heart Disease",
    weightHistory: [60, 62, 63, 64, 66, 67],
  };

  // Mock Data for Appointments
  // const appointments = [
  //   { doctor: "Dr. Abigail Jones", specialty: "Cardiology", hospital: "City Hospital", date: "10/12/2024", comments: "Routine check-up", orders: "Blood test", notes: "Patient stable", prescription: "Beta blockers" },
  //   { doctor: "Dr. Michael Smith", specialty: "Dermatology", hospital: "General Medical Center", date: "05/11/2024", comments: "Skin allergy treatment", orders: "Allergy test", notes: "Monitor symptoms", prescription: "Antihistamines" },
  //   { doctor: "Dr. Susan Carter", specialty: "Orthopedics", hospital: "OrthoCare Clinic", date: "28/10/2024", comments: "Back pain assessment", orders: "X-ray", notes: "Physical therapy recommended", prescription: "Pain relievers" },
  //   { doctor: "Dr. Emily Green", specialty: "Neurology", hospital: "Neurology Institute", date: "15/09/2024", comments: "Migraine consultation", orders: "MRI", notes: "Follow-up in 1 month", prescription: "Migraine medication" },
  //   { doctor: "Dr. David Brown", specialty: "ENT", hospital: "Ear & Nose Clinic", date: "01/08/2024", comments: "Sinus infection treatment", orders: "CT scan", notes: "Antibiotics prescribed", prescription: "Amoxicillin" },
  // ];
  

  // Mock Data for Orders
  const orders = [
    { medicine: "Paracetamol", category: "Antipyretics", quantity: "2 packs", pharmacy: "Central Pharmacy", status: "Delivered", comments: "Ordered for fever" },
    { medicine: "Amoxicillin", category: "Antibiotics", quantity: "1 bottle", pharmacy: "Neighborhood Pharmacy", status: "Delivered", comments: "Prescribed for infection" },
    { medicine: "Dental Kit", category: "Dental Care", quantity: "1 set", pharmacy: "Dental Supplies", status: "Delivered", comments: "For dental hygiene" },
    { medicine: "Ibuprofen", category: "Pain Relief", quantity: "1 pack", pharmacy: "City Pharmacy", status: "Delivered", comments: "For joint pain" },
    { medicine: "Vitamin D", category: "Supplements", quantity: "1 bottle", pharmacy: "Health Store", status: "Delivered", comments: "For vitamin deficiency" },
  ];
  

  // const appointmentChartData = {
  //   labels: [
  //     ...new Set(appointment.map(appt => appt.department)) // Extract unique departments from the appointment array
  //   ],
  //   datasets: [
  //     {
  //       label: "Appointments by Department",
  //       data: [
  //         ...new Set(appointment.map(appt => appt.department)) // Same unique departments as labels
  //       ].map(department => {
  //         // Count the number of appointments for each department
  //         return appointment.filter(appt => appt.department === department).length;
  //       }),
  //       backgroundColor: [
  //         "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"
  //       ], // Colors for each department
  //     },
  //   ],
  // };
  
  // Counting the number of appointments per department
  const departmentCounts = Array.isArray(appointment) && appointment.length > 0 
    ? appointment.reduce((acc, { department }) => {
        acc[department] = (acc[department] || 0) + 1;
        return acc;
      }, {})
    : {};

  // Extract department names and counts for the chart
  const departmentNames = Object.keys(departmentCounts);
  const departmentVisits = Object.values(departmentCounts);

  // Bar chart data
  const appointmentChartData = {
    labels: departmentNames,
    datasets: [
      {
        label: "Number of Visits",
        data: departmentVisits,
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"
        ], // Colors for each department        borderColor: "#36A2EB",
        borderWidth: 1,
      },
    ],
  };
  const hospitalCounts = Array.isArray(appointment) && appointment.length > 0 
    ? appointment.reduce((acc, { hospitalName }) => {
        acc[hospitalName] = (acc[hospitalName] || 0) + 1;
        return acc;
      }, {})
    : {};

  // Extract department names and counts for the chart
  const hospitalNames = Object.keys(hospitalCounts);
  const hospitalVisits = Object.values(hospitalCounts);

  // Bar chart data
  const hospitalChartData = {
    labels: hospitalNames,
    datasets: [
      {
        label: "Number of Visits",
        data: hospitalVisits,
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"
        ], // Colors for each department        borderColor: "#36A2EB",
        borderWidth: 1,
      },
    ],
  };
  const orderChartData = {
    labels: ["Antipyretics", "Antibiotics", "Dental Care", "Pain Relief", "Supplements"],
    datasets: [
      {
        label: "Orders Distribution",
        data: [1, 1, 1, 1, 1], // Based on mock data
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };
  const openModal = (data) => {
    setModalData(data);
  };

  const closeModal = () => {
    setModalData(null);
  };
  // const labReports = [
  //   { testName: "Blood Sugar", file: "blood-sugar-report.pdf" },
  //   { testName: "Cholesterol", file: "cholesterol-report.pdf" },
  //   { testName: "Hemoglobin", file: "hemoglobin-report.pdf" },
  // ];

  // const radiologyImages = [
  //   { id: 1, src: "https://via.placeholder.com/200?text=Chest+X-Ray", description: "Chest X-Ray" },
  //   { id: 2, src: "https://via.placeholder.com/200?text=MRI+Brain", description: "MRI Brain" },
  //   { id: 3, src: "https://via.placeholder.com/200?text=CT+Abdomen", description: "CT Abdomen" },
  // ];

  // Chart Data for Weight History
  const weightChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Weight (kg)",
        data: weight,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  };
  const bmiChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "BMI",
        data:bmi, // Mock BMI data
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false,
      },
    ],
  };
  // const hospitalChartData = {
  //   labels: [
  //     ...new Set(appointment.map(appt => appt.hospitalName)) // Extract unique hospitals from the appointment array
  //   ],
  //   datasets: [
  //     {
  //       label: "Appointments by Hospital",
  //       data: [
  //         ...new Set(appointment.map(appt => appt.hospitalName)) // Same unique hospitals as labels
  //       ].map(hospital => {
  //         // Count the number of appointments for each hospital
  //         return appointment.filter(appt => appt.hospitalName === hospital).length;
  //       }),
  //       backgroundColor: [
  //         "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF5733", "#C70039", "#900C3F"
  //       ], // Colors for each hospital, add more colors if you have more hospitals
  //     },
  //   ],
  // };
  
  const pharmacyChartData = {
    labels: ["Central Pharmacy", "Neighborhood Pharmacy", "Dental Supplies", "City Pharmacy", "Health Store"],
    datasets: [
      {
        label: "Orders by Pharmacy",
        data: [1, 1, 1, 1, 1], // Based on mock data
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };
  
  
  const navigateToEditPage = () => {
    window.location.href = "/edit-phr"; // Replace with the actual route for the edit page
  };
  
  return (
    <div className={styles.PHRContainer}>
      {/* Tabs Navigation */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${activeTab === "phr" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("phr")}
        >
          Personal Health Record
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "appointments" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("appointments")}
        >
          Appointments
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "orders" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "labReports" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("labReports")}
        >
          Lab Reports
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "radiology" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("radiology")}
        >
          Radiology Images
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {/* PHR Tab */}
        {activeTab === "phr" && (
          <div className={styles.tabSection}>
            <h2 style={{ textAlign: "center"}} >Personal Health Record</h2>
            <button className={styles.settingsButton} onClick={() => navigate("/edit-phr",{ state: { patientId} })}>
              ⚙ 
            </button>
            <br></br>
            <br></br>
            <div className={styles.phrCardsGrid}>
              <div className={styles.card}>
                <p><strong>Allergies:</strong> {phrData?.allergies}</p>
              </div>
              <div className={styles.card}>
                <p><strong>Chronic Illness:</strong> {phrData?.chronicIllness}</p>
              </div>
              <div className={styles.card}>
                <p><strong>Diagnosis:</strong> {phrData?.diagnosis}</p>
              </div>
              <div className={styles.card}>
                <p><strong>Medication:</strong> {phrData?.medication}</p>
              </div>
              <div className={styles.card}>
                <p><strong>Medical Procedures:</strong> {phrData?.medicalProcedures}</p>
              </div>
              <div className={styles.card}>
                <p><strong>Family History:</strong> {phrData?.familyHistory}</p>
              </div>
              <div className={styles.card}>
                <p><strong>Prescription History:</strong> {phrData?.prescriptionHistory}</p>
              </div>
              <div className={styles.card}>
                <p><strong>Height:</strong></p>
                <p>
                {phrData?.height ? `[${phrData.height.join(", ")}]` : "No data available"}

                </p>

              </div>
            </div>
            {/* Trend Graphs */}
            <div className={styles.trendGraphs}>
              <div className={styles.chartContainer}>
                <h2>Weight Trend</h2>
                <Line data={weightChartData} />
              </div>
              <div className={styles.chartContainer}>
                <h2>BMI Trend</h2>
                <Line data={bmiChartData} />
              </div>
            </div>

          </div>
        )}

            {/* Past Appointments */}
            {activeTab === "appointments" && (
              <div className={styles.tabSection}>
                <h2 style={{ textAlign: "center"}}>Past Appointments</h2>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Doctor</th>
                      <th>Department</th>
                      <th>Hospital</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointment.map((appointment, index) => (
                      <tr key={index}>
                        <td>{appointment.doctorName}</td>
                        <td>{appointment.department}</td>
                        <td>{appointment.hospitalName}</td>
                        <td>{appointment.appointmentDate}</td>
                        <td>
                          <button
                            className={`${styles.btn} ${styles.viewDetailsBtn}`}
                            onClick={() => openModal(appointment)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className={styles.trendGraphs}>

                  <div className={styles.chartContainer}>
                    <h2>Appointments by Department</h2>
                    <Bar data={appointmentChartData} />
                  </div>
                  <div className={styles.chartContainer}>
                    <h2>Appointments by Hospital</h2>
                    <Bar data={hospitalChartData} />
                  </div>
              </div>
              </div>
              
            )}

            {/* Past Orders */}
            {activeTab === "orders" && (
              <div className={styles.tabSection}>
                <h2 style={{ textAlign: "center"}}>Past Orders</h2>
                <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Medicine</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Pharmacy</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <td>{order.medicine}</td>
                      <td>{order.category}</td>
                      <td>{order.quantity}</td>
                      <td>{order.pharmacy}</td>
                      <td>
                        <button
                          className={`${styles.btn} ${styles.viewDetailsBtn}`}
                          onClick={() => openModal(order)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

                </table>
                <div className={styles.trendGraphs}>

                <div className={styles.chartContainer} style={{ maxWidth: "450px"}}>
                  <h2>Orders Distribution</h2>
                  <Pie data={orderChartData} />
                </div>

                <div className={styles.chartContainer} >
                  <h2>Orders by Pharmacy</h2>
                  <Bar data={pharmacyChartData} />
                </div>
                </div>

              </div>
            )}

        {/* Modal */}
              {modalData && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Details</h3>
            <p><strong>Doctor:</strong> {modalData.doctor}</p>
            <p><strong>Specialty:</strong> {modalData.specialty}</p>
            <p><strong>Hospital:</strong> {modalData.hospital}</p>
            <p><strong>Comments:</strong> {modalData.comments}</p>
            <p><strong>Physician Orders:</strong> {modalData.orders}</p>
            <p><strong>Progress Notes:</strong> {modalData.notes}</p>
            <p><strong>Prescription Details:</strong> {modalData.prescription}</p>
            <button className={styles.closeModalBtn} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}


        {/* Lab Reports Tab */}
        {activeTab === "labReports" && (
          <div className={styles.tabSection}>
            <h2 style={{ textAlign: "center"}}>Lab Reports</h2>
            <div className={styles.reportsCardsGrid}>
              {labReports.map((report, index) => (
                <div key={index} className={styles.card}>
                  {/* <p><strong>{report.testName}</strong></p> */}
                  <a href={`/${report}`} download>Download Report</a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Radiology Images Tab */}
        {activeTab === "radiology" && (
          <div className={styles.tabSection}>
            <h2 style={{ textAlign: "center"}}>Radiology Images</h2>
            <div className={styles.radiologyCardsGrid}>
            {radiologyImages.map((image, index) => (
              <div key={index} className={styles.radiologyItem}>
                <img src={image} alt={`Radiology Image ${index + 1}`} />
                <p>Image {index + 1}</p>
              </div>
            ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PHRPage;
