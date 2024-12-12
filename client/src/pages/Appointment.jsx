import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Appointment = () => {
  // Dummy data
  const clinicsAndHospitals = [
    { id: 1, name: "Sunrise Medical Center", departments: ["Cardiology", "Dermatology"], doctors: ["Dr. Smith", "Dr. Johnson"] },
    { id: 2, name: "HealthPlus Clinic", departments: ["Pediatrics", "Orthopedics"], doctors: ["Dr. Lee", "Dr. Patel"] },
  ];

  const doctorSchedules = {
    "Dr. Smith": ["2024-12-15", "2024-12-17"],
    "Dr. Johnson": ["2024-12-16"],
    "Dr. Lee": ["2024-12-14", "2024-12-18"],
    "Dr. Patel": ["2024-12-13"],
  };

  const availableTimes = ["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"];

  // State management
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  const navigate = useNavigate();

  const handleFacilityChange = (event) => {
    setSelectedFacility(event.target.value);
    setSelectedDepartment(null);
    setSelectedDoctor(null);
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    setSelectedDoctor(null);
  };

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const isDateReserved = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return selectedDoctor && doctorSchedules[selectedDoctor]?.includes(formattedDate);
  };

  const handleConfirm = () => {
    alert(
      `Appointment confirmed:\nFacility: ${selectedFacility}\nDepartment: ${selectedDepartment}\nDoctor: ${selectedDoctor}\nDate: ${selectedDate.toDateString()}\nTime: ${selectedTime}`
    );
    navigate("/MyProfile");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg mt-16">
    <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">Book an Appointment</h1>
    <p className="text-center text-gray-600 mb-6">We hope you get well soon! You're in great hands.</p>

      {/* Facility Selection */}
      <div className="mb-4">
        <label htmlFor="facility" className="block text-lg font-medium mb-2">
          Select Clinic/Hospital:
        </label>
        <select
          id="facility"
          value={selectedFacility || ""}
          onChange={handleFacilityChange}
          className="w-full border rounded p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Choose a facility
          </option>
          {clinicsAndHospitals.map((facility) => (
            <option key={facility.id} value={facility.name}>
              {facility.name}
            </option>
          ))}
        </select>
      </div>

      {/* Department Selection */}
      <div className="mb-4">
        <label htmlFor="department" className="block text-lg font-medium mb-2">
          Select Department:
        </label>
        <select
          id="department"
          value={selectedDepartment || ""}
          onChange={handleDepartmentChange}
          className="w-full border rounded p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!selectedFacility}
        >
          <option value="" disabled>
            Choose a department
          </option>
          {selectedFacility &&
            clinicsAndHospitals
              .find((facility) => facility.name === selectedFacility)
              ?.departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
        </select>
      </div>

      {/* Doctor Selection */}
      <div className="mb-4">
        <label htmlFor="doctor" className="block text-lg font-medium mb-2">
          Select Doctor:
        </label>
        <select
          id="doctor"
          value={selectedDoctor || ""}
          onChange={handleDoctorChange}
          className="w-full border rounded p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!selectedDepartment}
        >
          <option value="" disabled>
            Choose a doctor
          </option>
          {selectedFacility &&
            clinicsAndHospitals
              .find((facility) => facility.name === selectedFacility)
              ?.doctors.map((doctor) => (
                <option key={doctor} value={doctor}>
                  {doctor}
                </option>
              ))}
        </select>
      </div>

      {/* Date Picker */}
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select Date:</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          className="w-full border rounded p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          filterDate={(date) => !isDateReserved(date)}
          minDate={new Date()}
          placeholderText="Select a date"
          disabled={!selectedDoctor}
        />
      </div>

      {/* Time Selection */}
      <div className="mb-4">
        <label htmlFor="time" className="block text-lg font-medium mb-2">
          Select Time:
        </label>
        <select
          id="time"
          value={selectedTime || ""}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="w-full border rounded p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!selectedDate}
        >
          <option value="" disabled>
            Choose a time
          </option>
          {availableTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleConfirm}
        className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={!selectedFacility || !selectedDepartment || !selectedDoctor || !selectedDate || !selectedTime}
      >
        Confirm Appointment
      </button>

      <p className="text-center text-gray-500 mt-6">Thank you for trusting us! Wishing you a speedy recovery!</p>
    </div>
  );
};

export default Appointment;
