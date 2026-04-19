import React, { useState } from "react";
import axios from "axios";

function AddPatientForm() {
  const [patient, setPatient] = useState({
    patient_id: "",
    patient_name: "",
    date_of_birth: "",
    date_of_testing: "",
    patient_history: "",
    drug_history: "",
    variants_tested: "",
    UGT1A1: "",
    CYP2D6: "",
    ACE: "",
    CYP3A5: ""
  });

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    await axios.post(
      "http://127.0.0.1:8000/api/add-patient/",
      patient
    );

    alert("Patient added successfully");
  };

  return (
    <div className="card">
      <h2>Add Patient Record</h2>

      {Object.keys(patient).map((field) => (
        <div key={field} style={{ marginBottom: "10px" }}>
          {/* Optional: A tiny label helps because standard date inputs don't show placeholders well */}
          {field.includes("date") && <label style={{ fontSize: "12px", color: "gray" }}>{field}</label>}
          
          <input
            // FIX: If the field name has 'date' in it, render a calendar picker! Otherwise, text.
            type={field.includes("date") ? "date" : "text"}
            name={field}
            placeholder={field}
            // FIX: It's best practice to bind the value back to the state in React
            value={patient[field]} 
            onChange={handleChange}
          />
        </div>
      ))}

      <button onClick={handleSubmit}>
        Save Patient
      </button>
    </div>
  );
}

export default AddPatientForm;