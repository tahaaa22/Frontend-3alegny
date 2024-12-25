import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Image} from "@nextui-org/react";
import Rating from "./Rating";

const TopHospital = () => {
    const pharmacies = [
        {
            title: "Shifa",
            img: "/public/shifa_logo.png",
            rtg: 4
        },
        {
            title: "Al-Assema",
            img: "/public/assema_logo.png",
            rtg: 4
        },
        {
          title: "El Nada",
          img: "/public/nada_logo.png",
          rtg: 5
        },
        {
          title: "Saudi German",
          img: "/public/saudigerman_logo.png",
          rtg: 5
        }
      ];
      
  return (
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 p-4">
      {pharmacies.map((item, index) => (
        <Card
          key={index}
          shadow="lg"
          isPressable
          onPress={() => console.log("Item pressed")}
          className="w-70 h-76 hover:shadow-xl transition-shadow duration-200 object-cover rounded-t-lg text-center"
        >
         {/* <CardHeader className="flex justify-center items-center">
          <b className="text-lg font-bold text-center">{item.title}</b>
        </CardHeader> */}
          <CardBody className="p-0 justify-center items-center">
            <Image
              radius="none"
              alt={item.title}
              src={item.img}
              width="100%"
              className="w-50 h-44 justify-center text-center" 
            />
          </CardBody>
          <CardFooter className="justify-center items-center">
          <p> <Rating rtg={item.rtg} /></p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default TopHospital;
