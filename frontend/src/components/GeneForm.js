import React, { useState } from "react";
import axios from "axios";

const presets = {
  "Low Risk Patient": {
    UGT1A1: "normal",
    CYP2D6: "normal",
    ACE: "normal",
    CYP3A5: "expresser"
  },
  "Moderate Risk Patient": {
    UGT1A1: "reduced",
    CYP2D6: "normal",
    ACE: "variant",
    CYP3A5: "expresser"
  },
  "High Risk Patient": {
    UGT1A1: "reduced",
    CYP2D6: "poor",
    ACE: "variant",
    CYP3A5: "non-expresser"
  }
};

function GeneForm({ setResult }) {
  const [genes, setGenes] = useState({
    UGT1A1: "",
    CYP2D6: "",
    ACE: "",
    CYP3A5: ""
  });

const [selectedProfile, setSelectedProfile] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setGenes({ ...genes, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/analyze/",
        { genes }
      );
      setResult(res.data);
    } catch (err) {
      alert("Error connecting to API");
    }

    setLoading(false);
  };

const handlePreset = (e) => {
  const profile = e.target.value;
  setSelectedProfile(profile);

  if (presets[profile]) {
    setGenes(presets[profile]);
  }
};
  
  // ... your state and functions above stay exactly the same ...

  return (
    <div className="card">
      <h2>Patient Genetic Profile</h2>

      <form onSubmit={handleSubmit}>
        <label>UGT1A1</label>
        <select name="UGT1A1" value={genes.UGT1A1} onChange={handleChange}>
          <option value="">Select</option>
          <option value="normal">Normal</option>
          <option value="reduced">Reduced</option>
        </select>

        <label>CYP2D6</label>
        <select name="CYP2D6" value={genes.CYP2D6} onChange={handleChange}>
          <option value="">Select</option>
          <option value="normal">Normal</option>
          <option value="poor">Poor Metabolizer</option>
        </select>

        <label>ACE</label>
        <select name="ACE" value={genes.ACE} onChange={handleChange}>
          <option value="">Select</option>
          <option value="normal">Normal</option>
          <option value="variant">Variant</option>
        </select>

        <label>CYP3A5</label>
        <select name="CYP3A5" value={genes.CYP3A5} onChange={handleChange}>
          <option value="">Select</option>
          <option value="expresser">Expresser</option>
          <option value="non-expresser">Non-expresser</option>
        </select>

        <button type="submit">
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>
    </div>
  );
}

export default GeneForm;