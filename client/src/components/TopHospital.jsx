import React, { useState, useEffect } from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Rating from "./Rating"; // Ensure the Rating component is properly implemented
import axios from "axios";

const TopHospital = () => {
  const [hospitals, setHospitals] = useState([]); // State for fetched hospitals
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch hospitals from backend
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get(
          "https://backend-3alegny-hpgag2fkg4hrb9c0.canadacentral-01.azurewebsites.net/top-hospitals"
        );
        setHospitals(response.data.data); // Access the 'data' array from the response
      } catch (err) {
        console.error("Error fetching top hospitals:", err);
        setError("Failed to fetch top hospitals.");
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 p-4">
      {hospitals.map((item, index) => (
        <Card
          key={index}
          shadow="lg"
          isPressable
          onPress={() => console.log(`${item.name} pressed`)}
          className="w-70 h-76 hover:shadow-xl transition-shadow duration-200 object-cover rounded-t-lg text-center"
        >
          <CardBody className="p-4 justify-center items-center">
          <p className="text-black font-semibold">{item.name}</p>
          {/* <Image
              radius="none"
              alt={item.name}
              src="/client/public/shifa_logo.png"
              width="100%"
              className="w-50 h-44 justify-center text-center" 
            /> */}
          </CardBody>
          <CardFooter className="justify-center items-center">
            <p>
              <Rating rtg={Math.round(item.rating)} />
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default TopHospital;
