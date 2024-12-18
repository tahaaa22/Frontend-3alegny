import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Image} from "@nextui-org/react";
import Rating from "./Rating";

const DoctorCard = () => {
    const docs = [
        {
            title: "Dr. Rachel Green",
            img: "/public/avatar_female.jpeg",
            rtg: 2,
            speciality: "General physician",
            hospital: "Hospital 1"
        },
        {
            title: "Dr. Monica Geller",
            img: "/public/female_avatar1.png",
            rtg: 4,
            speciality: "Gynecologist",
            hospital: "Hospital 1"
        },
        {
            title: "Dr. Phoebe Buffay",
            img: "/public/avatar_female.jpeg",
            rtg: 5,
            speciality: "Dermatologist",
            hospital: "Hospital 2"
        },
        {
          title: "Dr. Joey Tribbiani",
          img: "/public/avatar2.png",
          rtg: 4,
          speciality: "Pediatrician",
          hospital: "Hospital 3"
        },
        {
          title: "Dr. Chandler Bing",
          img: "/public/avatar.png",
          rtg: 5,
          speciality: "Dermatologist",
          hospital: "Hospital 3"
        },
        {
          title: "Dr. Ross Geller",
          img: "/public/avatar2.png",
          rtg: 4,
          speciality: "Pediatrician",
          hospital: "Hospital 2"
        },
        {
          title: "Dr. Leo Dicaprio",
          img: "/public/avatar.png",
          rtg: 1,
          speciality: "Gynecologist",
          hospital: "Hospital 4"
        },
        {
          title: "Dr. Drake Ramoray",
          img: "/public/avatar.png",
          rtg: 5,
          speciality: "Neurosurgeon",
          hospital: "Hospital 5"
        }
      ];
      
  return (
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 p-4">
      {docs.map((item, index) => (
        <Card
          key={index}
          shadow="lg"
          isPressable
          onPress={() => console.log("Item pressed")}
          className="w-64 h-96 hover:shadow-xl transition-shadow duration-200 object-cover rounded-t-lg text-center"
        >
         <CardHeader className="flex justify-center items-center">
          <b className="text-lg font-bold text-center">{item.title}</b>
        </CardHeader>
          <CardBody className="p-0 justify-center items-center">
            <Image
              shadow="sm"
              radius="lg"
              alt={item.title}
              src={item.img}
              className="w-full h-44 justify-center text-center" 
            />
          </CardBody>
          <CardFooter className="flex flex-col justify-center items-center p-4 bg-gray-50 rounded-b-lg">
            <p className="text-m text-gray-700 text-center">{item.speciality}</p>
            <p className="text-m text-gray-700 text-center">Hospital: {item.hospital}</p>
            <div className="p-6">
              <Rating rtg={item.rtg} />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default DoctorCard;
