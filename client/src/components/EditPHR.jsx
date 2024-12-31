import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import axios from "axios";
import styles from "../styles/EditProfile.module.css";

function EditPHR() {
    const location = useLocation();
    const navigate = useNavigate();
    const patientId = location.state?.patientId; // Ensure safe access
    console.log("Patient ID:", patientId);

    const [userInfo, setUserInfo] = useState({
        allergies: "",
        chronicIllness: "",
        diagnosis: "",
        medication: "",
        familyHistory: "",
        medicalProcedures: "",
        prescriptionHistory: "",
        imagingResults: [],
        labResultsURL: [],
        weight: "",
        height: "",
        bmi: "",
    });

    const [labResults, setLabResults] = useState([]);
    const [radiologyResults, setRadiologyResults] = useState([]);

    // Fetch existing data for the patient
    useEffect(() => {
        if (!patientId) return;

        const fetchPHRData = async () => {
            try {
                const response = await axios.get(
                    `https://backend-3alegny-hpgag2fkg4hrb9c0.canadacentral-01.azurewebsites.net/patient/getphr/${patientId}`
                );
                setUserInfo(response.data.data);
            } catch (error) {
                console.error("Failed to fetch PHR data:", error);
            }
        };

        fetchPHRData();
    }, [patientId]);

    // Handle lab results upload
    const handleLabResultsChange = (e) => {
        const files = Array.from(e.target.files).map(file => URL.createObjectURL(file));
        setLabResults(files);
        setUserInfo(prev => ({ ...prev, labResultsURL: files }));
    };

    // Handle radiology results upload
    const handleRadiologyResultsChange = (e) => {
        const files = Array.from(e.target.files).map(file => URL.createObjectURL(file));
        setRadiologyResults(files);
        setUserInfo(prev => ({ ...prev, imagingResults: files }));
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSaveChanges = async (e) => {
      e.preventDefault();
  
      if (!patientId) {
          console.error("Patient ID is missing!");
          return;
      }
  
      // Validate and prepare the payload
      const payload = {
          allergies: userInfo.allergies || "string",
          chronicIllness: userInfo.chronicIllness || "string",
          diagnosis: userInfo.diagnosis || "string",
          medication: userInfo.medication || "string",
          familyHistory: userInfo.familyHistory || "string",
          imagingResults: Array.isArray(userInfo.imagingResults) && userInfo.imagingResults.length > 0
              ? userInfo.imagingResults
              : [
                    "https://th.bing.com/th/id/OIP.Ev0kB0bztmyHOPTEMysI-wHaFf?rs=1&pid=ImgDetMain",
                    "https://radiologykey.com/wp-content/uploads/2016/03/c00027_f027-001a-9780702042959.jpg",
                ],
          labResultsURL: Array.isArray(userInfo.labResultsURL) && userInfo.labResultsURL.length > 0
              ? userInfo.labResultsURL
              : [
                    "https://images.drlogy.com/assets/uploads/lab/pdf/RBS-Random-Blood-Sugar-test-report-format-example-sample-template-Drlogy-lab-report.pdf",
                ],
          medicalProcedures: userInfo.medicalProcedures || "string",
          prescriptionHistory: userInfo.prescriptionHistory || "string",
          weight: userInfo.weight && !isNaN(userInfo.weight) ? parseFloat(userInfo.weight) : 80,
          height: userInfo.height && !isNaN(userInfo.height) ? parseFloat(userInfo.height) : 155,
          bmi: userInfo.bmi && !isNaN(userInfo.bmi) ? parseFloat(userInfo.bmi) : 100,
      };
  
      // Log the payload to verify structure
      console.log("Prepared Payload:", payload);
  
      try {
          const response = await axios.put(
              `https://backend-3alegny-hpgag2fkg4hrb9c0.canadacentral-01.azurewebsites.net/patient/updatephr/${patientId}`,
              payload,
              {
                  headers: {
                      "Content-Type": "application/json",
                  },
              }
          );
          console.log("PHR updated successfully:", response.data);
          navigate("/MyProfile");
      } catch (error) {
          console.error("Error updating PHR:", error.response?.data || error.message);
      }
  };
  
  

    return (
        <div className={styles.editProfileContainer}>
            <div className={`${styles.editProfileCard} ${styles.fancyCard}`}>
                <h1>Edit PHR</h1>

                <form className={styles.editProfileForm} onSubmit={handleSaveChanges}>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="allergies">Allergies</label>
                            <input
                                type="text"
                                id="allergies"
                                name="allergies"
                                value={userInfo.allergies}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="chronicIllness">Chronic Illness</label>
                            <input
                                type="text"
                                id="chronicIllness"
                                name="chronicIllness"
                                value={userInfo.chronicIllness}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="diagnosis">Diagnosis</label>
                            <input
                                type="text"
                                id="diagnosis"
                                name="diagnosis"
                                value={userInfo.diagnosis}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="medication">Medication</label>
                            <input
                                type="text"
                                id="medication"
                                name="medication"
                                value={userInfo.medication}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="familyHistory">Family History</label>
                            <input
                                type="text"
                                id="familyHistory"
                                name="familyHistory"
                                value={userInfo.familyHistory}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="medicalProcedures">Medical Procedures</label>
                            <input
                                type="text"
                                id="medicalProcedures"
                                name="medicalProcedures"
                                value={userInfo.medicalProcedures}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="prescriptionHistory">Prescription History</label>
                        <input
                            type="text"
                            id="prescriptionHistory"
                            name="prescriptionHistory"
                            value={userInfo.prescriptionHistory}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="weight">Weight (kg)</label>
                            <input
                                type="number"
                                id="weight"
                                name="weight"
                                value={userInfo.weight}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="height">Height (cm)</label>
                            <input
                                type="number"
                                id="height"
                                name="height"
                                value={userInfo.height}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="bmi">BMI</label>
                            <input
                                type="number"
                                id="bmi"
                                name="bmi"
                                value={userInfo.bmi}
                                onChange={handleChange}
                            />
                        </div>
                    </div>


                    <div className={styles.formGroup}>
                      <label htmlFor="labResultsURL">Lab Results URLs</label>
                      <textarea
                          id="labResultsURL"
                          name="labResultsURL"
                          placeholder="Enter lab results URLs, separated by commas"
                          value={userInfo.labResultsURL.join(", ")}
                          onChange={(e) =>
                              setUserInfo(prev => ({
                                  ...prev,
                                  labResultsURL: e.target.value.split(",").map(url => url.trim()),
                              }))
                          }
                      />
                      <p>{userInfo.labResultsURL.length ? `${userInfo.labResultsURL.length} URL(s) entered` : "No URLs entered"}</p>
                  </div>

                  <div className={styles.formGroup}>
                      <label htmlFor="imagingResults">Radiology Results URLs</label>
                      <textarea
                          id="imagingResults"
                          name="imagingResults"
                          placeholder="Enter radiology results URLs, separated by commas"
                          value={userInfo.imagingResults.join(", ")}
                          onChange={(e) =>
                              setUserInfo(prev => ({
                                  ...prev,
                                  imagingResults: e.target.value.split(",").map(url => url.trim()),
                              }))
                          }
                      />
                      <p>{userInfo.imagingResults.length ? `${userInfo.imagingResults.length} URL(s) entered` : "No URLs entered"}</p>
                  </div>


                    <button type="submit" className={styles.saveBtn}>
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditPHR;
