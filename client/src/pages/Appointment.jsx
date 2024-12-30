import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Appointment = () => {
  const location = useLocation();
  let { hospital, department } = location.state;
  console.log("🚀 ~ Appointment ~ department:", department)
  console.log("🚀 ~ Appointment ~ hospital:", hospital)
  // Dummy data
  const reservedDates = [
    new Date("2024-12-20"),
    new Date("2024-12-22"),
    new Date("2024-12-24"),
  ];
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const navigate = useNavigate();

  const handleConfirm = () => {
    alert(`Appointment confirmed for ${selectedDate} at ${selectedTime}`);
    navigate("/MyProfile");
  };

  const isDateReserved = (date) => {
    // Check if the date is in the reservedDates array
    return reservedDates.some((reservedDate) => {
      return (
        reservedDate.getDate() === date.getDate() &&
        reservedDate.getMonth() === date.getMonth() &&
        reservedDate.getFullYear() === date.getFullYear()
      );
    });
  };

  return (
    <div className="p-6 m-20 max-w-5xl mx-auto bg-gray-50">
      {/* Doctor Profile Section */}
      <div className="flex items-center gap-8 bg-white p-6 shadow-md rounded-md">
        <img
          src="https://via.placeholder.com/150"
          alt="Dr. Richard James"
          className="w-40 h-40 rounded-lg object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dr. Richard James</h1>
          <p className="text-gray-600 mb-4">MBBS - General Physician</p>
          <p className="text-gray-700 mb-2">
            Dr. Richard James is committed to delivering comprehensive medical care, focusing on preventive medicine,
            early diagnosis, and effective treatment strategies.
          </p>
          <p className="font-semibold text-gray-800">
            Appointment fee: <span className="text-blue-500">$50</span>
          </p>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="mt-8 bg-white p-6 shadow-md rounded-md">
        <h2 className="text-xl font-bold mb-4">Select Appointment Date</h2>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          inline
          minDate={new Date()} // Don't allow selecting past dates
          filterDate={(date) => !isDateReserved(date)} // Disable reserved dates
          className="border-2 p-4 rounded-lg w-full bg-gray-400 "
          calendarClassName="text-lg text-center"
          dayClassName={(date) =>
            isDateReserved(date) ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "cursor-pointer"
          }
        />
        {/* Display selected date */}
        <div className="w-80 flex items-center justify-center bg-gray-100 p-4 rounded-md text-gray-800 ">
          <h3 className="text-lg font-semibold">Selected Date:</h3>
          <p className="text-lg text-blue-600 ml-2">
            {selectedDate ? selectedDate.toLocaleDateString() : "None"}
          </p>
          <button
          onClick={handleConfirm}
          disabled={!selectedDate || !selectedTime}
          className="bg-blue-300 text-black ml-6 mr-3 py-2 px-6 rounded-full text-lg"
          >Book </button>
        </div>
      </div>



      {/* Related Doctors */}
      <div className="mt-10 bg-white p-6 shadow-md rounded-md">
        <h2 className="text-xl font-bold text-center mb-6">Related Doctors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array(4)
            .fill()
            .map((_, index) => (
              <div key={index} className="text-center">
                <div className="bg-purple-200 p-4 rounded-lg">
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Doctor"
                    className="w-24 h-24 mx-auto rounded-full object-cover"
                  />
                </div>
                <p className="mt-2 font-semibold">Dr. Richard James</p>
                <p className="text-sm text-gray-500">General Physician</p>
                <p className="text-green-500 font-medium mt-1">Available</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
