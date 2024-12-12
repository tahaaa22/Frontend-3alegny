import React from "react";
import {Textarea} from "@nextui-org/react";

const About= () => {

    return(
    <>
    <div class="flex flex-col gap-8 p-6">
    <div class="flex flex-col gap-8 p-6">
        <div></div>
        <h1 className="font-bold">Vision</h1>
        <p>
        To be the leading hospital offering outstanding health care services with the highest levels 
        of quality standards and to be the hospital of reference for patients, physicians and employees.
        </p>
    </div>
    <div class="flex flex-col gap-8 p-6">
    <h1 className="font-bold">Mission</h1>
        <p>
        Provide an integrated pattern of health care services for the entire community through implementing the best
        medical practice that fulfills the principles of quality, efficiency, effectiveness, and evidence-based 
        medical care. Enhance physical, psychological and social well-being of patients and society through provision 
        of innovative and competent services. Strive to foster learning and growth through presence of highly qualified staff 
        and application of recent technology and UpToDate medical services.
        </p>
    </div>
    </div>
    </>
    );
}

export default About
