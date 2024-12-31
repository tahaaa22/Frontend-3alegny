import React from "react";
import { useLocation,useNavigate } from 'react-router-dom';

const HospitalCard = ({ hospitals, patient }) => {
  const navigate = useNavigate();
  // const location = useLocation();
  // const patient = location.state?.patientdata;

  console.log(patient)
  return (
    <div className="flex flex-wrap justify-evenly">
      {hospitals && hospitals.length > 0 ? (
        hospitals.map((hospital) => (
          <div
            key={hospital.id}
            className="m-3 p-4 bg-white text-black rounded-lg shadow-md w-64 h-40 cursor-pointer relative group overflow-hidden transition-transform duration-300 hover:scale-150 hover:h-60"
          >
            {/* Default card content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center transition-opacity duration-300 group-hover:opacity-0">
              <div className="font-bold text-lg">{hospital.name}</div>
              <div className="text-sm text-gray-600">{hospital.location}</div>
              <div className="mt-2 text-xs text-gray-400">
                Hover for more details
              </div>
            </div>

            {/* Hover content */}
            <div className="absolute inset-0 bg-white p-4 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-10 flex flex-col justify-start items-start text-sm">
              <div className="font-semibold text-lg mb-1">{hospital.userName}</div>
              <div className="text-gray-600 mb-2">
                <span className="font-semibold">Location:</span>{" "}
                {hospital.address.street}, {hospital.address.city}, {hospital.address.state}
              </div>
              {/* <div className="font-semibold text-lg mb-1"
              onClick={()=> navigate('/appointment', { state: { hospital: hospital, department:hospital.departmentName , patient:patient} })}
              >{hospital.departmentName}</div> */}
              <div className="text-gray-600 mb-1">
                <span className="font-semibold">Departments:</span>{" "}
                {hospital.departments.map((department, index) => (
                  <button
                    key={department.departmentId}
                    className="hover:bg-blue-300 flex px-3 py-1 rounded transition duration-300"
                    // onClick={() => console.log(`${hospital.name} @ Selected department: ${department.name}`)} // Optional action
                    onClick={()=> navigate('/appointment', { state: { hospital: hospital, department:department , patient:patient} })}
                  >
                    {department.departmentName}
                  </button>
                ))}
              </div>
              
            </div>
          </div>
        ))
      ) : (
        <div>No Hospitals available</div>
      )}
    </div>
  );
};

export default HospitalCard;
