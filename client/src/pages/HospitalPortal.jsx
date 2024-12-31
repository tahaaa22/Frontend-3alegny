import React, { useState } from "react";
import {useNavigate,useLocation } from "react-router-dom";
import axios from "axios";

const HospitalPortal = () => {
  const location = useLocation();
  let { response} = location.state?.hospitaldata;

  const hospital =location.state.hospitaldata
  console.log("🚀 ~ patient ~ data:", hospital)
    const [activeSection, setActiveSection] = useState("appointments");
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [doctorDetails, setDoctorDetails] = useState(null);
    const [departmentName, setDepartmentName] = useState(""); // State for department name
    const [newDoctor, setNewDoctor] = useState({
        name: "",
        specialty: "",
        license: "",
        certificates: "",
        yearsOfExperience: "",
        description: "",
        address: "",
        appointment: [{ date: "", time: "" }],
        fee: "",
      });
      const specialties = [
        "Cardiologist",
        "Neurologist",
        "Dermatologist",
        "Orthopedic",
        "Pediatrician",
        "Radiologist",
        "General Practitioner",
      ];
  const navigate = useNavigate();

  // Dummy Appointments Data
  const [appointments, setAppointments] = useState([
    { id: 1, patientName: "Richard James", age: 28, dateTime: "24th July, 2024, 10:AM", status: "pending", imageUrl: "https://i.pravatar.cc/40?img=1" },
    { id: 2, patientName: "Emma Stone", age: 32, dateTime: "25th July, 2024, 11:AM", status: "accepted", imageUrl: "https://i.pravatar.cc/40?img=2" },
    { id: 3, patientName: "John Doe", age: 40, dateTime: "26th July, 2024, 1:PM", status: "rejected", imageUrl: "https://i.pravatar.cc/40?img=3" },
]);

// Handle accept and reject buttons
const updateAppointmentStatus = (id, newStatus) => {
    setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
            appointment.id === id ? { ...appointment, status: newStatus } : appointment
        )
    );
};
  // Dummy Doctors Data
  const doctors = [
    {
      id: 1,
      name: "Dr. John Smith",
      specialty: "Cardiologist",
      hospitalId: "HSP001",
      license: "LIC123456",
      hospital: "City Hospital",
      description: "An experienced cardiologist with 10+ years in cardiac surgery.",
      address: "123 Main St, Cityville",
      reviews: 120,
      rating: 4.8,
      imageUrl: "https://i.pravatar.cc/40?img=5",
    },
    {
      id: 2,
      name: "Dr. Jane Williams",
      specialty: "Neurologist",
      hospitalId: "HSP002",
      license: "LIC654321",
      hospital: "NeuroCare Center",
      description: "Specialized in neurological disorders with innovative treatments.",
      address: "456 Elm St, Neuroville",
      reviews: 85,
      rating: 4.5,
      imageUrl: "https://i.pravatar.cc/40?img=6",
    },
  ];
  const departments = [
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "Oncology",
    "Orthopedics",
    "Radiology",
    "Gynecology",
    "Dermatology",
    "Psychiatry",
    "General Surgery",
    "Emergency Medicine",
    "Endocrinology",
    "Urology",
    "Gastroenterology",
    "Ophthalmology",
  ];

  const patientStats = {
    totalPatients: 350,
    totalAppointments: 120,
    acceptedAppointments: 75,
    pendingAppointments: 30,
    rejectedAppointments: 15,
  };

   // Handle doctor click to show details
   const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setDoctorDetails({ ...doctor });
    setEditMode(false);
  };

  // Handle input changes when editing doctor details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorDetails({ ...doctorDetails, [name]: value });
  };

  // Handle department name input
  const handleDepartmentSave = async () => {
    if (!departmentName.trim()) {
        alert("Please enter a valid department name.");
        return;
    }

    const newDepartment = { name: departmentName };

    try {
        const response = await axios.post(
            "https://backend-3alegny-hpgag2fkg4hrb9c0.canadacentral-01.azurewebsites.net/post-departments",
            newDepartment
        );

        if (response.status === 201) {
            alert(`Department "${departmentName}" has been added!`);
            // Update the local departments list
            setDepartmentName(""); // Clear input field
        } else {
            alert("Failed to save the department. Please try again.");
        }
    } catch (error) {
        console.error("Error saving department:", error);
        alert("An error occurred while saving the department. Please try again.");
    }
};
   // Handle new doctor form input change
   const handleNewDoctorChange = (e, index = null) => {
    const { name, value } = e.target;
  
    if (name === "appointment" && index !== null) {
      // Update a specific appointment date
      const updatedAppointments = [...newDoctor.appointment];
      updatedAppointments[index] = value;
      setNewDoctor({ ...newDoctor, appointment: updatedAppointments });
    } else {
      // Update other fields
      setNewDoctor({ ...newDoctor, [name]: value });
    }
    
  };
  const addAppointmentDate = () => {
    setNewDoctor({
      ...newDoctor,
      appointment: [...newDoctor.appointment, ""],
    });
  };

// Handle new doctor form submission
const handleNewDoctorSubmit = (e) => {
    e.preventDefault();
    // You can handle the form data, e.g., send it to a server or update the state
    alert("New Doctor has been added!");
    setNewDoctor({
        name: "",
        specialty: "",
        license: "",
        certificates: "",
        yearsOfExperience: "",
        description: "",
        address: "",
        appointment: "",
        fee: "",
    });
};

if (!hospital || hospital.role !== "Hospital") {
  return (
    <div className="w-screen mx-auto p-14 mt-7">
      <h2 className="text-2xl font-bold text-red-500">
        Unauthorized Access
        
      </h2>
      <p className="text-lg text-white">
        You do not have the necessary permissions to access the Hospital Portal.
      </p>
      <button
        className="mt-5 text-white bg-blue-500 hover:bg-blue-700 px-5 py-2 rounded-md"
        onClick={() => navigate("/login")}
      >Return to Login</button>
    </div>
  );
}

  return (
    <div className="flex container bg-gray-100 mt-5 w-screen ">
      {/* Sidebar */}
      <div className="w-1/5 bg-white shadow-md">
        <ul className="mt-6 text-gray-700">
          <li
            className={`p-4 flex items-center hover:bg-blue-100 cursor-pointer ${
              activeSection === "appointments" ? "bg-blue-100" : ""
            }`}
            onClick={() => setActiveSection("appointments")}
          >
            <span className="mr-2">📋</span> Appointments List
          </li>
          <li
            className={`p-4 flex items-center hover:bg-blue-100 cursor-pointer ${
              activeSection === "doctors" ? "bg-blue-100" : ""
            }`}
            onClick={() => setActiveSection("doctors")}
          >
            <span className="mr-2">👨‍⚕️</span> Doctors List
          </li>
          <li
            className={`p-4 flex items-center hover:bg-blue-100 cursor-pointer ${
              activeSection === "addDepartment" ? "bg-blue-100" : ""
            }`}
            onClick={() => setActiveSection("addDepartment")}
          >
            <span className="mr-2">🏥</span> Add Department
          </li>
          <li
            className="p-4 flex items-center hover:bg-blue-100 cursor-pointer"
            onClick={() => setActiveSection("addDoctor")}
          >
            <span className="mr-2">➕</span> Add Doctor
          </li>
          <li
            className={`p-4 flex items-center hover:bg-blue-100 cursor-pointer ${
              activeSection === "patientStats" ? "bg-blue-100" : ""
            }`}
            onClick={() => setActiveSection("patientStats")}
          >
            <span className="mr-2">📊</span> Patient Statistics
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-4/5 flex flex-col text-gray-700 p-6 ">
      {activeSection === "appointments" && (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Appointments List</h2>

                        {/* Accepted Appointments */}
                        <h3 className="text-lg font-semibold mt-4">✅ Accepted</h3>
                        <table className="w-full bg-white rounded-lg shadow-md mt-2">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 px-4 text-left">#</th>
                                    <th className="py-2 px-4 text-left">Patient</th>
                                    <th className="py-2 px-4 text-left">Age</th>
                                    <th className="py-2 px-4 text-left">Date & Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments
                                    .filter((appt) => appt.status === "accepted")
                                    .map((appointment) => (
                                        <tr key={appointment.id} 
                                        onClick={() =>
                                          navigate("/ehrpatient", { state: { patient: appointment } })}
                                        className="border-b hover:bg-gray-100"
                                        >
                                            <td className="py-2 px-4">{appointment.id}</td>
                                            <td className="py-2 px-4 flex items-center">
                                                <img
                                                    src={appointment.imageUrl}
                                                    alt={appointment.patientName}
                                                    className="w-8 h-8 rounded-full mr-2"
                                                />
                                                {appointment.patientName}
                                            </td>
                                            <td className="py-2 px-4">{appointment.age}</td>
                                            <td className="py-2 px-4">{appointment.dateTime}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>

                        {/* Pending Appointments */}
                        <h3 className="text-lg font-semibold mt-4">⏳ Pending</h3>
                        <table className="w-full bg-white rounded-lg shadow-md mt-2">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 px-4 text-left">#</th>
                                    <th className="py-2 px-4 text-left">Patient</th>
                                    <th className="py-2 px-4 text-left">Age</th>
                                    <th className="py-2 px-4 text-left">Date & Time</th>
                                    <th className="py-2 px-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments
                                    .filter((appt) => appt.status === "pending")
                                    .map((appointment) => (
                                        <tr key={appointment.id} className="border-b hover:bg-gray-100">
                                            <td className="py-2 px-4">{appointment.id}</td>
                                            <td className="py-2 px-4 flex items-center">
                                                <img
                                                    src={appointment.imageUrl}
                                                    alt={appointment.patientName}
                                                    className="w-8 h-8 rounded-full mr-2"
                                                />
                                                {appointment.patientName}
                                            </td>
                                            <td className="py-2 px-4">{appointment.age}</td>
                                            <td className="py-2 px-4">{appointment.dateTime}</td>
                                            <td className="py-2 px-4">
                                                <button
                                                    onClick={() => updateAppointmentStatus(appointment.id, "accepted")}
                                                    className="bg-green-500 text-white py-1 px-2 rounded mr-2"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => updateAppointmentStatus(appointment.id, "rejected")}
                                                    className="bg-red-500 text-white py-1 px-2 rounded"
                                                >
                                                    Reject
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>

                        {/* Rejected Appointments */}
                        <h3 className="text-lg font-semibold mt-4">❌ Rejected</h3>
                        <table className="w-full bg-white rounded-lg shadow-md mt-2">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 px-4 text-left">#</th>
                                    <th className="py-2 px-4 text-left">Patient</th>
                                    <th className="py-2 px-4 text-left">Age</th>
                                    <th className="py-2 px-4 text-left">Date & Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments
                                    .filter((appt) => appt.status === "rejected")
                                    .map((appointment) => (
                                        <tr key={appointment.id} className="border-b hover:bg-gray-100">
                                            <td className="py-2 px-4">{appointment.id}</td>
                                            <td className="py-2 px-4 flex items-center">
                                                <img
                                                    src={appointment.imageUrl}
                                                    alt={appointment.patientName}
                                                    className="w-8 h-8 rounded-full mr-2"
                                                />
                                                {appointment.patientName}
                                            </td>
                                            <td className="py-2 px-4">{appointment.age}</td>
                                            <td className="py-2 px-4">{appointment.dateTime}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </>
                )}

        {activeSection === "doctors" && (
          <>
            <h2 className="text-xl font-semibold mb-4">Doctors List</h2>
            <table className="w-full bg-white rounded-lg shadow-md">
                <thead className="bg-gray-200">
                    <tr className="border-b">
                    <th className="py-2 px-4 text-left w-1/12">#</th>
                    <th className="py-2 px-4 text-left w-3/12">Doctor</th>
                    <th className="py-2 px-4 text-left w-3/12">Specialty</th>
                    <th className="py-2 px-4 text-left w-3/12">Hospital</th>
                    </tr>
                </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr
                    key={doctor.id}
                    className="border-b hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleDoctorClick(doctor)}
                  >
                    <td className="py-2 px-4">{doctor.id}</td>
                    <td className="py-2 px-4 flex items-center">
                      <img src={doctor.imageUrl} alt={doctor.name} className="w-8 h-8 rounded-full mr-2" />
                      {doctor.name}
                    </td>
                    <td className="py-2 px-4">{doctor.specialty}</td>
                    <td className="py-2 px-4">{doctor.hospital}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedDoctor && (
              <div className="bg-white p-4 mt-4 shadow-md rounded-lg">
                <h3 className="text-lg font-semibold">Doctor Details</h3>
                {editMode ? (
                  <>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {Object.keys(doctorDetails).map((key) => (
                        <div key={key}>
                          <label className="block text-gray-700 capitalize">{key}:</label>
                          <input
                            type="text"
                            name={key}
                            value={doctorDetails[key]}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setEditMode(false)}
                      className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-gray-700"><strong>Name:</strong> {selectedDoctor.name}</p>
                    <p className="text-gray-700"><strong>Specialty:</strong> {selectedDoctor.specialty}</p>
                    <p className="text-gray-700"><strong>Hospital ID:</strong> {selectedDoctor.hospitalId}</p>
                    <p className="text-gray-700"><strong>License:</strong> {selectedDoctor.license}</p>
                    <p className="text-gray-700"><strong>Hospital:</strong> {selectedDoctor.hospital}</p>
                    <p className="text-gray-700"><strong>Description:</strong> {selectedDoctor.description}</p>
                    <p className="text-gray-700"><strong>Address:</strong> {selectedDoctor.address}</p>
                    <p className="text-gray-700"><strong>Reviews:</strong> {selectedDoctor.reviews}</p>
                    <p className="text-gray-700"><strong>Rating:</strong> {selectedDoctor.rating}</p>
                    <button
                      onClick={() => setEditMode(true)}
                      className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded"
                    >
                      Edit Doctor
                    </button>
                  </>
                )}
              </div>
            )}
          </>
        )}
        {activeSection === "addDepartment" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Departments</h2>

            {/* Display Existing Departments */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
              {departments.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {departments.map((dept, index) => (
                    <li
                      key={index}
                      className="bg-white p-3 rounded-lg shadow flex items-center justify-between border-l-4 border-blue-500"
                    >
                      <span className="text-gray-800 font-medium">{dept}</span>
                      <span className="text-sm text-gray-500">#{index + 1}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No departments available yet.</p>
              )}
            </div>

            {/* Add New Department Form */}
            <h2 className="text-xl font-semibold mb-4">Add Department</h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <label className="block mb-2 text-gray-700">Department Name:</label>
              <input
                type="text"
                placeholder="Enter department name"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                className="w-full p-2 border rounded mb-4 bg-slate-200"
              />
              <button
                onClick={handleDepartmentSave}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </>
        )}
       {activeSection === "addDoctor" && (
  <>
    <h2 className="text-xl font-semibold mb-4">Add New Doctor</h2>
    <form
      onSubmit={handleNewDoctorSubmit}
      className="bg-white p-4 rounded-lg shadow-md"
    >
      {Object.keys(newDoctor).map((key) => (
        <div key={key} className="mb-4">
          {/* Specialty Dropdown */}
          {key === "specialty" ? (
            <>
              <label className="block mb-2 text-gray-700 capitalize">
                Specialty:
              </label>
              <select
                name="specialty"
                value={newDoctor.specialty}
                onChange={handleNewDoctorChange}
                className="w-full p-2 border rounded"
              >
                <option value="" disabled>
                  Select Specialty
                </option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </>
          ) : key === "appointment" ? (
            <>
              <label className="block mb-2 text-gray-700 capitalize">
                Appointment Dates & Times:
              </label>
              {newDoctor.appointment.map((datetime, index) => (
                <div key={index} className="flex items-center mb-2 gap-4">
                  <input
                    type="date"
                    value={datetime.date}
                    onChange={(e) => handleNewDoctorChange(e, index, "date")}
                    className="w-1/2 p-2 border rounded bg-slate-200"
                  />
                  <input
                    type="time"
                    step="3600"
                    value={datetime.time}
                    onChange={(e) => handleNewDoctorChange(e, index, "time")}
                    className="w-1/2 p-2 rounded bg-slate-200 border-black border-4"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addAppointmentDate}
                className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 mt-2"
              >
                + Add Another Date & Time
              </button>
            </>
          ) : (
            // Default Text Inputs
            <>
              <label className="block mb-2 text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, " $1")}:
              </label>
              <input
                type="text"
                name={key}
                value={newDoctor[key]}
                onChange={handleNewDoctorChange}
                className="w-full p-2 border-black border-4 rounded bg-slate-200"
                placeholder={`Enter ${key}`}
              />
            </>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add Doctor
      </button>
    </form>
  </>
)}
        {activeSection === "patientStats" && (
          <>
            <h2 className="text-xl font-semibold mb-4">Patient Statistics</h2>
            <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 p-4 rounded">
                <p className="text-lg font-semibold text-gray-700">Total Patients</p>
                <p className="text-2xl text-gray-700">{patientStats.totalPatients}</p>
              </div>
              <div className="bg-green-100 p-4 rounded">
                <p className="text-lg font-semibold text-gray-700">Total Appointments</p>
                <p className="text-2xl text-gray-700">{patientStats.totalAppointments}</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded">
                <p className="text-lg font-semibold text-gray-700">Accepted Appointments</p>
                <p className="text-2xl text-gray-700">{patientStats.acceptedAppointments}</p>
              </div>
              <div className="bg-orange-100 p-4 rounded ">
                <p className="text-lg font-semibold text-gray-700">Pending Appointments</p>
                <p className="text-2xl text-gray-700">{patientStats.pendingAppointments}</p>
              </div>
              <div className="bg-red-100 p-4 rounded ">
                <p className="text-lg font-semibold text-gray-700">Rejected Appointments</p>
                <p className="text-2xl text-gray-700">{patientStats.rejectedAppointments}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HospitalPortal;
