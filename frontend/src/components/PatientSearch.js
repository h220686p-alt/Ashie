import React, { useState } from "react";
import axios from "axios";

// 1. Accept the prop we just passed down from App.js
function PatientSearch({ setCurrentPatient }) {
  const [query, setQuery] = useState("");
  const [patients, setPatients] = useState([]);

  const handleSearch = async () => {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/search-patient/?q=${query}`
    );
    setPatients(res.data);
  };

  return (
    <div className="card">
      <input
        placeholder="Search patient name or ID"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {patients.map((p) => (
        <div key={p.patient_id} style={{ borderBottom: "1px solid #eee", paddingBottom: "10px", marginBottom: "10px" }}>
          <h4>{p.patient_name}</h4>
          <p>ID: {p.patient_id}</p>
          <p>DOB: {p.date_of_birth}</p>
          <p>Testing: {p.date_of_testing}</p>
          <p>History: {p.patient_history}</p>
          <p>Drugs: {p.drug_history}</p>
          
          {/* 2. Add this button to select the patient! */}
          <button 
            style={{ backgroundColor: "#28a745" }} 
            onClick={() => setCurrentPatient(p)}
          >
            Select for Analysis
          </button>
        </div>
      ))}
    </div>
  );
}

export default PatientSearch;