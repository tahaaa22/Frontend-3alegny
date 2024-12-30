import React, { useState, useEffect } from "react";
import styles from "../styles/EditProfile.module.css";

function EditPHR() {
  const [userInfo, setUserInfo] = useState({
    allergies: "",
    chronicIllness: "",
    diagnosis: "",
    medication: "",
    familyHistory: "",
    medicalProcedures: "",
    prescriptionHistory: "",
    image: "https://via.placeholder.com/150",
  });

  const [labResults, setLabResults] = useState([]);
  const [radiologyResults, setRadiologyResults] = useState([]);

  useEffect(() => {
    const fetchEHRData = async () => {
      const savedEHR = {
        allergies: "Pollen, Peanuts",
        chronicIllness: "Hypertension",
        diagnosis: "Mild Asthma",
        medication: "Inhaler, Aspirin",
        familyHistory: "Diabetes, Heart Disease",
        medicalProcedures: "Appendectomy",
        prescriptionHistory: "Ibuprofen, Metformin",
        image: "https://via.placeholder.com/150",
      };
      setUserInfo(savedEHR);
    };

    fetchEHRData();
  }, []);

  const handleLabResultsChange = (e) => {
    setLabResults(Array.from(e.target.files));
  };

  const handleRadiologyResultsChange = (e) => {
    setRadiologyResults(Array.from(e.target.files));
  };

  return (
    <div className={styles.editProfileContainer}>
      <div className={`${styles.editProfileCard} ${styles.fancyCard}`}>
        <h1>Edit PHR</h1>

        <form className={styles.editProfileForm}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="allergies">Allergies</label>
              <input
                type="text"
                id="allergies"
                name="allergies"
                defaultValue={userInfo.allergies}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="chronicIllness">Chronic Illness</label>
              <input
                type="text"
                id="chronicIllness"
                name="chronicIllness"
                defaultValue={userInfo.chronicIllness}
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
                defaultValue={userInfo.diagnosis}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="medication">Medication</label>
              <input
                type="text"
                id="medication"
                name="medication"
                defaultValue={userInfo.medication}
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
                defaultValue={userInfo.familyHistory}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="medicalProcedures">Medical Procedures</label>
              <input
                type="text"
                id="medicalProcedures"
                name="medicalProcedures"
                defaultValue={userInfo.medicalProcedures}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="prescriptionHistory">Prescription History</label>
            <input
              type="text"
              id="prescriptionHistory"
              name="prescriptionHistory"
              defaultValue={userInfo.prescriptionHistory}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="labResults">Lab Results</label>
            <input
              type="file"
              id="labResults"
              name="labResults"
              multiple
              onChange={handleLabResultsChange}
            />
            <p>
              {labResults.length
                ? `${labResults.length} file(s) selected`
                : "No files selected"}
            </p>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="radiologyResults">Radiology Results</label>
            <input
              type="file"
              id="radiologyResults"
              name="radiologyResults"
              multiple
              onChange={handleRadiologyResultsChange}
            />
            <p>
              {radiologyResults.length
                ? `${radiologyResults.length} file(s) selected`
                : "No files selected"}
            </p>
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
