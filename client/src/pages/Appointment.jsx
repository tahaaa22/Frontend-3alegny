"use client"
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { use } from "react";

const Appointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let { hospital, department, patient } = location.state;
  console.log('hospital:', hospital)
  console.log('department:', department)
  console.log('patient:', patient)
  const [Doctors, setDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);


  useEffect(() => {
    
      const filteredHospital = hospital.doctors.filter(
        (doc) => {
          console.log("doc speciality",doc.specialty)
          console.log(department.departmentName)
          console.log(doc.specialty === department.departmentName)
          return doc.specialty === department.departmentName}
      );
      
      setFilteredHospitals(filteredHospital);
      console.log("im in the first useeffct")
      console.log("filterhos",filteredHospitals)

    
  }, [hospital,department]);

  const handleConfirm = async () => {
    const selectedDoctor = filteredHospitals.find(doc => doc.name === selectedDate);
    const requestBody = {
      date: selectedDate,
      time: "string",
      doctorName: selectedDoctor,
      department: department.departmentName,
      hospitalName: hospital.name,
      phrId: hospital.id
    };

    const url = `https://backend-3alegny-hpgag2fkg4hrb9c0.canadacentral-01.azurewebsites.net/appointment/schedule/${patient.id}?pid=${patient.id}`;

    try {
      const response = await axios.post(url, requestBody);
      console.log("Appointment confirmed:", response.data);
      alert("Appointment confirmed!");
      // navigate("/MyProfile");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("There was an error booking your appointment.");
    }
  };

  return (
    <div className="p-6 m-20 max-w-5xl mx-auto bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Book an Appointment</h1>

      {/* Display Doctors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHospitals.length > 0 ? (
          filteredHospitals.map((filteredHospital) => (
            <div key={filteredHospital.id} className="bg-white p-4 shadow-md rounded-md">
              <img
                src={(filteredHospital.imageUrl!=="string" && filteredHospital.imageUrl) || "https://via.placeholder.com/150"}
                alt={filteredHospital.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
              <h2 className="text-lg font-bold text-gray-800 text-center">{filteredHospital.name}</h2>
              <p className="text-center text-gray-600">{filteredHospital.specialty}</p>
              <p className="text-center font-semibold text-blue-600 mt-2">Fee: ${filteredHospital.appointmentFee}</p>
              <p className="text-center text-yellow-500 mt-2">Rating: {filteredHospital.rating} / 5</p>

              {/* Available Slots Dropdown */}
              <div className="mt-4">
                <label htmlFor={`slots-${filteredHospital.id}`} className="block text-gray-700 text-sm mb-2">
                  Available Slots:
                </label>
                <select
                  id={`slots-${filteredHospital.id}`}
                  className="w-full border rounded-md p-2 text-black"
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  <option value="">Select a time</option>
                  {filteredHospital.availableSlots.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleConfirm}
                className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                Book Appointment
              </button>
            </div>
          ))
        ) : (
          <p>Loading doctors...</p>
        )}
      </div>
    </div>
  );
};

export default Appointment;
