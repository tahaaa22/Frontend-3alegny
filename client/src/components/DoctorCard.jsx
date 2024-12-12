import React from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

const DoctorCard = () => {
    const list = [
        {
            title: "Dr. Rachel Green",
            img: "/public/avatar.png",
            speciality: "General physician",
        },
        {
            title: "Dr. Monica Geller",
            img: "/public/avatar.png",
            speciality: "Gynecologist",
        },
        {
            title: "Dr. Phoebe Buffay",
            img: "/public/avatar.png",
            speciality: "Dermatologist",
        },
        {
          title: "Dr. Chandler Bing",
          img: "/public/avatar.png",
          speciality: "Pediatricians",
        }
      ];
  return (
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 p-4">
      {list.map((item, index) => (
        <Card
          key={index}
          shadow="lg"
          isPressable
          onPress={() => console.log("Item pressed")}
          className="hover:shadow-xl transition-shadow duration-200"
        >
          {/* Card Image */}
          <CardBody className="p-0">
            <Image
              shadow="sm"
              radius="lg"
              alt={item.title}
              src={item.img}
              className="w-full h-[160px] object-cover rounded-t-lg"
            />
          </CardBody>

          {/* Card Footer */}
          <CardFooter className="flex flex-col items-start p-4 bg-gray-50 rounded-b-lg">
            <b className="text-lg font-medium">{item.title}</b>
            <p className="text-sm text-gray-500">{item.speciality}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default DoctorCard;
