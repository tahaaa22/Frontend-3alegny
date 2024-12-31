"use client"
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Order = () => {
    const location = useLocation();
    const { pharmacy, drug, patient } = location.state || {};
    console.log("pharmacy",pharmacy);


    // If pharmacy or drug is not available, show an error message
    if (!pharmacy || !drug) {
        return (
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-semibold mb-4">Order Details</h1>
                <p className="text-red-500">
                    No data available. Please navigate from the drugs page.
                </p>
            </div>
        );
    }

    // Mock patient data
    const [Patient, setPatient] = useState();
    const [drugQuantity, setDrugQuantity] = useState(1);
    const [drugCategory, setDrugCategory] = useState("");

    

    const handleSubmitOrder = async () => {


        try {
            const requestBody = {
              patientId: patient.id,
              pharmacyId: pharmacy.pharmacyId,
              created: new Date().toISOString(),
              drug: drug.dName, // Assuming drug has a property `dName`
              drugCategory: drugCategory || "Uncategorized",
              drugQuantity: drugQuantity,
              street: patient.address.street || "Unknown street",
              city: patient.address.city || "Unknown city",
              zipcode: patient.address.zipcode || "00000",
              state: patient.address.state || "Unknown state",
            };
        
            const response = await axios.post(
              `https://backend-3alegny-hpgag2fkg4hrb9c0.canadacentral-01.azurewebsites.net/order/create/${patient.id}/${pharmacy.pharmacyId}?pid=${patient.id}&phid=${pharmacy.pharmacyId}`,
              requestBody
            );
        
            alert("Order placed successfully.");
          } catch (error) {
            console.error("Error submitting order:", error);
            alert("Failed to place the order. Please try again.");
          }
         }

    const postBills= async()=>{

        try {
            const response = await axios.post(
              `https://backend-3alegny-hpgag2fkg4hrb9c0.canadacentral-01.azurewebsites.net/pharmacy/create-bill`,
              {
                id:{},
                patientId: patient.id,
                patientName: patient.name,
                patientAddress: `${patient.address.city} ${patient.address.street} ${patient.address.state}` ,
                pharmacyName: pharmacy.pharmacyName,
                drugNames: drug.dName,
                drugPrices: orderDetails.drugPrices,
                quantities: orderDetails.drugQuantities,
                totalQuantity: orderDetails.drugQuantities.reduce((a, b) => a + b, 0),
                totalPrice: orderDetails.drugPrices.reduce((a, b) => a + b, 0)
                
              }
            );      
            alert("Welcome! Account created successfully.");
            // navigate("/patient", { state: { patientdata:response.data  } });
          } catch (error) {
            console.error("Error submitting order:", error);
            alert("Failed to place the order. Please try again.");
        }
    }


    // Mocked related drugs data (replace this with actual related drug logic if needed)
    const relatedDrugs = [
        { id: 4, name: "Vitamin C", price: 12, pharmacyId: pharmacy.id },
        { id: 5, name: "Antibiotic", price: 18, pharmacyId: pharmacy.id },
    ].filter((d) => d.pharmacyId === pharmacy.id && d.id !== drug.id);

    return (
        <div className="p-6 bg-gray-100 h-screen mt-12 w-screen">
            <h1 className="text-2xl font-semibold mb-4 text-[#102a4b]">Order Details</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2 text-[#102a4b]">Drug Information</h2>
                <div className="mt-4">
                    <p className="text-[#102a4b] font-semibold">
                        <strong>Drug Name:</strong> {drug.dName}
                    </p>
                </div>
                <div className="mt-4">
                    <label className="text-[#102a4b] font-semibold">Select Quantity:</label>
                    <input
                        type="number"
                        min="1"
                        value={drugQuantity}
                        onChange={(e) => setDrugQuantity(Number(e.target.value))}
                        className="border p-2 rounded w-full mt-2 text-black bg-slate-300"
                    />
                </div>
                <div className="mt-4">
                    <label className="text-[#102a4b] font-semibold">Enter Category:</label>
                    <input
                        type="text"
                        value={drugCategory}
                        onChange={(e) => setDrugCategory(e.target.value)}
                        className="border p-2 rounded w-full mt-2 text-black bg-slate-300"
                    />
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4 text-[#102a4b]">Order Summary</h2>
                <ul>
                    <li className="text-[#102a4b]">
                        <strong>Drug:</strong> {drug.dName}
                    </li>
                    <li className="text-[#102a4b]">
                        <strong>Category:</strong> {drugCategory || "Uncategorized"}
                    </li>
                    <li className="text-[#102a4b]">
                        <strong>Quantity:</strong> {drugQuantity}
                    </li>
                </ul>
            </div>

            <div className="mt-6">
                <button
                    className="bg-green-500 text-white py-2 px-4 rounded"
                    onClick={handleSubmitOrder}
                >
                    Submit Order
                </button>
            </div>
        </div>
    );
};

export default Order;
