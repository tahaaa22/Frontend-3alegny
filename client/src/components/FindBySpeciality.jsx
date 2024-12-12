import React from "react";

const FindBySpeciality = () => {
  const specs = [
    { title: "General Physician", img: "public/logo.png" },
    { title: "Gynecologist", img: "public/logo.png" },
    { title: "Dermatologist", img: "public/logo.png" },
    { title: "Pediatricians", img: "public/logo.png" },
    { title: "Neurologist", img: "public/logo.png" },
    { title: "Gastroenterologist", img: "public/logo.png" },
  ];
  
  const specialities = [
    { name: "General Physician", imgSrc: "public/logo.png" },
    { name: "Gynecologist", imgSrc: "public/logo.png" },
    { name: "Dermatologist", imgSrc: "public/logo.png" },
    { name: "Pediatricians", imgSrc: "public/logo.png" },
    { name: "Neurologist", imgSrc: "public/logo.png" },
    { name: "Gastroenterologist", imgSrc: "public/logo.png" },
  ];

  return (
    <div className="flex flex-col items-center gap-6 py-12 px-6">
      {/* Title */}
      <h2 className="text-3xl font-bold text-white">Find by Speciality</h2>
      <p className="text-white text-center max-w-md">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>

      {/* Specialities */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
        {specialities.map((speciality, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center gap-4"
          >
            {/* Icon */}
            <div className="w-24 h-24 bg-blue-800 rounded-full flex items-center justify-center">
              <img
                src={speciality.imgSrc}
                alt={speciality.name}
                className="w-16 h-16 object-contain"
              />
            </div>
            {/* Name */}
            <p className="text-white font-medium">{speciality.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindBySpeciality;

/* 
<>
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {specs.map((item, index) => (
        <Card className="w-[150px]" key={index} isPressable shadow="sm" onPress={() => console.log("item pressed")}>
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
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
    </>
*/