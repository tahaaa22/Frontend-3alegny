import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Image, Link, Button } from "@nextui-org/react";
import Speciality from "../components/Speciality";
import TopDoctor from "../components/TopDoctor";
import TopPharmacy from "../components/TopPharmacy";
import TopHospital from "../components/TopHospital";

const HomePage = () => {
  const [totalUsers, setTotalUsers] = useState(null); // State for user count
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get(
          "https://backend-3alegny-hpgag2fkg4hrb9c0.canadacentral-01.azurewebsites.net/admin/users"
        );
        setTotalUsers(response.data.totalUsers || 0); // Assuming the response has totalUsers field
      } catch (err) {
        console.error("Error fetching user count:", err);
        setError("Failed to fetch user count.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserCount();
  }, []); // Fetch data on mount

  return (
    <>
      <div className="flex items-center flex-col p-6">
        <div className="flex flex-col lg:flex-row items-center gap-8 px-6 py-8">
          <div className="flex flex-col items-center gap-6 justify-center">
            <h1 className="text-4xl font-bold text-white">
              Book Your Appointments
            </h1>
            <h1 className="text-4xl font-bold text-white">
              with Trusted Doctors
            </h1>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Button
                as={Link}
                color="primary"
                href="/login"
                variant="solid"
                className="items-center px-6 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
              >
                Book Appointment
              </Button>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Image
              width={500}
              alt="Doctors Image"
              src="./public/doctors.jpg"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Dynamic User Count Section */}
        <div className="flex flex-col lg:flex-row items-center gap-8 px-6 py-8">
          <div className="flex-shrink-0">
            <Image
              width={450}
              alt="Users Image"
              src="./public/allusers.png"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col items-center gap-6 justify-center">
            <h1 className="text-4xl font-bold text-white">
              Join {loading ? "Loading..." : error ? "Error" : totalUsers} users
            </h1>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Button
                as={Link}
                color="primary"
                href="/signup"
                variant="solid"
                className="px-6 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
              >
                Create Account
              </Button>
              <div className="flex items-center">
                <div className="flex -space-x-4">
                  <div className="w-12 h-12 overflow-hidden">
                    <User
                      avatarProps={{
                        src: "../public/animation_avatar.png",
                      }}
                    />
                  </div>
                  <div className="w-12 h-12 overflow-hidden">
                    <User
                      avatarProps={{
                        src: "../public/animation_avatar_female.jpeg",
                      }}
                    />
                  </div>
                  <div className="w-12 h-12 overflow-hidden">
                    <User
                      avatarProps={{
                        src: "../public/animation_avatar2.png",
                      }}
                    />
                  </div>
                  <div className="w-12 h-12 overflow-hidden">
                    <User
                      avatarProps={{
                        src: "../public/animation_female_avatar1.png",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of the Homepage */}
        <div className="flex flex-wrap justify-center gap-8">
          <h2 className="text-4xl font-bold text-white">Find By Speciality</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <p className="text-white text-center max-w-md text-medium">
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free.
          </p>
        </div>
        <br />
        <div className="flex flex-wrap justify-center gap-8">
          <Speciality />
        </div>
        <br />
        <div className="flex flex-wrap justify-center gap-8">
          <h2 className="text-4xl font-bold text-white">Top Doctors to Book</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <TopDoctor />
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-8 px-6 py-8">
          <div className="flex flex-col items-center gap-6 justify-center">
            <h1 className="text-4xl font-bold text-white">
              Explore 180+ Hospitals
            </h1>
            <h1 className="text-4xl font-bold text-white">and Pharmacies</h1>
          </div>
          <div className="flex-shrink-0">
            <Image
              width={460}
              height={300}
              alt="Doctors Image"
              src="./public/pharmacy.jpg"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <h2 className="text-4xl font-bold text-white">Top Hospitals</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <TopHospital />
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <h2 className="text-4xl font-bold text-white">Top Pharmacies</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <TopPharmacy />
        </div>
        <br />
      </div>
    </>
  );
};

export default HomePage;
