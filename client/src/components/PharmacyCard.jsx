import React from "react";

const PharmacyCard = ({ pharmacies, drugs }) => {
  return (
    <div className="flex flex-wrap justify-evenly">
      {pharmacies && pharmacies.length > 0 ? (
        pharmacies.map((pharmacy) => (
          <div
            key={pharmacy.id}
            className="m-3 p-4 bg-white text-black rounded-lg shadow-md w-64 h-40 cursor-pointer relative group overflow-hidden transition-transform duration-300 hover:scale-150 hover:h-56 "
          >
            {/* Default card content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center transition-opacity duration-300 group-hover:opacity-0">
              <div className="font-bold text-lg">{pharmacy.name}</div>
              <div className="text-sm text-gray-600">{pharmacy.location}</div>
              <div className="mt-2 text-xs text-gray-400">
                Hover for more details
              </div>
            </div>

            {/* Hover content */}
            <div className="absolute inset-0 bg-white p-4 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-10 flex flex-col justify-start items-start text-sm">
              <div className="font-semibold text-lg mb-1">{pharmacy.name}</div>
              <div className="text-gray-600 mb-2">
                <span className="font-semibold">Location:</span>{" "}
                {pharmacy.location}
              </div>
              <div className="text-gray-600 mb-2">
                <span className="font-semibold">Rating:</span>{" "}
                {pharmacy.rating}
              </div>

              {/* Display drugs available */}
              <div className="text-gray-600 mb-1">
                <span className="font-semibold">Drugs Available:</span>
                <ul className="list-disc pl-5">
                  {drugs
                    .filter((drug) => drug.pharmacyId === pharmacy.id)
                    .map((drug) => (
                      <li key={drug.id} className="text-sm text-gray-600">
                        {drug.name}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No Pharmacies available</div>
      )}
    </div>
  );
};

export default PharmacyCard;
