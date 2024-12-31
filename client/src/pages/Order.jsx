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

    const [orderDetails, setOrderDetails] = useState({
        drugs: [],
        drugCategories: [],
        drugQuantities: [],
        drugPrices:[],
    });


    const [currentDrug, setCurrentDrug] = useState({
        name: drug.name,
        category: "General",
        quantity: 1,
        price: drug.price,
        
    });

    const addDrugToOrder = () => {
        setOrderDetails((prev) => ({
            drugs: [...prev.drugs, currentDrug.name],
            drugCategories: [...prev.drugCategories, currentDrug.category],
            drugQuantities: [...prev.drugQuantities, currentDrug.quantity],
            drugPrices: [...prev.drugPrices, currentDrug.price],
        }));
    };

    // Mock patient data
    const [Patient, setPatient] = useState();
    const [drugQuantity, setDrugQuantity] = useState(1);

    

    const handleSubmitOrder = async () => {

        try {
            console.log("order details:", orderDetails.drugPrices)
            const response = await axios.post(
              `https://backend-3alegny-hpgag2fkg4hrb9c0.canadacentral-01.azurewebsites.net/order/create/${patient.id}/${pharmacy.pharmacyId}?pid=${patient.id}&phid=${pharmacy.pharmacyId}`,
              {
                // patientId: patient.id,
                // pharmacyId: pharmacy.pharmacyId,
                // created: new Date().toISOString(),
                // drugs: orderDetails.drugs,
                // drugCategories: orderDetails.drugCategories,
                // drugQuantities: orderDetails.drugQuantities,
                // street: patient.address.street, 
                // city: patient.address.city,
                // zipcode: patient.address.zipcode, // Replace with actual zipcode if needed
                // state: patient.address.state // Replace with actual state if needed
                
                patientId: patient.id,
                pharmacyId: pharmacy.pharmacyId,
                created: new Date().toISOString(),
                drugs:orderDetails.drugs,
                drugCategories: [
                    "string"
                ],
                drugQuantities: [
                    0
                ],
                street: "string",
                city: "string",
                zipcode: "string",
                state: "string"

              }
              
            ); 
            // await postBills();     
            alert("Welcome! Account created successfully.");
            // navigate("/patient", { state: { patientdata:response.data  } });
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
                drugNames: orderDetails.drugs,
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
                    <label className="text-[#102a4b] font-semibold">Select Drug:</label>
                    <select
                        value={currentDrug.name}
                        onChange={(e) => setCurrentDrug({ ...currentDrug, name: e.target.value })}
                        className="border p-2 rounded w-full mt-2 text-black bg-slate-300"
                    >
                        {[drug, ...relatedDrugs].map((d) => (
                            <option key={d.id} value={d.name}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mt-4">
                    <label className="text-[#102a4b] font-semibold">Select Quantity:</label>
                    <input
                        type="number"
                        min="1"
                        value={currentDrug.quantity}
                        onChange={(e) => setCurrentDrug({ ...currentDrug, quantity: Number(e.target.value) })}
                        className="border p-2 rounded w-full mt-2 text-black bg-slate-300"
                    />
                </div>
                <div className="mt-4">
                    <label className="text-[#102a4b] font-semibold">Select Category:</label>
                    <input
                        type="text"
                        value={currentDrug.category}
                        onChange={(e) => setCurrentDrug({ ...currentDrug, category: e.target.value })}
                        className="border p-2 rounded w-full mt-2 text-black bg-slate-300"
                    />
                </div>
                <button
                    className="bg-blue-500 text-white py-2 px-4 mt-4 rounded"
                    onClick={addDrugToOrder}
                >
                    Add Drug to Order
                </button>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4 text-[#102a4b]">Order Summary</h2>
                {orderDetails.drugs.length > 0 ? (
                    <ul>
                        {orderDetails.drugs.map((drugName, index) => (
                            <li key={index} className="text-[#102a4b]">
                                <strong>Drug:</strong> {drugName}, <strong>Category:</strong> {orderDetails.drugCategories[index]}, <strong>Quantity:</strong> {orderDetails.drugQuantities[index]}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-[#102a4b]">No drugs added to the order yet.</p>
                )}
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
