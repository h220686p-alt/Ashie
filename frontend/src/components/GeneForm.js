// src/components/GeneForm.js
import React, { useState } from "react";
import axios from "axios";
import ResultDashboard from "./ResultDashboard";

export default function GeneForm() {
  const [genes, setGenes] = useState({ UGT1A1: "", CYP2D6: "" });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setGenes({ ...genes, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/analyze/",
        { genes },
        { headers: { "Content-Type": "application/json" } }
      );
      setResult(response.data);
    } catch (error) {
      console.error("API Error:", error);
      alert("Failed to fetch analysis");
    }
  };

  return (
    <div>
      <h2>Pharmacogenetic Analysis</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>UGT1A1: </label>
          <input
            name="UGT1A1"
            value={genes.UGT1A1}
            onChange={handleChange}
            placeholder="normal / reduced / poor"
            required
          />
        </div>
        <div>
          <label>CYP2D6: </label>
          <input
            name="CYP2D6"
            value={genes.CYP2D6}
            onChange={handleChange}
            placeholder="normal / reduced / poor"
            required
          />
        </div>
        <button type="submit">Analyze</button>
      </form>

      {result && <ResultDashboard result={result} />}
    </div>
  );
}