import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Image} from "@nextui-org/react";
import Rating from "./Rating";

const DoctorCard = () => {
    const docs = [
        {
            title: "Dr. Rachel Green",
            img: "/public/female_avatar2.png",
            rtg: 5,
            speciality: "General physician",
            hospital: "El-Salam"
        },
        {
          title: "Dr. Drake Ramoray",
          img: "/public/avatar2.png",
          rtg: 4,
          speciality: "Neurosurgeon",
          hospital: "Cleopatra"
        },
        {
          title: "Dr. Monica Geller",
          img: "/public/female_avatar1.png",
          rtg: 4,
          speciality: "Gynecologist",
          hospital: "Shifa"
        },
        {
          title: "Dr. Chandler Bing",
          img: "/public/avatar.png",
          rtg: 5,
          speciality: "Dermatologist",
          hospital: "Dar El-Fouad"
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
          className="w-58 h-76 hover:shadow-xl transition-shadow duration-200 object-cover rounded-t-lg text-center"
        >
         <CardHeader className="flex justify-center items-center">
          <b className="text-lg font-bold text-center">{item.title}</b>
        </CardHeader>
          <CardBody className="p-0 justify-center items-center">
            <Image
              radius="lg"
              alt={item.title}
              src={item.img}
              className="w-50 h-44 justify-center text-center" 
            />

          </CardBody>
          <CardFooter className="flex flex-col justify-center items-center p-4 bg-gray-50 rounded-b-lg">
          <p className="text-m text-gray-700 text-center">{item.speciality}</p>
            <p className="text-m text-gray-700 text-center">Hospital: {item.hospital}</p>
            <p> <Rating rtg={item.rtg} /></p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default DoctorCard;
