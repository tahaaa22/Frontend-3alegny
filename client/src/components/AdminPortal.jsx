import React, { useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement } from "chart.js";

const HospitalPortal = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
// Register chart elements
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineElement
  );
  // Sample data

  const [appointments, setAppointments] = useState([
    { id: 1, patientName: "Richard James", age: 28, dateTime: "24th July, 2024, 10:AM", hospital: "City General Hospital", approved: false },
    { id: 2, patientName: "Emma Stone", age: 32, dateTime: "25th July, 2024, 11:AM", hospital: "Green Valley Hospital", approved: false },
    { id: 3, patientName: "John Doe", age: 40, dateTime: "26th July, 2024, 1:PM", hospital: "City General Hospital", approved: false },
    { id: 4, patientName: "Anna White", age: 25, dateTime: "27th July, 2024, 2:PM", hospital: "CareWell Clinic", approved: false },
  ]);

  const [orders, setOrders] = useState([
    { id: 1, patientName: "Richard James", pharmacy: "CareWell Pharmacy", dateTime: "24th July, 2024, 10:AM", approved: false },
    { id: 2, patientName: "Emma Stone", pharmacy: "Green Valley Pharmacy", dateTime: "25th July, 2024, 11:AM", approved: false },
    { id: 3, patientName: "John Doe", pharmacy: "Green Valley Pharmacy", dateTime: "26th July, 2024, 12:PM", approved: false },
    { id: 4, patientName: "Anna White", pharmacy: "CareWell Pharmacy", dateTime: "27th July, 2024, 1:PM", approved: false },
  ]);

  // Approve Appointment
  const approveAppointment = (id) => {
    const isConfirmed = window.confirm("Do you want to send the patient's EHR to the hospital?");
    if (isConfirmed) {
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === id ? { ...appointment, approved: true } : appointment
        )
      );
    }
  };

  // Deny Appointment
  const denyAppointment = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to deny this appointment?");
    if (isConfirmed) {
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== id)
      );
    }
  };

  // Approve Order
  const approveOrder = (id) => {
    const isConfirmed = window.confirm("Do you want to approve this order?");
    if (isConfirmed) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, approved: true } : order
        )
      );
    }
  };

  // Deny Order
  const denyOrder = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to deny this order?");
    if (isConfirmed) {
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== id)
      );
    }
  };
  const patients = [
    { 
      id: 1, 
      patientName: "Richard James", 
      age: 28, 
      registrationDate: "10th July, 2024"
    },
    { 
      id: 2, 
      patientName: "Emma Stone", 
      age: 32, 
      registrationDate: "11th July, 2024"
    },
    { 
      id: 3, 
      patientName: "John Doe", 
      age: 40, 
      registrationDate: "12th July, 2024"
    },
    { 
      id: 4, 
      patientName: "Anna White", 
      age: 25, 
      registrationDate: "13th July, 2024"
    },
  ];

  const [businesses, setBusinesses] = useState({
    hospitals: [
      { id: 1, name: "City General Hospital", address: "123 Main St." },
      { id: 2, name: "Green Valley Hospital", address: "456 Oak Rd." },
      { id: 3, name: "CareWell Clinic", address: "789 Pine Ave." },
    ],
    pharmacies: [
      { id: 1, name: "CareWell Pharmacy", address: "123 Main St." },
      { id: 2, name: "Green Valley Pharmacy", address: "456 Oak Rd." },
      { id: 3, name: "City General Pharmacy", address: "789 Pine Ave." },
    ]
  });
  // Chart Data
    const patientsChartData = {
        labels: ["Patients"],
        datasets: [
          {
            label: "Number of Patients",
            data: [patients.length],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          }
        ]
      };
    
      const businessesChartData = {
        labels: ["Hospitals", "Pharmacies"],
        datasets: [
          {
            label: "Businesses",
            data: [businesses.hospitals.length, businesses.pharmacies.length],
            backgroundColor: ["#36A2EB", "#FF6384"],
          }
        ]
      };
    
      const generateDeflectedData = () => {
        // Generate a baseline array of monthly data
        let data = new Array(12).fill(0).map(() => Math.floor(Math.random() * 10) + 5); // Base range from 5 to 15
      
        // Introduce random deflections (spikes and dips)
        for (let i = 0; i < data.length; i++) {
          const deflection = Math.floor(Math.random() * 5) - 2; // Random deflection from -2 to +2
          data[i] += deflection;
          // Ensure no negative values
          if (data[i] < 0) data[i] = 0;
        }
        
        return data;
      };
      
      // Monthly Chart Data
      const monthlyChartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
          {
            label: "Registrations",
            data: generateDeflectedData(),
            borderColor: "rgba(75, 192, 192, 1)",
            fill: false,
          },
          {
            label: "Appointments",
            data: generateDeflectedData(),
            borderColor: "rgba(153, 102, 255, 1)",
            fill: false,
          },
          {
            label: "Orders",
            data: generateDeflectedData(),
            borderColor: "rgba(255, 159, 64, 1)",
            fill: false,
          }
        ]
      };
      
  const chartDataAppointments = {
    labels: ["City General Hospital", "Green Valley Hospital", "CareWell Clinic"],
    datasets: [
      {
        label: "Appointments",
        data: [2, 1, 1],
        backgroundColor: ["#4CAF50", "#FF9800", "#03A9F4"],
      },
    ],
  };

  const chartDataSatisfaction = {
    labels: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"],
    datasets: [
      {
        data: [50, 30, 10, 5, 5],
        backgroundColor: ["#4CAF50", "#8BC34A", "#FFEB3B", "#FFC107", "#F44336"],
      },
    ],
  };

  const chartDataOrdersTracking = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Orders",
        data: [30, 40, 25, 60],
        borderColor: "#FF9800",
        fill: false,
        tension: 0.2,
      },
    ],
  };

  const chartDataAppointmentsOverTime = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Appointments",
        data: [10, 20, 30, 40],
        backgroundColor: "#4CAF50",
        borderColor: "#388E3C",
        borderWidth: 1,
        stack: "stack1",
      },
      {
        label: "Cancellations",
        data: [1, 2, 1, 3],
        backgroundColor: "#FF5722",
        borderColor: "#D32F2F",
        borderWidth: 1,
        stack: "stack1",
      },
    ],
  };
  const [admins, setAdmins] = useState([
    { id: 1, name: "John Admin", email: "john.admin@example.com" },
    { id: 2, name: "Jane Admin", email: "jane.admin@example.com" },
  ]);

  const [newAdmin, setNewAdmin] = useState({ name: "", email: "" });

  // Remove Admin
  const removeAdmin = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to remove this admin?");
    if (isConfirmed) {
      setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));
    }
  };
  // Add New Admin
  const addAdmin = (e) => {
    e.preventDefault();
    if (!newAdmin.name || !newAdmin.email) {
      alert("Please fill in all fields");
      return;
    }

    const newId = admins.length > 0 ? admins[admins.length - 1].id + 1 : 1;
    setAdmins([...admins, { id: newId, name: newAdmin.name, email: newAdmin.email }]);
    setNewAdmin({ name: "", email: "" });
  };
  const [newBusiness, setNewBusiness] = useState({
    name: "",
    username: "",
    type: "hospitals",
    password: "",
    contact: { street: "", city: "", state: "", zipcode: "" },
  });

  const handleBusinessSubmit = (e) => {
    e.preventDefault();
  
    // Validation
    if (
      !newBusiness.name ||
      !newBusiness.username ||
      !newBusiness.password ||
      !newBusiness.contact.street ||
      !newBusiness.contact.city ||
      !newBusiness.contact.state ||
      !newBusiness.contact.zipcode
    ) {
      alert("Please fill in all fields.");
      return;
    }
  
    // Check if the type exists in businesses (make sure the type is valid)
    if (!businesses.hasOwnProperty(newBusiness.type)) {
      alert("Invalid business type.");
      console.log("Selected business type:", newBusiness.type);
console.log("Businesses object:", businesses);

      return;
    }
  
    // Add new business to the correct category (hospitals or pharmacies)
    const newBusinessEntry = {
      ...newBusiness,
      id: businesses[newBusiness.type].length + 1, // Use length safely
    };
  
    setBusinesses((prevState) => ({
      ...prevState,
      [newBusiness.type]: [...prevState[newBusiness.type], newBusinessEntry],
    }));
  
    alert("Business added successfully!");
  
    // Reset the form
    setNewBusiness({
      name: "",
      username: "",
      type: "hospitals", // default type (this can be set based on the dropdown)
      password: "",
      contact: { street: "", city: "", state: "", zipcode: "" },
    });
  };
  
  
  return (
    <div className="flex w-screen h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-center py-4 text-black">Admin Dashboard</h1>
        <ul className="text-gray-700">
          <li
            className={`p-4 flex items-center cursor-pointer hover:bg-blue-100 ${activeTab === "dashboard" ? "bg-blue-200" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            📊 Dashboard
          </li>
          <li
            className={`p-4 flex items-center cursor-pointer hover:bg-blue-100 ${activeTab === "appointments" ? "bg-blue-200" : ""}`}
            onClick={() => setActiveTab("appointments-orders")}
          >
            📋 Appointments & Orders
            </li>
          <li
            className={`p-4 flex items-center cursor-pointer hover:bg-blue-100 ${
                activeTab === "patients" ? "bg-blue-200" : ""
              }`}
              onClick={() => setActiveTab("patients")}
            >
              👥 Patients
  
          </li>
          <li
            className={`p-4 flex items-center cursor-pointer hover:bg-blue-100 ${
              activeTab === "businesses" ? "bg-blue-200" : ""
            }`}
            onClick={() => setActiveTab("businesses")}
          >
            🏥 Businesses
          </li>
          <li
            className={`p-4 flex items-center cursor-pointer hover:bg-blue-100 ${activeTab === "admins" ? "bg-blue-200" : ""}`}
            onClick={() => setActiveTab("admins")}
          >
            👤 Admins
          </li>
          <li
            className={`p-4 flex items-center cursor-pointer hover:bg-blue-100 ${activeTab === "business" ? "bg-blue-200" : ""}`}
            onClick={() => setActiveTab("business")}
          >
            🏥 Add Business
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-6 overflow-y-auto">
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-black">Dashboard</h2>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-black">Total Patients</h3>
                  <p className="text-2xl text-black">{patients.length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-black">Total Businesses</h3>
                  <p className="text-2xl text-black">{businesses.hospitals.length+businesses.pharmacies.length}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-4 text-black">Appointments by Hospital</h3>
                  <Bar data={chartDataAppointments} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-4 text-black">Client Satisfaction</h3>
                  <div style={{ maxWidth: "300px", margin: "0 auto" }}>
                  <Pie data={chartDataSatisfaction} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-4 text-black">Order Tracking</h3>
                  <Line data={chartDataOrdersTracking} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-4 text-black">Appointments & Cancellations</h3>
                  <Bar data={chartDataAppointmentsOverTime} options={{ responsive: true }} />
                </div>
                {/* Patient Count Chart */}
                <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Number of Patients</h3>
                <Bar data={patientsChartData} options={{ responsive: true }} />
                </div>

                {/* Business Count Chart */}
                <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Number of Businesses</h3>
                <div style={{ maxWidth: "300px", margin: "0 auto" }}>

                <Pie data={businessesChartData} options={{ responsive: true }} />
                </div>
                </div>

                {/* Monthly Chart */}
                <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Monthly Registrations, Appointments, and Orders</h3>
                <Line data={monthlyChartData} options={{ responsive: true }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Tabs */}
        {/* Appointments & Orders Tab */}
        {activeTab === "appointments-orders" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Appointments</h2>
            <table className="w-full bg-white rounded-lg shadow-md mb-6">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">#</th>
                  <th className="py-2 px-4 text-left">Patient</th>
                  <th className="py-2 px-4 text-left">Age</th>
                  <th className="py-2 px-4 text-left">Date & Time</th>
                  <th className="py-2 px-4 text-left">Hospital</th>
                  <th className="py-2 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b hover:bg-gray-100">
                    <td className="py-2 px-4">{appointment.id}</td>
                    <td className="py-2 px-4">{appointment.patientName}</td>
                    <td className="py-2 px-4">{appointment.age}</td>
                    <td className="py-2 px-4">{appointment.dateTime}</td>
                    <td className="py-2 px-4">{appointment.hospital}</td>
                    <td className="py-2 px-4 text-center">
                      {!appointment.approved ? (
                        <>
                          <button
                            onClick={() => approveAppointment(appointment.id)}
                            className="text-green-500 hover:text-green-700"
                          >
                            ✔️ Approve
                          </button>
                          <button
                            onClick={() => denyAppointment(appointment.id)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            ❌ Deny
                          </button>
                        </>
                      ) : (
                        <span className="text-green-500">Approved</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="text-xl font-semibold mb-4">Orders</h2>
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">#</th>
                  <th className="py-2 px-4 text-left">Patient</th>
                  <th className="py-2 px-4 text-left">Pharmacy</th>
                  <th className="py-2 px-4 text-left">Date & Time</th>
                  <th className="py-2 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-100">
                    <td className="py-2 px-4">{order.id}</td>
                    <td className="py-2 px-4">{order.patientName}</td>
                    <td className="py-2 px-4">{order.pharmacy}</td>
                    <td className="py-2 px-4">{order.dateTime}</td>
                    <td className="py-2 px-4 text-center">
                      {!order.approved ? (
                        <>
                          <button
                            onClick={() => approveOrder(order.id)}
                            className="text-green-500 hover:text-green-700"
                          >
                            ✔️ Approve
                          </button>
                          <button
                            onClick={() => denyOrder(order.id)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            ❌ Deny
                          </button>
                        </>
                      ) : (
                        <span className="text-green-500">Approved</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

{activeTab === "patients" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">All Registered Patients</h2>
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">#</th>
                  <th className="py-2 px-4 text-left">Patient Name</th>
                  <th className="py-2 px-4 text-left">Age</th>
                  <th className="py-2 px-4 text-left">Registration Date</th>
                  <th className="py-2 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id} className="border-b hover:bg-gray-100">
                    <td className="py-2 px-4">{patient.id}</td>
                    <td className="py-2 px-4">{patient.patientName}</td>
                    <td className="py-2 px-4">{patient.age}</td>
                    <td className="py-2 px-4">{patient.registrationDate}</td>
                    <td className="py-2 px-4 text-center">
                      <button className="text-red-500 hover:text-red-700">✖</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "businesses" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">All Businesses</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Hospitals</h3>
              <table className="w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left">#</th>
                    <th className="py-2 px-4 text-left">Hospital Name</th>
                    <th className="py-2 px-4 text-left">Address</th>
                    <th className="py-2 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {businesses.hospitals.map((hospital) => (
                    <tr key={hospital.id} className="border-b hover:bg-gray-100">
                      <td className="py-2 px-4">{hospital.id}</td>
                      <td className="py-2 px-4">{hospital.name}</td>
                      <td className="py-2 px-4">{hospital.address}</td>
                      <td className="py-2 px-4 text-center">
                        <button className="text-red-500 hover:text-red-700">✖</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Pharmacies</h3>
              <table className="w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left">#</th>
                    <th className="py-2 px-4 text-left">Pharmacy Name</th>
                    <th className="py-2 px-4 text-left">Address</th>
                    <th className="py-2 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {businesses.pharmacies.map((pharmacy) => (
                    <tr key={pharmacy.id} className="border-b hover:bg-gray-100">
                      <td className="py-2 px-4">{pharmacy.id}</td>
                      <td className="py-2 px-4">{pharmacy.name}</td>
                      <td className="py-2 px-4">{pharmacy.address}</td>
                      <td className="py-2 px-4 text-center">
                        <button className="text-red-500 hover:text-red-700">✖</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Admins Tab */}
        {activeTab === "admins" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Admins</h2>
            <table className="w-full bg-white rounded-lg shadow-md mb-6">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">#</th>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id} className="border-b hover:bg-gray-100">
                    <td className="py-2 px-4">{admin.id}</td>
                    <td className="py-2 px-4">{admin.name}</td>
                    <td className="py-2 px-4">{admin.email}</td>
                    <td className="py-2 px-4 text-center">
                      <button
                        onClick={() => removeAdmin(admin.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ❌ Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="text-xl font-semibold mb-4">Add New Admin</h2>
            <form onSubmit={addAdmin} className="space-y-4">
              <div>
                <label htmlFor="adminName" className="block text-gray-700 font-medium">
                  Name:
                </label>
                <input
                  type="text"
                  id="adminName"
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  className="bg-white text-gray-800 w-full p-2 border rounded"
                  placeholder="Enter admin's name"
                />
              </div>
              <div>
                <label htmlFor="adminEmail" className="block text-gray-700 font-medium">
                  Email:
                </label>
                <input
                  type="email"
                  id="adminEmail"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  className="bg-white text-gray-800 w-full p-2 border rounded"
                  placeholder="Enter admin's email"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Admin
              </button>
            </form>
          </div>
        )}

        {/* Add Business Tab */}
        {/* Add Business Tab */}
        {activeTab === "business" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add Business</h2>
            <form onSubmit={handleBusinessSubmit} className="space-y-4">
              <div>
                <label htmlFor="businessName" className="block text-gray-800 font-medium">
                  Business Name:
                </label>
                <input
                  type="text"
                  id="businessName"
                  value={newBusiness.name}
                  onChange={(e) =>
                    setNewBusiness({ ...newBusiness, name: e.target.value })
                  }
                  className="w-full p-2 border rounded bg-white text-gray-900"
                  placeholder="Enter business name"
                />
              </div>
              <div>
                <label htmlFor="username" className="block text-gray-800 font-medium">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  value={newBusiness.username}
                  onChange={(e) =>
                    setNewBusiness({ ...newBusiness, username: e.target.value })
                  }
                  className="w-full p-2 border rounded bg-white text-gray-900"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label htmlFor="businessType" className="block text-gray-800 font-medium">
                  Business Type:
                </label>
                <select
                  id="businessType"
                  value={newBusiness.type}
                  onChange={(e) =>
                    setNewBusiness({ ...newBusiness, type: e.target.value })
                  }
                  className="w-full p-2 border rounded bg-white text-gray-900"
                >
                  <option value="hospitals">Hospital</option>
                  <option value="pharmacies">Pharmacy</option>
                </select>
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-800 font-medium">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  value={newBusiness.password}
                  onChange={(e) =>
                    setNewBusiness({ ...newBusiness, password: e.target.value })
                  }
                  className="w-full p-2 border rounded bg-white text-gray-900"
                  placeholder="Enter password"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Contact Info:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="street" className="block text-gray-800 font-medium">
                      Street:
                    </label>
                    <input
                      type="text"
                      id="street"
                      value={newBusiness.contact.street}
                      onChange={(e) =>
                        setNewBusiness({
                          ...newBusiness,
                          contact: { ...newBusiness.contact, street: e.target.value },
                        })
                      }
                      className="w-full p-2 border rounded bg-white text-gray-900"
                      placeholder="Enter street"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-gray-800 font-medium">
                      City:
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={newBusiness.contact.city}
                      onChange={(e) =>
                        setNewBusiness({
                          ...newBusiness,
                          contact: { ...newBusiness.contact, city: e.target.value },
                        })
                      }
                      className="w-full p-2 border rounded bg-white text-gray-900"
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-gray-800 font-medium">
                      State:
                    </label>
                    <input
                      type="text"
                      id="state"
                      value={newBusiness.contact.state}
                      onChange={(e) =>
                        setNewBusiness({
                          ...newBusiness,
                          contact: { ...newBusiness.contact, state: e.target.value },
                        })
                      }
                      className="w-full p-2 border rounded bg-white text-gray-900"
                      placeholder="Enter state"
                    />
                  </div>
                  <div>
                    <label htmlFor="zipcode" className="block text-gray-800 font-medium">
                      Zipcode:
                    </label>
                    <input
                      type="text"
                      id="zipcode"
                      value={newBusiness.contact.zipcode}
                      onChange={(e) =>
                        setNewBusiness({
                          ...newBusiness,
                          contact: { ...newBusiness.contact, zipcode: e.target.value },
                        })
                      }
                      className="w-full p-2 border rounded bg-white text-gray-900"
                      placeholder="Enter zipcode"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Business
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalPortal;













