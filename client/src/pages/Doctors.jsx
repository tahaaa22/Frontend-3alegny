import {Select, SelectItem} from "@nextui-org/react";
import {Card, CardHeader, CardBody, CardFooter, Button, Textarea} from "@nextui-org/react";
import DoctorCard from "../components/DoctorCard";

import React from "react";

const Doctors=()=>{

    const deps = [
        {key: "general", label: "General Physician"},
        {key: "gynecologist", label: "Gynecologist"},
        {key: "dermatologist", label: "Dermatologist"},
        {key: "pediatrician", label: "Pediatrician"},
        {key: "neurologist", label: "Neurologist"},
        {key: "gastroenterologist", label: "Gastroenterologist"},
        ];
    return(
        <>
        <div class="flex flex-col sm:flex-col items-center gap-6">
            <div>
            <br></br>
            <br></br>
            <br></br>
            <Card className="max-w-[400px]">
                <CardHeader className="w-[250px] font-bold justify-center items-center text-center">
                    Find a Doctor
                </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
                <Select className="max-w-xs" label="Select a Department">
                    {deps.map((dep) => (
                    <SelectItem key={dep.key} className="text-black">{dep.label}</SelectItem>
                    ))}
                </Select>
                <br></br>
                <Textarea className="max-w-xs" label="Doctor Name" placeholder="Please enter the doctor's name." />
            </CardBody>
            <CardFooter>
                <Button fullWidth color="secondary">Search</Button>
            </CardFooter>
            </Card>
            </div>
            <div>
                <DoctorCard></DoctorCard>
            </div>
        </div>
        </>
    );
}

export default Doctors