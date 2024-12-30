import React from "react";

const ClinicCard = ({ clinics }) => {
  return (
    <div className="flex flex-wrap justify-evenly">
      {clinics && clinics.length > 0 ? (
        clinics.map((clinic) => (
          <div
            key={clinic.id}
            className="m-3 p-4 bg-white text-black rounded-lg shadow-md w-64 cursor-pointer relative group overflow-hidden transition-transform duration-300 hover:scale-[1.5] hover:h-56 "
          >
            {/* Default card content */}
            <div className="flex flex-col justify-center items-center text-center">
              <div className="font-bold text-lg">{clinic.name}</div>
              <div className="text-sm text-gray-600">{clinic.location}</div>
              <div className="mt-2 text-xs text-gray-400">
                Hover for more details
              </div>
            </div>

            {/* Hover content */}
            <div className="absolute inset-0 bg-white p-4 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
              <div className="font-semibold text-lg mb-1">{clinic.name}</div>
              <div className="text-gray-600 mb-2">
                <span className="font-semibold">Location:</span>{" "}
                {clinic.location}
              </div>
              <div className="text-gray-600 mb-1">
                <span className="font-semibold">Department:</span>{" "}
                {clinic.department}
              </div>
              <div className="text-gray-600 mb-1">
                <span className="font-semibold">Rating:</span> {clinic.rating}
              </div>
              <div className="text-gray-600 mb-1">
                <span className="font-semibold">Doctors:</span> {clinic.doctors}
              </div>
              <div className="text-gray-600">
                <span className="font-semibold">Commission:</span>{" "}
                {clinic.commission}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No Clinics available</div>
      )}
    </div>
  );
};

export default ClinicCard;
