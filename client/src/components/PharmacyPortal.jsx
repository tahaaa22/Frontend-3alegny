import React from "react";

const PharmacyPortal = () => {
    const drugs = [
        {
          id: 1,
          drugName: "Richard James",
          dateTime: "24th July, 2024, 10:AM",
          imageUrl: "https://i.pravatar.cc/40?img=1",
        },
        {
          id: 2,
          patientName: "Emma Stone",
          age: 32,
          dateTime: "25th July, 2024, 11:AM",
          imageUrl: "https://i.pravatar.cc/40?img=2",
        },
        {
          id: 3,
          patientName: "John Doe",
          age: 40,
          dateTime: "26th July, 2024, 1:PM",
          imageUrl: "https://i.pravatar.cc/40?img=3",
        },
        {
          id: 4,
          patientName: "Anna White",
          age: 25,
          dateTime: "27th July, 2024, 2:PM",
          imageUrl: "https://i.pravatar.cc/40?img=4",
        },
      ];
      return (
        <div className="flex w-screen h-screen bg-gray-100 mt-20">
          {/* Sidebar */}
          <div className="w-1/5 bg-white shadow-md">
    
            {/* Menu Items */}
            <ul className="mt-6 text-gray-700">
          <li className="p-4 flex items-center hover:bg-blue-100 cursor-pointer">
            <span className="mr-2">📋</span> Appointments List
          </li>
          <li className="p-4 flex items-center hover:bg-blue-100 cursor-pointer">
            <span className="mr-2">👨‍⚕️</span> Doctors List
          </li>
          <li className="p-4 flex items-center hover:bg-blue-100 cursor-pointer">
            <span className="mr-2">🏥</span> Add Department
          </li>
          <li className="p-4 flex items-center hover:bg-blue-100 cursor-pointer">
            <span className="mr-2">➕</span> Add Doctor
          </li>
        </ul>
          </div>
    
          {/* Main Content */}
          <div className="w-4/5 flex flex-col text-gray-700">    
            {/* Table Section */}
            <div className="p-6">
              <h2 className="text-gray-700 text-xl font-semibold mb-4">All Appointments</h2>
              <table className="w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left text-gray-700">#</th>
                    <th className="py-2 px-4 text-left text-gray-700">Patient</th>
                    <th className="py-2 px-4 text-left text-gray-700">Age</th>
                    <th className="py-2 px-4 text-left text-gray-700">Date & Time</th>
                    <th className="py-2 px-4 text-center text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map through appointments */}
                  {appointments.map((appointment) => (
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
                      <td className="py-2 px-4 text-center">
                        <button className="text-red-500 hover:text-red-700">✖</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
};

export default PharmacyPortal;
