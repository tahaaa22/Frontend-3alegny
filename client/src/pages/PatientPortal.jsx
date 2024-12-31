import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import HospitalCard from '../components/HospitalCard';
// import ClinicCard from '../components/ClinicCard';
import PharmacyCard from '../components/PharmacyCard';
// import Filter from '../components/Filter';
import axios from "axios";

const PatientPortal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state?.patientdata;
  const [pharmacies, setPharmacies] = useState([]);
  const [filteredPharmacies, setFilteredPharmacies] = useState([]);
  // const [filterType, setFilterType] = useState("");
  const [Location, setLocation] = useState("");
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [loadingHospitals, setLoadingHospitals] = useState(true);
  // const [price, setPrice] = useState(0);
  // const [department, setDepartment] = useState("");
  // const [rating, setRating] = useState("")

  const dummyDrugs = [
    "Paracetamol",
    "Ibuprofen",
    "Aspirin",
    "Cough Syrup",
    "Antibiotic A",
    "Pain Reliever B",
    "Vitamin C",
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
  //  const hospitals = [
  //   {
  //     id: 1,
  //     name: "Sunrise Medical Center",
  //     Location: "123 Main Street, New York",
  //     departments: [
  //       { name: "Cardiology" },
  //       { name: "Neurology" },
  //       { name: "Orthopedics" },
  //       { name: "Pediatrics" },
  //     ],
  //     rating: "4.8/5",
  //     doctors: "150",
  //     commission: "12%",
  //   },
  //   {
  //     id: 2,
  //     name: "Green Valley Hospital",
  //     Location: "456 Elm Avenue, Los Angeles",
  //     departments: [
  //       { name: "Cardiology" },
  //       { name: "Neurology" },
  //       { name: "Orthopedics" },
  //       { name: "Pediatrics" },
  //     ],
  //     rating: "4.5/5",
  //     doctors: "95",
  //     commission: "10%",
  //   },
  //   {
  //     id: 3,
  //     name: "Bluewater Health",
  //     Location: "789 Maple Drive, Chicago",
  //     departments: [
  //       { name: "Cardiology" },
  //       { name: "Neurology" },
  //       { name: "Orthopedics" },
  //       { name: "Pediatrics" },
  //     ],
  //     rating: "4.6/5",
  //     doctors: "120",
  //     commission: "9%",
  //   },
  //   {
  //     id: 4,
  //     name: "Wellness Care Hospital",
  //     Location: "321 Oak Street, Houston",
  //     departments: [
  //       { name: "Cardiology" },
  //       { name: "Neurology" },
  //       { name: "Orthopedics" },
  //       { name: "Pediatrics" },
  //     ],
  //     rating: "4.3/5",
  //     doctors: "110",
  //     commission: "11%",
  //   },
  //   {
  //     id: 5,
  //     name: "Harmony Health Institute",
  //     Location: "654 Pine Road, San Francisco",
  //     departments: [
  //       { name: "Cardiology" },
  //       { name: "Neurology" },
  //       { name: "Orthopedics" },
  //       { name: "Pediatrics" },
  //     ],
  //     rating: "4.7/5",
  //     doctors: "140",
  //     commission: "8%",
  //   },
  //   {
  //     id: 6,
  //     name: "Harmony Health Institute",
  //     Location: "654 Pine Road, San Francisco",
  //     departments: [
  //       { name: "Cardiology" },
  //       { name: "Neurology" },
  //       { name: "Orthopedics" },
  //       { name: "Pediatrics" },
  //     ],
  //     rating: "4.7/5",
  //     doctors: "140",
  //     commission: "8%",
  //   },
  // ];

  const dummyLocations = [
    {
      street: "Tahrir Street",
      city: "Dokki",
      state: "Giza"
    },
    {
      street: "Road 9",
      city: "Maadi",
      state: "Cairo"
    },
    {
      street: "King Faisal Street",
      city: "Faisal",
      state: "Giza"
    },
    {
      street: "90th Street",
      city: "New Cairo",
      state: "Cairo"
    }
  ];
  
  useEffect(() => {
    const fetHospitals = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://backend-3alegny-hpgag2fkg4hrb9c0.canadacentral-01.azurewebsites.net/patient/Hospitals"
        );
  
        if (response.data && Array.isArray(response.data.data)) {
          // Filter pharmacies based on patient's city
          const filteredHospitals = response.data.data.filter((hospital) => {
            return hospital.address.city === patient.address.city;
          });
          console.log(response.data)
  
          // Update the states with the filtered pharmacies
          setHospitals(filteredHospitals);
          setFilteredHospitals(filteredHospitals);
          // console.log("filtered:", filteredPharmacies)
        } else {
          console.error("Unexpected response structure:", response.data);
          setHospitals([]);
        }
      } catch (error) {
        console.error("Error fetching pharmacies:", error);
        setHospitals([]);
      } finally {
        setLoadingHospitals(false);
      }
    };
  
    if (patient) {
      fetHospitals();
    }
  }, [patient]);
  
  
  console.log('Filtered Hospitals:', filteredHospitals);

 useEffect(() => {
  const fetchPharmacies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://backend-3alegny-hpgag2fkg4hrb9c0.canadacentral-01.azurewebsites.net/patient/pharmacies"
      );

      if (response.data && Array.isArray(response.data.data)) {
        // Filter pharmacies based on patient's city
        const filteredPharmacies = response.data.data.filter((pharmacy) => {
          return pharmacy.address.city === patient.address.city;
        });

        // Update the states with the filtered pharmacies
        setPharmacies(filteredPharmacies);
        setFilteredPharmacies(filteredPharmacies);
        // console.log("filtered:", filteredPharmacies)
      } else {
        console.error("Unexpected response structure:", response.data);
        setPharmacies([]);
      }
    } catch (error) {
      console.error("Error fetching pharmacies:", error);
      setPharmacies([]);
    } finally {
      setLoading(false);
    }
  };

  if (patient) {
    fetchPharmacies();
  }
}, [patient]);
  

// console.log("now pharmacies",pharmacies)

// const handleFilter = async (type, value) => {
//   // Update the UI state based on the selected filter
//   if (type === "rating") {
//     // Sort pharmacies by rating
//     setFilteredPharmacies(
//       [...pharmacies].sort((a, b) => b.rating - a.rating)
//     );
//   } else if (type === "drugs") {
//     // Filter pharmacies by selected drug
//     setFilteredPharmacies(
//       pharmacies.filter((pharmacy) =>
//         pharmacy.drugs.some((drug) => drug.name === value)
//       )
//     );
//   } else if (type === "location") {
//     // Filter pharmacies and hospitals based on location
//     setFilteredPharmacies(
//       pharmacies.filter((pharmacy) => pharmacy.address.city === value)
//     );
//     setFilteredHospitals(
//       hospitals.filter((hospital) => hospital.location === value)
//     );
//   // } else if (type === "price") {
//   //   // Filter hospitals by price
//   //   setFilteredHospitals(
//   //     hospitals.filter((hospital) => hospital.price <= value)
//   //   );
//   // } else if (type === "department") {
//   //   // Filter hospitals by department
//   //   setFilteredHospitals(
//   //     hospitals.filter((hospital) => hospital.department === value)
//   //   );
//    }

//   // Prepare the filter criteria to send to the backend
//   const filterCriteria = {
//     patientId: patient.id || "defaultId",  
//     price: price || 0,
//     department: department || "string",
//     street: location || "string",
//     rating: rating || "string",
//   };

//   try {
//     // Send the filter criteria in the POST request
//     const response = await axios.post(
//       'https://backend-3alegny-hpgag2fkg4hrb9c0.canadacentral-01.azurewebsites.net/patient/hospitals',
//       filterCriteria
//     );

//     // Handle the response and update filtered hospitals
//     if (response.data && Array.isArray(response.data)) {
//       setFilteredHospitals(response.data); // Update hospitals list based on the response
//     } else {
//       console.error("Unexpected response structure:", response.data);
//     }
//   } catch (error) {
//     console.error("Error sending filter request:", error);
//   }
// };



// const handleFilterClick = (type) => {
//   setFilterType((prevType) => (prevType === type ? "" : type));
// };
  
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
            const street = address.street || "N/A";
            const city = address.city || "N/A";
            const state = address.state || "N/A";

            setLocation(`${street}, ${city}, ${state}`);
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
              const locationString = `${loc.street}, ${loc.city}, ${loc.state}`;
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
        {/* <button 
        className='bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 mb-1 border border-white hover:border-transparent rounded'
        onClick={() => handleFilterClick("hospital")}
        >
          Filter</button>
          {filterType === 'hospital' && <Filter type={filterType} onFilter={handleFilter}
            drugs={dummyDrugs} />} */}
        {loadingHospitals ? (
          <p className="text-white">Loading hospitals...</p>
        ) : filteredHospitals.length > 0 ? (
          <HospitalCard hospitals={filteredHospitals} patient={patient} />
        ) : (
          <p className="text-white">help</p>
        )}
      </div>
      <div className="border-t border-white w-screen mb-4"></div>

      <div>
        <h2 className="text-white text-2xl font-semibold mb-2">Pharmacies</h2>
        {/* <button 
        className='bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 mb-1 border border-white hover:border-transparent rounded'
        onClick={() => handleFilterClick("pharmacy")}
        >
          Filter</button>
          {filterType === "pharmacy" && (
          <Filter
            type={filterType}
            onFilter={handleFilter}
            drugs={dummyDrugs}
          />
        )} */}
        {loading ? (
          <p className="text-white">Loading pharmacies...</p>
        ) : filteredPharmacies.length > 0 ? (
          <PharmacyCard pharmacies={filteredPharmacies} patient={patient}/>
        ) : (
          <p className="text-white">No pharmacies available</p>
        )}
      </div>
      <div className="border-t border-white w-screen mb-4"></div>
    </div>
    
    
  );
};

export default PatientPortal;