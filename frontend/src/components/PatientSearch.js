import React, { useState } from "react";
import axios from "axios";

function PatientSearch({ setGenes }) {
  const [patientId, setPatientId] = useState("");

  const searchPatient = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/patient/${patientId}/`
      );

      setGenes(res.data.genes);

    } catch {
      alert("Patient not found");
    }
  };

  return (
    <div className="card">
      <h3>Search Mock Patient</h3>

      <input
        type="text"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        placeholder="Enter Patient ID"
      />

      <button onClick={searchPatient}>
        Search
      </button>
    </div>
  );
}

export default PatientSearch;