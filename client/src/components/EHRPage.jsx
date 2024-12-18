import React, { useState } from 'react';
import styles from '../styles/EHRPage.module.css';
import { Line, Doughnut, Bar, Radar } from 'react-chartjs-2';

const EHRPage = () => {
  const [activeTab, setActiveTab] = useState('patientDemographics');

  // Mock Data
  const patientDemographics = {
    name: 'John Doe',
    dateOfBirth: '02/15/1985',
    gender: 'Male',
    address: '1234 Elm Street, Springfield, IL',
    phone: '+1 555-123-4567',
    email: 'johndoe@example.com',
  };

  const medicalHistory = {
    chronicConditions: ['Hypertension', 'Asthma'],
    allergies: ['Penicillin'],
    medications: ['Lisinopril', 'Albuterol'],
    familyHistory: 'Heart Disease, Diabetes',
    surgeries: ['Appendectomy (2010)', 'Knee Surgery (2015)'],
    vaccinations: ['Hepatitis B', 'Flu'],
  };

  const vitalSigns = {
    bloodPressure: [120, 125, 130, 128, 122],
    heartRate: [72, 75, 78, 74, 70],
    temperature: [98.6, 98.4, 98.7, 98.8, 98.5],
    weight: [75, 76, 77, 75, 74],
  };

  const labResults = [
    { testName: 'Cholesterol', result: '200 mg/dL' },
    { testName: 'Glucose', result: '90 mg/dL' },
    { testName: 'Iron', result: '50 mcg/dL' },
    { testName: 'Calcium', result: '45 mg/dL' },
  ];

  const immunizations = [80, 20]; // 80% vaccinated, 20% not vaccinated
  const Vaccines=[
    { vaccine: "Covid-19 Vaccine", date: "2021-03-15" },
    { vaccine: "Flu Shot", date: "2023-09-20" },
  ];

  const medications = [
    { name: 'Lisinopril', dosage: '10mg', status: 'Ongoing' },
    { name: 'Albuterol', dosage: '2 puffs', status: 'Ongoing' },
    { name: 'Aspirin', dosage: '81mg', status: 'Discontinued' },
  ];

  const radiologyImages = [
    { id: 1, src: 'https://via.placeholder.com/200?text=Chest+X-Ray', description: 'Chest X-Ray' },
    { id: 2, src: 'https://via.placeholder.com/200?text=MRI+Brain', description: 'MRI Brain' },
    { id: 3, src: 'https://via.placeholder.com/200?text=CT+Abdomen', description: 'CT Abdomen' },
  ];

  const carePlans = [
    { title: 'Hypertension Management', description: 'Lifestyle changes, medication adherence, blood pressure monitoring.' },
    { title: 'Asthma Management', description: 'Avoid triggers, use inhaler regularly, monitor lung function.' },
  ];

  const billingData = [
    { service: 'Doctor Consultation', amount: '$150', date: '12/01/2024' },
    { service: 'X-Ray', amount: '$100', date: '12/05/2024' },
    { service: 'Lab Tests', amount: '$75', date: '12/08/2024' },
  ];


  // Chart Data for Vital Signs
  const vitalSignsChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Blood Pressure (mmHg)',
        data: vitalSigns.bloodPressure,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
      {
        label: 'Heart Rate (bpm)',
        data: vitalSigns.heartRate,
        borderColor: 'rgba(153, 102, 255, 1)',
        fill: false,
      },
    ],
  };

  const bloodPressureChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Blood Pressure (mmHg)',
        data: vitalSigns.bloodPressure,
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
        data: vitalSigns.heartRate,
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
        data: vitalSigns.temperature,
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
        data: vitalSigns.weight,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  
  };

  const immunizationChartData = {
    labels: ['Vaccinated', 'Not Vaccinated'],
    datasets: [
      {
        data: immunizations,
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  // Medication Status Pie Chart
  const medicationStatusData = {
    labels: ['Ongoing', 'Discontinued'],
    datasets: [
      {
        data: medications.reduce((acc, medication) => {
          if (medication.status === 'Ongoing') acc[0]++;
          else acc[1]++;
          return acc;
        }, [0, 0]),
        backgroundColor: ['#FFCD56', '#FF6384'],
        hoverBackgroundColor: ['#FFCD56', '#FF6384'],
      },
    ],
  };

  // Radar Chart for Demographics (Age, Weight, Heart Rate, etc.)
  const demographicsChartData = {
    labels: ['Age', 'Weight', 'Heart Rate', 'Blood Pressure', 'Temperature'],
    datasets: [
      {
        label: 'Demographics Overview',
        data: [39, 75, 72, 120, 98.6], // Example values for Age, Weight (kg), HR, BP (mmHg), Temperature (°F)
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Care Plan Progress (Radar Chart)
  const carePlansChartData = {
    labels: ['Blood Pressure', 'Medications', 'Lifestyle Changes', 'Exercise', 'Dietary Changes'],
    datasets: [
      {
        label: 'Care Plan Progress',
        data: [70, 80, 60, 90, 50], // Example data showing percentage progress
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Tab navigation
  const tabs = [
    { id: 'patientDemographics', label: 'Patient Demographics' },
    { id: 'medicalHistory', label: 'Medical History' },
    { id: 'vitalSigns', label: 'Vitals & Measurements' },
    { id: 'labResults', label: 'Laboratory Test Results' },
    { id: 'medications', label: 'Medications' },
    { id: 'immunizations', label: 'Immunizations' },
    { id: 'carePlans', label: 'Care Plans' },
    { id: 'billing', label: 'Billing & Administration' },
  ];

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
            <p><strong>Name:</strong> {patientDemographics.name}</p>
            <p><strong>Date of Birth:</strong> {patientDemographics.dateOfBirth}</p>
            <p><strong>Gender:</strong> {patientDemographics.gender}</p>
            <p><strong>Address:</strong> {patientDemographics.address}</p>
            <p><strong>Phone:</strong> {patientDemographics.phone}</p>
            <p><strong>Email:</strong> {patientDemographics.email}</p>
            <div className={styles.chartContainer}>

            <Radar data={demographicsChartData} />
            </div>
          </div>
        )}

        {/* Medical History */}
        {activeTab === 'medicalHistory' && (
          <div className={styles.tabSection}>
            <h2>Medical History</h2>
            <p><strong>Chronic Conditions:</strong> {medicalHistory.chronicConditions.join(', ')}</p>
            <p><strong>Allergies:</strong> {medicalHistory.allergies.join(', ')}</p>
            <p><strong>Medications:</strong> {medicalHistory.medications.join(', ')}</p>
            <p><strong>Family History:</strong> {medicalHistory.familyHistory}</p>
            <p><strong>Surgical History:</strong> {medicalHistory.surgeries.join(', ')}</p>
            <p><strong>Vaccinations:</strong> {medicalHistory.vaccinations.join(', ')}</p>
          </div>
        )}

        {/* Vitals & Measurements */}
        {activeTab === 'vitalSigns' && (
          <div className={styles.tabSection}>
            <h2>Vitals & Measurements</h2>
            <div className={styles.chartContainer}>
              <Line data={bloodPressureChartData} options={{ maintainAspectRatio: false }} />
            </div>
            <div className={styles.chartContainer}>
              <Line data={heartRateChartData} options={{ maintainAspectRatio: false }} />
            </div>
            <div className={styles.chartContainer}>
              <Line data={temperatureChartData} options={{ maintainAspectRatio: false }} />
            </div>
            <div className={styles.chartContainer}>
              <Line data={weightChartData} options={{ maintainAspectRatio: false }} />
            </div>
            <div className={styles.chartContainer}>
              <Line data={vitalSignsChartData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        )}

        {/* Laboratory Test Results */}
        {activeTab === 'labResults' && (
          <div className={styles.tabSection}>
            <h2>Laboratory Test Results</h2>
            <ul>
              {labResults.map((result, index) => (
                <li key={index}><strong>{result.testName}:</strong> {result.result}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Medications */}
        {activeTab === 'medications' && (
          <div className={styles.tabSection}>
            <h2>Medications</h2>
            <ul>
              {medications.map((medication, index) => (
                <li key={index}>
                  <strong>{medication.name}</strong> ({medication.dosage}) - Status: {medication.status}
                </li>
              ))}
            </ul>
            <div className={styles.chartContainer}>

            <Doughnut data={medicationStatusData} />
            </div>
          </div>
        )}

        {/* Immunizations */}
        {activeTab === 'immunizations' && (
          <div className={styles.tabSection}>
            <h2>Immunization History</h2>
            {Vaccines.map((shot, index) => (
              <p key={index}>
                <strong>{shot.vaccine}:</strong> {shot.date}
              </p>
            ))}
            <p><strong>Vaccination Status:</strong> {immunizations[0]}% Vaccinated, {immunizations[1]}% Not Vaccinated</p>
            <div className={styles.chartContainer}>

            <Doughnut data={immunizationChartData} />
            </div>
          </div>
        )}

        {/* Care Plans */}
        {activeTab === 'carePlans' && (
          <div className={styles.tabSection}>
            <h2>Care Plans</h2>
            <ul>
              {carePlans.map((plan, index) => (
                <li key={index}><strong>{plan.title}:</strong> {plan.description}</li>
              ))}
            </ul>
            <div className={styles.chartContainer}>

            <Radar data={carePlansChartData} />
            </div>
          </div>
        )}

        {/* Billing & Administration */}
        {activeTab === 'billing' && (
          <div className={styles.tabSection}>
            <h2>Billing & Administration</h2>
            <ul>
              {billingData.map((billing, index) => (
                <li key={index}>
                  <strong>{billing.service}</strong> - {billing.amount} on {billing.date}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EHRPage;
