import React from "react";

import {User, Image, Link, Button} from "@nextui-org/react";

import DoctorCard from "../components/DoctorCard";
import Speciality from "../components/Speciality";

const HomePage= () => {
    return(
        <>
        <div class="flex flex-col p-6">
        <div class="flex flex-col lg:flex-row items-center gap-8 px-6 py-8">
        <div class="flex flex-col items-start gap-6">
                <h1 class="text-4xl font-bold text-white">
                Book Your Appointments
                </h1>
                <h1 class="text-4xl font-bold text-white">
                with Trusted Doctors
                </h1>
                <div class="flex flex-col sm:flex-row items-center gap-6">
                <Button
                    as={Link}
                    color="primary"
                    href="/login"
                    variant="solid"
                    class="px-6 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
                >
                    Book Appointment
                </Button>
                <div class="flex items-center">
                <div class="flex -space-x-4">
                    <div class="w-12 h-12 overflow-hidden">
                    <User
                        avatarProps={{
                        src: "../public/avatar.png",
                        }}
                    />
                    </div>
                    <div class="w-12 h-12 overflow-hidden">
                    <User
                        avatarProps={{
                        src: "../public/avatar_female.jpeg",
                        }}
                    />
                    </div>
                    <div class="w-12 h-12 overflow-hidden">
                    <User
                        avatarProps={{
                        src: "../public/avatar2.png",
                        }}
                    />
                    </div>
                </div>
                </div>
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
        <div class="flex flex-wrap justify-center gap-8">
            <h2 class="text-4xl font-bold text-white">
                Find By Speciality
            </h2>
        </div>
        <br></br>
        <div class="flex flex-wrap justify-center gap-8">
            <p className="text-white text-center max-w-md text-base">
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
        </div>
        </>
    );
}

export default HomePage;