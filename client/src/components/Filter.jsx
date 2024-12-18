import React, { useState } from "react";

const Filter = ({type}) => {

    const [clicked,setclick]=useState("")

    return (
        <div className="bg-white rounded shadow-lg p-4 w-64">
          {/* Filter Content Based on Type */}
          {type === "hospital" || type === "clinic" ? (
            <>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Filters</h3>
              <button className="text-gray-700 mb-2">Location</button>  <br/>
              <button className="text-gray-700 mb-2">Debuttonartment</button><br/>
              <button className="text-gray-700 mb-2">Commission</button><br/>
              <button className="text-gray-700 mb-2">Rating</button>
            </>
          ) : type === "pharmacy" ? (
            <>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Filters</h3>
              <button className="text-gray-700 mb-2">Location</button><br/>
              <button className="text-gray-700 mb-2">Rating</button><br/>
              <button className="text-gray-700 mb-2">Drugs</button>
            </>
          ) : (
            <p className="text-gray-500">No filters available.</p>
          )}
        </div>
      );
};

export default Filter;
