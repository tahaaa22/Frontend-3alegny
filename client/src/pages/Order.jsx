'use client'
import React ,{useState} from "react";
import { useLocation } from "react-router-dom";

const Order = () => {
    const location = useLocation();
    const { pharmacy, drug, patient } = location.state || {};
    console.log(patient)

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
 const [Patient, setPatient] = useState({
    name: "John Doe",
    address: "123 Main Street, Springfield",
});
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [newAddress, setNewAddress] = useState(Patient.address);
   
    // Mocked related drugs data (replace this with actual related drug logic if needed)
    const relatedDrugs = [
        { id: 4, name: "Vitamin C", price: 12, pharmacyId: pharmacy.id },
        { id: 5, name: "Antibiotic", price: 18, pharmacyId: pharmacy.id },
    ].filter((d) => d.pharmacyId === pharmacy.id && d.id !== drug.id);

    
    const handleAddressChange = () => {
        setPatient((prev) => ({ ...prev, address: newAddress }));
        setIsEditingAddress(false);
    };
    return (
        <div className="p-6 bg-gray-100 h-screen mt-12">
        <h1 className="text-2xl font-semibold mb-4 text-[#102a4b]">Order Details</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Drug Information</h2>
            <p>
                <strong>Drug Name:</strong> {drug.name}
            </p>
            <p>
                <strong>Pharmacy:</strong> {pharmacy.name}
            </p>
            <p>
                <strong>Price:</strong> ${drug.price}
            </p>
            <p>
                <strong>Arrival Date:</strong> {drug.arrivalDate || "Not specified"}
            </p>
            <div className="mt-4">
                    <strong>Delivering to Address:</strong><p className="text-black">{Patient.address || "Not specified"}</p>
                    {isEditingAddress ? (
                        <div className="mt-2">
                            <input
                                type="text"
                                value={newAddress}
                                onChange={(e) => setNewAddress(e.target.value)}
                                className="border p-2 rounded w-full text-black"
                            />
                            <div className="mt-2 flex space-x-2">
                                <button
                                    className="bg-green-500 text-white py-1 px-3 rounded"
                                    onClick={handleAddressChange}
                                >
                                    Save Address
                                </button>
                                <button
                                    className="bg-gray-500 text-white py-1 px-3 rounded"
                                    onClick={() => setIsEditingAddress(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <span>{patient.address}</span>
                    )}
                </div>
                {!isEditingAddress && (
                    <button
                        className="bg-blue-500 text-white py-1 px-3 mt-2 rounded"
                        onClick={() => setIsEditingAddress(true)}
                    >
                        Change Delivery Address
                    </button>
                )}
            
        </div>

        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Other Related Drugs</h2>
            {relatedDrugs.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {relatedDrugs.map((relatedDrug) => (
                        <li
                            key={relatedDrug.id}
                            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                        >
                            <p className="font-semibold">{relatedDrug.name}</p>
                            <p className="text-sm text-gray-600">
                                <strong>Price:</strong> ${relatedDrug.price}
                            </p>
                            <button
                                className="bg-blue-500 text-white py-1 px-3 mt-2 rounded"
                                onClick={() =>
                                    alert(`Ordering ${relatedDrug.name}...`)
                                }
                            >
                                Order Now
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No related drugs available.</p>
            )}
        </div>
    </div>
    );
};

export default Order;
