import React, { useEffect, useState } from "react";
import axios from "axios";

import {User, Image, Link, Button} from "@nextui-org/react";

import Speciality from "../components/Speciality";
import DoctorCard from "../components/DoctorCard";
import TopPharmacy from "../components/TopPharmacy";
import TopHospital from "../components/TopHospital";

const HomePage= () => {

    const [userStats, setUserStats] = useState(null); // State for user statistics
    const [topHospitals, setTopHospitals] = useState([]); // State for top hospitals
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchData = async () => {
        try {
            // Use Promise.all to fetch both endpoints concurrently
            const [userStatsResponse, topHospitalsResponse] = await Promise.all([
            axios.get(
                "https://backend-3alegny-hpgag2fkg4hrb9c0.canadacentral-01.azurewebsites.net/"
            ),
            axios.get(
                "https://backend-3alegny-hpgag2fkg4hrb9c0.canadacentral-01.azurewebsites.net/top-hospitals"
            ),
            ]);

            setUserStats(userStatsResponse.data); // Store user statistics
            setTopHospitals(topHospitalsResponse.data); // Store top hospitals
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Failed to fetch data. Please try again later.");
        } finally {
            setLoading(false); // Stop loading once requests complete
        }
        };

        fetchData();
    }, []); // Empty dependency array ensures fetch runs once on component mount

    if (loading) return <p>Loading...</p>; // Show loading message
    if (error) return <p className="text-red-500">{error}</p>; // Show error message

    return(
        <>
        <div class="flex items-center flex-col p-6">
        <div class="flex flex-col lg:flex-row items-center gap-8 px-6 py-8">
            <div class="flex flex-col items-center gap-6 justify-center">
                <h1 class="text-4xl font-bold text-white">
                Book Your Appointments
                </h1>
                <h1 class="text-4xl font-bold text-white">
                with Trusted Doctors
                </h1>
                <div class="flex flex-col sm:flex-row justify-center items-center gap-6">
                <Button
                    as={Link}
                    color="primary"
                    href="/login"
                    variant="solid"
                    class="items-center px-6 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
                >
                    Book Appointment
                </Button>
                </div>
            </div>
            <div class="flex-shrink-0">
                <Image
                width={500}
                alt="Doctors Image"
                src="./public/doctors.jpg"
                class="rounded-lg shadow-lg"
                />
            </div>
        </div>
        <div class="flex flex-col lg:flex-row items-center gap-8 px-6 py-8">
            <div class="flex-shrink-0">
                <Image
                width={450}
                alt="Users Image"
                src="./public/allusers.png"
                class="rounded-lg shadow-lg"
                />
            </div>
            <div class="flex flex-col items-center gap-6 justify-center">
                    <h1 class="text-4xl font-bold text-white">
                    Join users
                    </h1>
                    <p class="text-4xl font-bold text-white">Total Users: {userStats?.totalUsers}</p>
                    {/* <p>Active Users: {userStats?.activeUsers}</p>
                    <p>Inactive Users: {userStats?.inactiveUsers}</p> */}
                    <div class="flex flex-col sm:flex-row items-center gap-6">
                    <Button
                        as={Link}
                        color="primary"
                        href="/signup"
                        variant="solid"
                        class="px-6 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
                    >
                        Create Account
                    </Button>
                    <div class="flex items-center">
                        <div class="flex -space-x-4">
                            <div class="w-12 h-12 overflow-hidden">
                            <User
                                avatarProps={{
                                src: "../public/animation_avatar.png",
                                }}
                            />
                            </div>
                            <div class="w-12 h-12 overflow-hidden">
                            <User
                                avatarProps={{
                                src: "../public/animation_avatar_female.jpeg",
                                }}
                            />
                            </div>
                            <div class="w-12 h-12 overflow-hidden">
                            <User
                                avatarProps={{
                                src: "../public/animation_avatar2.png",
                                }}
                            />
                            </div>
                            <div class="w-12 h-12 overflow-hidden">
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
        <div class="flex flex-wrap justify-center gap-8">
            <h2 class="text-4xl font-bold text-white">
                Find By Speciality
            </h2>
        </div>
        <div class="flex flex-wrap justify-center gap-8">
            <p className="text-white text-center max-w-md text-medium">
                Simply browse through our extensive list of trusted doctors, schedule
                your appointment hassle-free.
            </p>
        </div>
        <br></br>
        <div class="flex flex-wrap justify-center gap-8">
            <Speciality />
        </div>
        <br></br>
        <div class="flex flex-wrap justify-center gap-8">
            <h2 class="text-4xl font-bold text-white">
                Top Doctors to Book
            </h2>
        </div>
        <div class="flex flex-wrap justify-center gap-8">
            <DoctorCard />
        </div>
        <div class="flex flex-col lg:flex-row items-center gap-8 px-6 py-8">
            <div class="flex flex-col items-center gap-6 justify-center">
                    <h1 class="text-4xl font-bold text-white">
                    Explore 180+ Hospitals
                    </h1>
                    <h1 class="text-4xl font-bold text-white">
                    and Pharmacies
                    </h1>
            </div>
            <div class="flex-shrink-0">
                <Image
                width={460}
                height={300}
                alt="Doctors Image"
                src="./public/pharmacy.jpg"
                class="rounded-lg shadow-lg"
                />
            </div>
        </div>
        <div class="flex flex-wrap justify-center gap-8">
            <h2 class="text-4xl font-bold text-white">
                Top Hospitals
            </h2>
        </div>
        <div class="flex flex-wrap justify-center gap-8">
            <TopHospital />
            <ul>
            {topHospitals.map((hospital) => (
                <li
                key={hospital.id}
                className="flex justify-between py-2 border-b last:border-0"
                >
                <span>{hospital.name}</span>
                <span>
                    {hospital.location} - {hospital.rating}⭐
                </span>
                </li>
            ))}
            </ul>
        </div>
        <div class="flex flex-wrap justify-center gap-8">
            <h2 class="text-4xl font-bold text-white">
                Top Pharmacies
            </h2>
        </div>
        <div class="flex flex-wrap justify-center gap-8">
            <TopPharmacy />
        </div>
        <br></br>
        </div>
        </>
    );
}

export default HomePage;