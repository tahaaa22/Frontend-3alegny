import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PharmacyCard = ({ pharmacies, patient }) => {
  const navigate = useNavigate();
  console.log("at pharmacy", patient)

 

  return (
    <div className="flex flex-wrap justify-evenly h-96">
      {pharmacies.map((pharmacy) => (
        <div
          key={pharmacy.pharmacyId}
          className="m-3 p-4 bg-white text-black rounded-lg shadow-md w-64 h-40 cursor-pointer relative group overflow-hidden transition-transform duration-300 hover:scale-150 hover:h-56"
        >
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center transition-opacity duration-300 group-hover:opacity-0">
            <div className="font-bold text-lg">{pharmacy.name}</div>
            <div className="text-sm text-gray-600">{pharmacy.address.street}, {pharmacy.address.city}</div>
            <div className="mt-2 text-xs text-gray-400">
              Hover for more details
            </div>
          </div>

          <div className="absolute inset-0 bg-white p-4 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-10 flex flex-col justify-start items-start text-sm">
            <div className="font-semibold text-lg mb-1">{pharmacy.name}</div>
            <div className="text-gray-600 mb-2">
              <span className="font-semibold">Location:</span>{" "}
              {pharmacy.address.street}, {pharmacy.address.city}, {pharmacy.address.state}
            </div>
            <div className="text-gray-600 mb-2">
              <span className="font-semibold">Drugs Available:</span>
              <ul className="list-disc pl-5">
                {pharmacy.drugs.length > 0 ? (
                  pharmacy.drugs.map((drug) => (
                    <li key={pharmacy.pharmacyId} className="mb-1">
                      <span className="font-semibold"
                      onClick={() =>
                        navigate("/orders", {
                          state: { pharmacy, drug, patient },
                        })
                      }
                      >{drug.dName || "Unknown Drug"}:</span>{" "}
                      {drug.price} USD
                    </li>
                  ))
                ) : (
                  <li>No drugs available</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PharmacyCard;
