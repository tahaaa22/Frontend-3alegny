import React, { useState, useEffect } from "react";
import axios from "axios";

const PharmacyPortal = () => {
  const [activeSection, setActiveSection] = useState("inventory");
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [drugDetails, setDrugDetails] = useState(null);

  const [drugs, setDrugs] = useState([]); // State for dynamic drugs data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const [orders, setOrders] = useState([
    { id: 1, customerName: "John Doe", drug: "Paracetamol", quantity: 2, status: "pending" },
    { id: 2, customerName: "Jane Smith", drug: "Ibuprofen", quantity: 1, status: "completed" },
  ]);

  const [newDrug, setNewDrug] = useState({
    drugName: "",
    description: "",
    price: "",
    stock: "",
    expiryDate: "",
    manufacturer: "",
    category: "",
    type: "",
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

  const drugStats = {
    // totalDrugs: 200,
    totalOrders: 120,
    completedOrders: 85,
    pendingOrders: 35,
  };

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const response = await axios.get(
          "https://backend-3alegny-hpgag2fkg4hrb9c0.canadacentral-01.azurewebsites.net/Pharmacy/Drugs"
        );
        setDrugs(response.data.data); // Set fetched drugs data
      } catch (err) {
        console.error("Error fetching drugs:", err);
        setError("Failed to fetch drugs.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchDrugs();
  }, []);

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
  const handleNewDrugSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending the newDrug data to the backend
      const response = await axios.post(
        "https://backend-3alegny-hpgag2fkg4hrb9c0.canadacentral-01.azurewebsites.net/Pharmacy/12345/AddDrugs",
        {
          id: null, // Assuming the backend will generate an ID
          name: newDrug.drugName,
          description: newDrug.description,
          price: parseFloat(newDrug.price),
          quantity: parseInt(newDrug.stock, 10),
          expiryDate: newDrug.expiryDate,
          manufacturer: newDrug.manufacturer,
          category: newDrug.category,
          type: newDrug.type,
        }
      );
      alert("Drug added successfully!");
      console.log("Response:", response.data);

      // Reset the form fields
      setNewDrug({
        drugName: "",
        description: "",
        price: "",
        stock: "",
        expiryDate: "",
        manufacturer: "",
        category: "",
        type: "",
      });
    } catch (err) {
      console.error("Error adding drug:", err);
      alert("Failed to add the drug. Please try again.");
    }
  };

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
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <table className="w-full bg-white rounded-lg shadow-md">
                <thead className="bg-gray-200">
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left">#</th>
                    <th className="py-2 px-4 text-left">Drug</th>
                    <th className="py-2 px-4 text-left">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {drugs.map((drug, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleDrugClick(drug)}
                    >
                      <td className="py-2 px-4">{index + 1}</td>
                      <td className="py-2 px-4">{drug.Name}</td>
                      <td className="py-2 px-4">{drug.Quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            <form
              onSubmit={handleNewDrugSubmit}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Drug Name:</label>
                <input
                  type="text"
                  name="drugName"
                  value={newDrug.drugName}
                  onChange={(e) =>
                    setNewDrug({ ...newDrug, drugName: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Enter drug name"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Description:</label>
                <textarea
                  name="description"
                  value={newDrug.description}
                  onChange={(e) =>
                    setNewDrug({ ...newDrug, description: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Enter drug description"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Price:</label>
                <input
                  type="number"
                  name="price"
                  value={newDrug.price}
                  onChange={(e) =>
                    setNewDrug({ ...newDrug, price: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Enter drug price"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Stock Quantity:</label>
                <input
                  type="number"
                  name="stock"
                  value={newDrug.stock}
                  onChange={(e) =>
                    setNewDrug({ ...newDrug, stock: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Enter stock quantity"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Expiry Date:</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={newDrug.expiryDate}
                  onChange={(e) =>
                    setNewDrug({ ...newDrug, expiryDate: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Manufacturer:</label>
                <input
                  type="text"
                  name="manufacturer"
                  value={newDrug.manufacturer}
                  onChange={(e) =>
                    setNewDrug({ ...newDrug, manufacturer: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Enter manufacturer name"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Category:</label>
                <select
                  name="category"
                  value={newDrug.category}
                  onChange={(e) =>
                    setNewDrug({ ...newDrug, category: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Type:</label>
                <input
                  type="text"
                  name="type"
                  value={newDrug.type}
                  onChange={(e) =>
                    setNewDrug({ ...newDrug, type: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Enter drug type"
                />
              </div>
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
          <div>
            <h2 className="text-xl font-semibold mb-4">Drug Statistics</h2>
            <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 p-4 rounded">
                <p className="text-lg font-semibold text-gray-700">Total Drugs</p>
                <p className="text-2xl text-gray-700">{newDrug.stock}</p>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmacyPortal;
