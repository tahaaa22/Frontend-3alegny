import React, { useState } from "react";
import {useNavigate,useLocation } from "react-router-dom";

const PharmacyPortal = () => {
  const location = useLocation();
  let { response} = location.state?.pharmacydata;

  const pharmacy =location.state.pharmacydata
  console.log("🚀 ~ pharmacy ~ data:", pharmacy)
  const [activeSection, setActiveSection] = useState("inventory");
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [drugDetails, setDrugDetails] = useState(null);
  const [newDrug, setNewDrug] = useState({
    drugName: "",
    category: "",
    manufacturer: "",
    expiryDate: "",
    price: "",
    stock: "",
  });
  const categories = [
    "Antibiotics",
    "Pain Relievers",
    "Vitamins",
    "Antidepressants",
    "Antihistamines",
    "Antifungals",
    "Vaccines",
  ];

  // Dummy Orders Data
  const [orders, setOrders] = useState([
    { id: 1, customerName: "John Doe", drug: "Paracetamol", quantity: 2, status: "pending" },
    { id: 2, customerName: "Jane Smith", drug: "Ibuprofen", quantity: 1, status: "completed" },
  ]);

  // Dummy Drugs Data
  const drugs = [
    {
      id: 1,
      drugName: "Paracetamol",
      category: "Pain Relievers",
      manufacturer: "Pharma Inc.",
      expiryDate: "2025-01-01",
      price: "$5",
      stock: 50,
    },
    {
      id: 2,
      drugName: "Ibuprofen",
      category: "Pain Relievers",
      manufacturer: "MedLife Ltd.",
      expiryDate: "2024-12-31",
      price: "$8",
      stock: 30,
    },
  ];

  const drugStats = {
    totalDrugs: 200,
    totalOrders: 120,
    completedOrders: 85,
    pendingOrders: 35,
  };

  // Handle Drug Click
  const handleDrugClick = (drug) => {
    setSelectedDrug(drug);
    setDrugDetails({ ...drug });
    setEditMode(false);
  };

  // Handle Input Change for Drug Details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDrugDetails({ ...drugDetails, [name]: value });
  };

  // Handle New Drug Form Submission
  const handleNewDrugSubmit = (e) => {
    e.preventDefault();
    alert("New Drug has been added!");
    setNewDrug({
      drugName: "",
      category: "",
      manufacturer: "",
      expiryDate: "",
      price: "",
      stock: "",
    });
  };

  if (!pharmacy || pharmacy.role !== "Pharmacy") {
    return (
      <div className="w-screen mx-auto p-14 mt-7">
        <h2 className="text-2xl font-bold text-red-500">
          Unauthorized Access
          
        </h2>
        <p className="text-lg text-white">
          You do not have the necessary permissions to access the Pharmacy Portal.
        </p>
        <button
          className="mt-5 text-white bg-blue-500 hover:bg-blue-700 px-5 py-2 rounded-md"
          onClick={() => navigate("/login")}
        >Return to Login</button>
      </div>
    );
  }

  return (
    <div className="flex container bg-gray-100 mt-20">
      {/* Sidebar */}
      <div className="w-1/5 bg-white shadow-md">
        <ul className="mt-6 text-gray-700">
          <li
            className={`p-4 flex items-center hover:bg-blue-100 cursor-pointer ${
              activeSection === "inventory" ? "bg-blue-100" : ""
            }`}
            onClick={() => setActiveSection("inventory")}
          >
            <span className="mr-2">📦</span> Drug Inventory
          </li>
          <li
            className={`p-4 flex items-center hover:bg-blue-100 cursor-pointer ${
              activeSection === "orders" ? "bg-blue-100" : ""
            }`}
            onClick={() => setActiveSection("orders")}
          >
            <span className="mr-2">📋</span> Orders List
          </li>
          <li
            className="p-4 flex items-center hover:bg-blue-100 cursor-pointer"
            onClick={() => setActiveSection("addDrug")}
          >
            <span className="mr-2">➕</span> Add Drug
          </li>
          <li
            className={`p-4 flex items-center hover:bg-blue-100 cursor-pointer ${
              activeSection === "drugStats" ? "bg-blue-100" : ""
            }`}
            onClick={() => setActiveSection("drugStats")}
          >
            <span className="mr-2">📊</span> Drug Statistics
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-4/5 flex flex-col text-gray-700 p-6">
        {/* Inventory Section */}
        {activeSection === "inventory" && (
          <>
            <h2 className="text-xl font-semibold mb-4">Drug Inventory</h2>
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-200">
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">#</th>
                  <th className="py-2 px-4 text-left">Drug</th>
                  <th className="py-2 px-4 text-left">Category</th>
                  <th className="py-2 px-4 text-left">Price</th>
                  <th className="py-2 px-4 text-left">Stock</th>
                </tr>
              </thead>
              <tbody>
                {drugs.map((drug) => (
                  <tr
                    key={drug.id}
                    className="border-b hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleDrugClick(drug)}
                  >
                    <td className="py-2 px-4">{drug.id}</td>
                    <td className="py-2 px-4">{drug.drugName}</td>
                    <td className="py-2 px-4">{drug.category}</td>
                    <td className="py-2 px-4">{drug.price}</td>
                    <td className="py-2 px-4">{drug.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedDrug && (
              <div className="bg-white p-4 mt-4 shadow-md rounded-lg">
                <h3 className="text-lg font-semibold">Drug Details</h3>
                {editMode ? (
                  <>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {Object.keys(drugDetails).map((key) => (
                        <div key={key}>
                          <label className="block text-gray-700 capitalize">{key}:</label>
                          <input
                            type="text"
                            name={key}
                            value={drugDetails[key]}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setEditMode(false)}
                      className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <>
                    <p><strong>Drug:</strong> {selectedDrug.drugName}</p>
                    <p><strong>Category:</strong> {selectedDrug.category}</p>
                    <p><strong>Manufacturer:</strong> {selectedDrug.manufacturer}</p>
                    <p><strong>Expiry Date:</strong> {selectedDrug.expiryDate}</p>
                    <p><strong>Price:</strong> {selectedDrug.price}</p>
                    <p><strong>Stock:</strong> {selectedDrug.stock}</p>
                    <button
                      onClick={() => setEditMode(true)}
                      className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded"
                    >
                      Edit Drug
                    </button>
                  </>
                )}
              </div>
            )}
          </>
        )}

        {/* Orders Section */}
        {activeSection === "orders" && (
          <>
            <h2 className="text-xl font-semibold mb-4">Orders List</h2>
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">#</th>
                  <th className="py-2 px-4 text-left">Customer</th>
                  <th className="py-2 px-4 text-left">Drug</th>
                  <th className="py-2 px-4 text-left">Quantity</th>
                  <th className="py-2 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-100">
                    <td className="py-2 px-4">{order.id}</td>
                    <td className="py-2 px-4">{order.customerName}</td>
                    <td className="py-2 px-4">{order.drug}</td>
                    <td className="py-2 px-4">{order.quantity}</td>
                    <td className="py-2 px-4">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* Add Drug Section */}
        {activeSection === "addDrug" && (
          <>
            <h2 className="text-xl font-semibold mb-4">Add New Drug</h2>
            <form onSubmit={handleNewDrugSubmit} className="bg-white p-4 rounded-lg shadow-md">
              {Object.keys(newDrug).map((key) => (
                <div key={key} className="mb-4">
                  <label className="block mb-2 text-gray-700 capitalize">{key}:</label>
                  <input
                    type="text"
                    name={key}
                    value={newDrug[key]}
                    onChange={(e) => setNewDrug({ ...newDrug, [e.target.name]: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder={`Enter ${key}`}
                  />
                </div>
              ))}
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Add Drug
              </button>
            </form>
          </>
        )}

        {/* Drug Statistics Section */}
        {activeSection === "drugStats" && (
          <>
            <h2 className="text-xl font-semibold mb-4">Drug Statistics</h2>
            <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 p-4 rounded">
                <p className="text-lg font-semibold text-gray-700">Total Drugs</p>
                <p className="text-2xl text-gray-700">{drugStats.totalDrugs}</p>
              </div>
              <div className="bg-green-100 p-4 rounded">
                <p className="text-lg font-semibold text-gray-700">Total Orders</p>
                <p className="text-2xl text-gray-700">{drugStats.totalOrders}</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded">
                <p className="text-lg font-semibold text-gray-700">Completed Orders</p>
                <p className="text-2xl text-gray-700">{drugStats.completedOrders}</p>
              </div>
              <div className="bg-orange-100 p-4 rounded ">
                <p className="text-lg font-semibold text-gray-700">Pending Orders</p>
                <p className="text-2xl text-gray-700">{drugStats.pendingOrders}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PharmacyPortal;
