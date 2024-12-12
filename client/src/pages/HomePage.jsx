import React from "react";

import {User} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import {Link, Button} from "@nextui-org/react";

import DoctorCard from "../components/DoctorCard";
import FindBySpeciality from "../components/FindBySpeciality";

const HomePage= () => {
    return(
        <>
        <div class="flex flex-col gap-8 p-6">
            <div class="flex flex-col lg:flex-row items-center gap-8 px-6 py-8">
        <div class="flex-shrink-0">
            <Image
            width={500}
            alt="Doctors Image"
            src="/doctors.jpg"
            class="rounded-lg shadow-lg"
            />
        </div>
        <div class="flex flex-col items-start gap-6">
            <h1 class="text-4xl font-bold text-white">
            Book Your Appointments with Trusted Doctors
            </h1>
            <div class="flex flex-col sm:flex-row items-center gap-6">
            <Button
                as={Link}
                color="primary"
                href="/appointment"
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
                    src: "/avatar.png",
                    }}
                />
                </div>
                <div class="w-12 h-12 overflow-hidden">
                <User
                    avatarProps={{
                    src: "/avatar1.avif",
                    }}
                />
                </div>
                <div class="w-12 h-12 overflow-hidden">
                <User
                    avatarProps={{
                    src: "/avatar2.png",
                    }}
                />
                </div>
            </div>
            </div>
            </div>
        </div>
        </div>
        <div>
            <FindBySpeciality></FindBySpeciality>
        </div>
        <div class="flex flex-wrap justify-center gap-8">
            <h2 class="text-4xl font-bold text-white">
                Top Doctors to Book
            </h2>
            <DoctorCard />
        </div>
        </div>

        </>
    );
}

export default HomePage;