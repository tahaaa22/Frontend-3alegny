import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import HospitalCard from '../components/HospitalCard';
import ClinicCard from '../components/ClinicCard';
import PharmacyCard from '../components/PharmacyCard';
import Filter from '../components/Filter';

const PatientPortal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let { response} = location.state?.patientdata;
 
    const patient =location.state.patientdata
    console.log("🚀 ~ patient ~ data:", patient)

   const hospitals = [
    {
      id: 1,
      name: "Sunrise Medical Center",
      Location: "123 Main Street, New York",
      departments: [
        { name: "Cardiology" },
        { name: "Neurology" },
        { name: "Orthopedics" },
        { name: "Pediatrics" },
      ],
      rating: "4.8/5",
      doctors: "150",
      commission: "12%",
    },
    {
      id: 2,
      name: "Green Valley Hospital",
      Location: "456 Elm Avenue, Los Angeles",
      departments: [
        { name: "Cardiology" },
        { name: "Neurology" },
        { name: "Orthopedics" },
        { name: "Pediatrics" },
      ],
      rating: "4.5/5",
      doctors: "95",
      commission: "10%",
    },
    {
      id: 3,
      name: "Bluewater Health",
      Location: "789 Maple Drive, Chicago",
      departments: [
        { name: "Cardiology" },
        { name: "Neurology" },
        { name: "Orthopedics" },
        { name: "Pediatrics" },
      ],
      rating: "4.6/5",
      doctors: "120",
      commission: "9%",
    },
    {
      id: 4,
      name: "Wellness Care Hospital",
      Location: "321 Oak Street, Houston",
      departments: [
        { name: "Cardiology" },
        { name: "Neurology" },
        { name: "Orthopedics" },
        { name: "Pediatrics" },
      ],
      rating: "4.3/5",
      doctors: "110",
      commission: "11%",
    },
    {
      id: 5,
      name: "Harmony Health Institute",
      Location: "654 Pine Road, San Francisco",
      departments: [
        { name: "Cardiology" },
        { name: "Neurology" },
        { name: "Orthopedics" },
        { name: "Pediatrics" },
      ],
      rating: "4.7/5",
      doctors: "140",
      commission: "8%",
    },
    {
      id: 6,
      name: "Harmony Health Institute",
      Location: "654 Pine Road, San Francisco",
      departments: [
        { name: "Cardiology" },
        { name: "Neurology" },
        { name: "Orthopedics" },
        { name: "Pediatrics" },
      ],
      rating: "4.7/5",
      doctors: "140",
      commission: "8%",
    },
  ];

  const clinics = [
    {
      id: 1,
      name: "Wellness Clinic",
      Location: "New York, NY",
      department: "Cardiology",
      rating: "4.5/5",
      doctors: "Dr. Smith, Dr. Johnson",
      commission: "10%",
    },
    {
      id: 2,
      name: "HealthPlus Clinic",
      Location: "Los Angeles, CA",
      department: "Dermatology",
      rating: "4.7/5",
      doctors: "Dr. Lee, Dr. Patel",
      commission: "8%",
    },
  ];

  const pharmacies = [
    {
      id: 1,
      name: "City Pharmacy",
      Location: "New York, NY",
      rating: "4.7/5",
    },
    {
      id: 2,
      name: "Greenleaf Pharmacy",
      Location: "Los Angeles, CA",
      rating: "4.9/5",
    },
  ];

  const drugs = [
    { id: 1, name: "Paracetamol", price: 10, pharmacyId: 1, arrivalDate: "2024-12-20" },
    { id: 2, name: "Ibuprofen", price: 15, pharmacyId: 1, arrivalDate: "2024-12-21" },
    { id: 3, name: "Aspirin", price: 8, pharmacyId: 2, arrivalDate: "2024-12-25" },
];
  const dummyLocations = [
    { city: "New York", region: "New York", country: "USA" },
    { city: "London", region: "England", country: "UK" },
    { city: "Tokyo", region: "Tokyo", country: "Japan" },
    { city: "Paris", region: "Île-de-France", country: "France" },
    { city: "Berlin", region: "Berlin", country: "Germany" },
  ];

  if (!patient || patient.role !== "Patient") {
    return (
      <div className="w-screen mx-auto p-14 mt-7">
        <h2 className="text-2xl font-bold text-red-500">
          Unauthorized Access
          
        </h2>
        <p className="text-lg text-white">
          You do not have the necessary permissions to access the Patient Portal.
        </p>
        <button
          className="mt-5 text-white bg-blue-500 hover:bg-blue-700 px-5 py-2 rounded-md"
          onClick={() => navigate("/login")}
        >Return to Login</button>
      </div>
    );
  }

  const [filterType, setFilterType] = useState(""); // Keeps track of which filter is active
  const [Location, setLocation] = useState(""); // User's Location
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  // Function to toggle the filter dropdown
  const handleFilterClick = (type) => {
    // Toggle the filter visibility for the clicked button
    setFilterType((prevType) => (prevType === type ? "" : type));
  };
  
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsDetectingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Request to PositionStack API
        try {
          const response = await fetch(
            `http://api.positionstack.com/v1/reverse?access_key=a51334c4ca542f7d7be4a82dbbf4bc81
&query=${latitude},${longitude}&output=json`
          );
          const data = await response.json();

          if (data.data && data.data.length > 0) {
            const address = data.data[0];

            // Extract region, city, and country
            const city = address.city || "N/A";
            const region = address.region || "N/A";
            const country = address.country || "N/A";

            setLocation(`${city}, ${region}, ${country}`);
          } else {
            alert("Unable to fetch location details.");
          }
        } catch (error) {
          alert("Error fetching location data.");
        }

        setIsDetectingLocation(false);
      },
      (error) => {
        alert("Unable to retrieve location. Please allow location access.");
        setIsDetectingLocation(false);
      }
    );
  };
  const handleLocationSelect = (event) => {
    const selectedLocation = event.target.value;
    setLocation(selectedLocation);
  };

  return (
    <div className="w-screen mx-auto p-14 mt-7">
      <div className="flex mb-8">
        <div className="flex w-full bg-blue-900 p-8 text-white rounded-lg">
          <div className="w-1/2 pr-8">
            <div className="text-3xl font-bold mb-4">Welcome to the Patient Portal</div>
            <p className="text-lg text-white">
              This portal provides you with information about various hospitals, clinics, and pharmacies. 
              You can explore hospitals and clinics near you for health services, and pharmacies for your medicinal needs.
            </p>
          </div>
          <div className="w-1/2">
            <img
              src="https://cdn-res.keymedia.com/cms/images/ca/159/0379_638260706292671006.jpg"
              alt="Health Icon"
              className="w-full h-44 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md text-black">
        <h3 className="text-xl font-semibold mb-4">Select or Detect Location</h3>
        <div className="text-black flex items-center gap-4">
          <input
            type="text"
            placeholder="Enter your location"
            value={Location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded bg-white"
          />
          <button
            onClick={handleDetectLocation}
            className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${
              isDetectingLocation ? "cursor-not-allowed opacity-75" : ""
            }`}
            disabled={isDetectingLocation}
          >
            {isDetectingLocation ? "Detecting..." : "Detect Location"}
          </button>
        </div>
        {/* Dropdown for selecting a dummy location */}
        <div className="mt-4">
          <select
            onChange={handleLocationSelect}
            value={Location}
            className="w-full p-2 border rounded bg-white text-black"
          >
            <option value="">Select a location</option>
            {dummyLocations.map((loc, index) => {
              const locationString = `${loc.city}, ${loc.region}, ${loc.country}`;
              return (
                <option key={index} value={locationString}>
                  {locationString}
                </option>
              );
            })}
          </select>
        </div>
        {Location && (
          <p className="mt-3 text-gray-700">
            Current Location: <strong>{Location}</strong>
          </p>
        )}
      </div>
      
      <div className="mb-5">
        <h2 className="text-white text-2xl font-semibold mb-2">Hospitals </h2>
        <button 
        className='bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 mb-1 border border-white hover:border-transparent rounded'
        onClick={() => handleFilterClick("hospital")}
        >
          Filter</button>
          {filterType === "hospital" && <Filter type={filterType} />}
 
        <HospitalCard hospitals={hospitals} />
      </div>
      <div className="border-t border-white w-screen mb-4"></div>

      <div className="mb-5">
        <h2 className="text-white text-2xl font-semibold mb-2">Clinics</h2>
        <button className='bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 mb-1 border border-white hover:border-transparent rounded'
         onClick={() => handleFilterClick("clinic")}
        >Filter</button>
        {filterType === "clinic" && <Filter type={filterType} />}
        <ClinicCard clinics={clinics} />
      </div>
      <div className="border-t border-white w-screen mb-4"></div>

      <div>
        <h2 className="text-white text-2xl font-semibold mb-2">Pharmacies</h2>
        <button 
        className='bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 mb-1 border border-white hover:border-transparent rounded'
        onClick={() => handleFilterClick("pharmacy")}
        >
          Filter</button>
          {filterType === "pharmacy" && <Filter type={filterType} />}
        <PharmacyCard pharmacies={pharmacies} drugs={drugs} patient={patient}/>
      </div>
      <div className="border-t border-white w-screen mb-4"></div>
    </div>
    
    
  );
};

export default PatientPortal;
