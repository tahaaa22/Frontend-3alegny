import React, { useEffect, useState } from 'react';
import HospitalCard from '../components/HospitalCard';
import ClinicCard from '../components/ClinicCard';
import PharmacyCard from '../components/PharmacyCard';

const PatientPortal = () => {
  const hospitals = [
    {
      id: 1,
      name: "Sunrise Medical Center",
      location: "123 Main Street, New York",
      departments: "Cardiology, Neurology, Pediatrics",
      rating: "4.8/5",
      doctors: "150",
      commission: "12%",
    },
    {
      id: 2,
      name: "Green Valley Hospital",
      location: "456 Elm Avenue, Los Angeles",
      departments: "Oncology, Dermatology, ENT",
      rating: "4.5/5",
      doctors: "95",
      commission: "10%",
    },
    {
      id: 3,
      name: "Bluewater Health",
      location: "789 Maple Drive, Chicago",
      departments: "Orthopedics, Radiology, Surgery",
      rating: "4.6/5",
      doctors: "120",
      commission: "9%",
    },
    {
      id: 4,
      name: "Wellness Care Hospital",
      location: "321 Oak Street, Houston",
      departments: "Gynecology, Urology, Neurology",
      rating: "4.3/5",
      doctors: "110",
      commission: "11%",
    },
    {
      id: 5,
      name: "Harmony Health Institute",
      location: "654 Pine Road, San Francisco",
      departments: "Psychiatry, Cardiology, General Medicine",
      rating: "4.7/5",
      doctors: "140",
      commission: "8%",
    },
  ];

  const clinics = [
    {
      id: 1,
      name: "Wellness Clinic",
      location: "New York, NY",
      department: "Cardiology",
      rating: "4.5/5",
      doctors: "Dr. Smith, Dr. Johnson",
      commission: "10%",
    },
    {
      id: 2,
      name: "HealthPlus Clinic",
      location: "Los Angeles, CA",
      department: "Dermatology",
      rating: "4.7/5",
      doctors: "Dr. Lee, Dr. Patel",
      commission: "8%",
    },
  ];

  const pharmacies = [
    {
      id: 1,
      name: "City Pharmacy",
      location: "New York, NY",
      rating: "4.7/5",
    },
    {
      id: 2,
      name: "Greenleaf Pharmacy",
      location: "Los Angeles, CA",
      rating: "4.9/5",
    },
  ];

  const drugs = [
    {
      id: 1,
      name: "Aspirin",
      pharmacyId: 1,
    },
    {
      id: 2,
      name: "Ibuprofen",
      pharmacyId: 1,
    },
    {
      id: 3,
      name: "Vitamin C",
      pharmacyId: 2,
    },
    {
      id: 4,
      name: "Antibiotics",
      pharmacyId: 2,
    },
  ];

  return (
    <div className="container mx-auto p-6 mt-7">
      <div className="flex mb-8">
        <div className="flex w-full bg-blue-900 p-8 text-white rounded-lg">
          <div className="w-1/2 pr-8">
            <div className="text-3xl font-bold mb-4">Welcome to the Patient Portal</div>
            <p className="text-lg">
              This portal provides you with information about various hospitals, clinics, and pharmacies. 
              You can explore hospitals and clinics near you for health services, and pharmacies for your medicinal needs.
            </p>
          </div>
          <div className="w-1/2">
            <img
              src="https://cdn-res.keymedia.com/cms/images/ca/159/0379_638260706292671006.jpg"
              alt="Health Icon"
              className="w-full h-44 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      
      <div className="mb-10">
        <h2 className="text-white text-2xl font-semibold mb-2">Hospitals</h2>
        <div className="border-t border-white w-24 mb-4"></div>
        <HospitalCard hospitals={hospitals} />
      </div>

      <div className="mb-10">
        <h2 className="text-white text-2xl font-semibold mb-2">Clinics</h2>
        <div className="border-t border-white w-24 mb-4"></div>
        <ClinicCard clinics={clinics} />
      </div>

      <div>
        <h2 className="text-white text-2xl font-semibold mb-2">Pharmacies</h2>
        <div className="border-t border-white w-24 mb-4"></div>
        <PharmacyCard pharmacies={pharmacies} drugs={drugs} />
      </div>
    </div>
  );
};

export default PatientPortal;
