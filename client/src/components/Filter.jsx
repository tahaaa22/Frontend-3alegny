import React, {useState} from "react";

const Filter = ({ type, onFilter, drugs }) => {
  const [price, setPrice] = useState(0);
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0);

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    onFilter("price", e.target.value); // Pass price as filter
  };

  const handleDepartmentChange = (e) => {
   
      onFilter("hospital",e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    onFilter("location", e.target.value); // Pass location as filter
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
    onFilter("rating", e.target.value); // Pass rating as filter
  };

  return (
    <div className="bg-white rounded shadow-lg p-4 w-64">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Filters</h3>

      {type === "pharmacy" && (
        <>
          <button
            className="text-gray-700 mb-2"
            onClick={() => onFilter("location", location)} // Send location filter value
          >
            Location
          </button>
          <br />
          <button
            className="text-gray-700 mb-2"
            onClick={() => onFilter("rating", rating)} // Send rating filter value
          >
            Rating
          </button>
          <br />
          <div>
            <label className="text-gray-700 mb-2">Filter by Drug:</label>
            <select
              onChange={(e) => onFilter("drugs", e.target.value)} // Send drug filter value
              className="w-full p-2 border rounded bg-white text-black"
            >
              <option value="">Select a drug</option>
              {drugs.map((drug, index) => (
                <option key={index} value={drug}>
                  {drug}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
      
      {type === "hospital" && (
        <>
          <div>
            <label className="text-gray-700 mb-2">Price Range:</label>
            <input
              type="range"
              min="0"
              max="10000"
              value={price}
              onChange={handlePriceChange}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>$0</span>
              <span>{price}</span>
              <span>$10000</span>
            </div>
          </div>

          <div className="mt-4">
            <label className="text-gray-700 mb-2">Department:</label>
            <select
              onChange={handleDepartmentChange}
              value={department}
              className="w-full p-2 border rounded bg-white text-black"
            >
              <option value="">Select Department</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Neurology">Neurology</option>
              <option value="Radiology">Radiology</option>
            </select>
          </div>
          

          <div className="mt-4">
            <label className="text-gray-700 mb-2">Location:</label>
            <select
              onChange={handleLocationChange}
              value={location}
              className="w-full p-2 border rounded bg-white text-black"
            >
              <option value="">Select Location</option>
              <option value="Dokki">Dokki</option>
              <option value="Faisal">Faisal</option>
              <option value="New Cairo">New Cairo</option>
              <option value="Maadi">Maadi</option>
            </select>
          </div>

          <div className="mt-4">
            <label className="text-gray-700 mb-2">Rating (1-5):</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={handleRatingChange}
              className="w-full p-2 border rounded bg-white text-black"
            />
          </div>
        </>
      )}
    </div>
  );
};
export default Filter;
