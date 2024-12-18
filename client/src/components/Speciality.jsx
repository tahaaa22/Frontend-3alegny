import React from "react";
import {Card, CardBody, Image} from "@nextui-org/react";

const Speciality = () => {
  const specs = [
    { title: "General Physician", img: "public/General_physician.jpg", descrip: "This is a General Physician"},
    { title: "Gynecologist", img: "public/Gynecologist.jpg", descrip: "This is a Gynecologist" },
    { title: "Dermatologist", img: "public/Dermatologist.jpg", descrip: "This is a Dermatologist" },
    { title: "Pediatrician", img: "public/Pediatricians.jpg", descrip: "This is a Pediatrician" },
    { title: "Neurologist", img: "public/Neurologist.jpg", descrip: "This is a Neurologist" },
    { title: "Gastroenterologist", img: "public/Gastroenterologist.jpg", descrip: "This is a Gastroenterologist" },
  ];

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-6">
      
    {specs.map((item, index) => (
      <Card radius="md" key={index} isPressable shadow="sm" onPress={() => console.log("item pressed")}>
        <CardBody className="overflow-visible p-0 justify-center items-center">
          <Image
            alt={item.title}
            className="w-full object-cover justify-center"
            radius="full"
            shadow="sm"
            src={item.img}
            width="80%"
            height="100%"
          />
          <div></div>
          <b>{item.title}</b>
        </CardBody>
      </Card>
    ))}
  </div>
  );
};

export default Speciality;