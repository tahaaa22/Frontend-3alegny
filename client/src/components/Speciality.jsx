import React from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

const Speciality = () => {
  const specs = [
    { title: "General Physicians", img: "public/logo.png" },
    { title: "Gynecologists", img: "public/logo.png" },
    { title: "Dermatologists", img: "public/logo.png" },
    { title: "Pediatricians", img: "public/logo.png" },
    { title: "Neurologists", img: "public/logo.png" },
    { title: "Gastroenterologists", img: "public/logo.png" },
  ];

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-6">
      {specs.map((item, index) => (
        <Card key={index} isPressable shadow="sm" onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
            <Image
              alt={item.title}
              className="w-full object-cover h-[140px]"
              radius="lg"
              shadow="sm"
              src={item.img}
              width="100%"
            />
          </CardBody>
          <CardFooter className="text-small flex justify-center items-center">
            <b>{item.title}</b>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Speciality;