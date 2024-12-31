import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import styles from "../styles/EHRPage.module.css";
import { Line, Radar } from 'react-chartjs-2';

const EHRPage = () => {
  const [activeTab, setActiveTab] = useState('patientDemographics');
  const { state } = useLocation();
  const patient = state?.patient || {};
  const patientId = patient?.id || "677335401f15256f6bd0ccfc"; // Fallback ID

  const [ehrData, setEhrData] = useState(null);

  const [ehrDataWeights, setehrDataWeights] = useState([]);
  const [ehrDatatemperatures, setehrDatatemperatures] = useState([]); 
  const [ehrDatatheartRates, setehrDatatheartRates] = useState([]); 
  const [ehrDatabloodPressures, setehrDatabloodPressures] = useState([]);
  const [ehrDemographics, setehrDemographics] = useState({
    weight:0, temperature:0, heartRate:0, bloodPressure:0
  });

  useEffect(() => {
    if (!patientId) {
      console.error("No patient ID provided");
      return;
    }

    fetch(`https://backend-3alegny-hpgag2fkg4hrb9c0.canadacentral-01.azurewebsites.net/Hospital/get-ehr/${patientId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setEhrData(data.ehr);
          setehrDataWeights(data.ehr.weightStatics);
          setehrDatatemperatures(data.ehr.temperatureStatics);
          setehrDatatheartRates(data.ehr.heartRateStatics);
          setehrDatabloodPressures(data.ehr.bloodPressureStatics);
          setehrDemographics({ weight:data.ehr.weight, temperature:data.ehr.temperature, heartRate:data.ehr.heartRate, bloodPressure:data.ehr.bloodPressure });
          
          console.log(data.ehr.weightStatics)
        } else {
          console.error("Invalid Patient ID:", data.message);
        }

        const extractedBloodPressures = data.ehr.bloodPressureStatics.map(item => {
          const match = item.match(/\d+/); // Extract digits from the string
          return match ? parseInt(match[0], 10) : 0; // Convert to number, default to 0 if no match
        });
        setehrDatabloodPressures(extractedBloodPressures);
        
        // Extract other statistics similarly if needed
        
        console.log(extractedBloodPressures); // Log for debugging
      })
      .catch((error) => console.error("Error fetching EHR data:", error));
  }, [patientId]);

  if (!ehrData) {
    return <p>Loading...</p>; // Display a loading state while fetching data
  }

  
  console.log("EHR Data:", ehrData);

  const tabs = [
    { id: 'patientDemographics', label: 'Patient Demographics' },
    { id: 'clinicalData', label: 'Clinical Data' },
    { id: 'medicalImaging', label: 'Medical Imaging' },
    { id: 'vitalSigns', label: 'Vitals & Measurements' },
    { id: 'Procedures', label: 'Procedure History' },
    { id: 'careCoordination', label: 'Care Coordination' },
    { id: 'billing', label: 'Billing & Administration' },
  ];

  

  const bloodPressureChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Blood Pressure (mmHg)',
        data: ehrDatabloodPressures,
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
    ],
  };

  const heartRateChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Heart Rate (bpm)',
        data: ehrDatatheartRates,
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
      },
    ],
  };

  const temperatureChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Temperature (°F)',
        data: ehrDatatemperatures,
        borderColor: 'rgba(255, 159, 64, 1)',
        fill: false,
      },
    ],
  };

  const weightChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Weight (kg)',
        data: ehrDataWeights,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  
  };

  // const immunizationChartData = {
  //   labels: ['Vaccinated', 'Not Vaccinated'],
  //   datasets: [
  //     {
  //       data: immunizations,
  //       backgroundColor: ['#36A2EB', '#FF6384'],
  //       hoverBackgroundColor: ['#36A2EB', '#FF6384'],
  //     },
  //   ],
  // };

  // Medication Status Pie Chart
  // const medicationStatusData = {
  //   labels: ['Ongoing', 'Discontinued'],
  //   datasets: [
  //     {
  //       data: medications.reduce((acc, medication) => {
  //         if (medication.status === 'Ongoing') acc[0]++;
  //         else acc[1]++;
  //         return acc;
  //       }, [0, 0]),
  //       backgroundColor: ['#FFCD56', '#FF6384'],
  //       hoverBackgroundColor: ['#FFCD56', '#FF6384'],
  //     },
  //   ],
  // };

  // Radar Chart for Demographics (Age, Weight, Heart Rate, etc.)
  const demographicsChartData = {
    labels: [ 'Weight', 'Heart Rate', 'Blood Pressure', 'Temperature'],
    datasets: [
      {
        label: 'Demographics Overview',
        data: [ehrDemographics.weight, ehrDemographics.heartRate, ehrDemographics.bloodPressure, ehrDemographics.temperature ], // Example values for Age, Weight (kg), HR, BP (mmHg), Temperature (°F)
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  
  return (
    <div className={styles.EHRContainer}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.tabContent}>
        {/* Patient Demographics */}
        {activeTab === 'patientDemographics' && (
          <div className={styles.tabSection}>
            <h2>Patient Demographics</h2>
            <div className={styles.ehrCardsGrid}>
              <div className={styles.card}><p><strong>Name:</strong> {ehrData?.patientName}</p></div>
              <div className={styles.card}><p><strong>Date of Birth:</strong> {ehrData?.birthdate}</p></div>
              <div className={styles.card}><p><strong>Gender:</strong> {ehrData?.patientGender}</p></div>
              <div className={styles.card}><p><strong>Address:</strong> {ehrData?.address}</p></div>
              <div className={styles.card}><p><strong>Phone:</strong> {ehrData?.phone}</p></div>
              <div className={styles.card}><p><strong>Email:</strong> {ehrData?.email}</p></div>
              </div>
              <div className={styles.chartContainer}>

<Radar data={demographicsChartData} />
</div>
            </div>
         
        )}

        {/* Clinical Data */}
        {activeTab === 'clinicalData' && (
          <div className={styles.tabSection}>
            <h2>Clinical Data</h2>
            <p><strong>Diagnoses:</strong> {ehrData?.diagnoses.join(', ')}</p>
            <p><strong>Allergies:</strong> {ehrData?.allergies.join(', ')}</p>
            <p><strong>Medications:</strong> {ehrData?.medications.join(', ')}</p>
            <p><strong>Lab Results:</strong> {ehrData?.labResults.join(', ')}</p>
            <p><strong>Immunizations:</strong> {ehrData?.immunizations.join(', ')}</p>
            <p><strong>Treatment Plan:</strong> {ehrData?.treatmentPlans}</p>
          </div>
        )}

        {/* Medical Imaging */}
        {activeTab === "medicalImaging" && (
          <div className={styles.tabSection}>
            <h2>Medical Imaging</h2>
            <div className={styles.radiologyCardsGrid}>
              {ehrData.imagingLinks.map((link, index) => (
                <div key={index} className={styles.card}>
                  <img src={link} alt={`Imaging ${index + 1}`} className={styles.radiologyImage} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vitals & Measurements */}
        {activeTab === 'vitalSigns' && (
          <div className={styles.tabSection}>
            <h2>Vitals & Measurements</h2>
            <p><strong> Current Temperature:</strong> {ehrData?.temperature}</p>
            <div className={styles.chartContainer}>
              <Line data={temperatureChartData} options={{ maintainAspectRatio: false }} />
            </div>
            <p><strong> Current Weight:</strong> {ehrData?.weight}</p>
            <div className={styles.chartContainer}>
              <Line data={weightChartData} options={{ maintainAspectRatio: false }} />
            </div>
            <p><strong>Current Blood Pressure:</strong> {ehrData?.bloodPressure}</p>
            <div className={styles.chartContainer}>
              <Line data={bloodPressureChartData} options={{ maintainAspectRatio: false }} />
            </div>
            <p><strong>Current Heart Rate:</strong> {ehrData?.heartRate}</p>
            <div className={styles.chartContainer}>
              <Line data={heartRateChartData} options={{ maintainAspectRatio: false }} />
            </div>
          
          </div>
        )}

        {/* Procedure History */}
        {activeTab === 'Procedures' && (
          <div className={styles.tabSection}>
            <h2>Procedure History</h2>
            <ul>
              {ehrData?.procedureHistory.map((procedure, index) => (
                <li key={index}>{procedure}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Care Coordination */}
        {activeTab === 'careCoordination' && (
          <div className={styles.tabSection}>
            <h2>Care Coordination</h2>
            <p>{ehrData?.careCoordinationInfo}</p>
          </div>
        )}

        {/* Billing & Administration */}
        {activeTab === 'billing' && (
          <div className={styles.tabSection}>
            <h2>Billing & Administration</h2>
            <ul>
              {ehrData?.billing.map((billing, index) => (
                <li key={index}>{billing}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EHRPage;
