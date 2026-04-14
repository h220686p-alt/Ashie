// src/components/ResultDashboard.js
import React from "react";

export default function ResultDashboard({ result }) {
  return (
    <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "15px" }}>
      <h3>Analysis Result</h3>
      <p><strong>Risk Level:</strong> {result.risk_level}</p>

      <div>
        <strong>Recommendations:</strong>
        <ul>
          {result.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
        </ul>
      </div>

      <div>
        <strong>Warnings:</strong>
        <ul>
          {result.warnings.map((warn, i) => <li key={i}>{warn}</li>)}
        </ul>
      </div>

      <div>
        <strong>Explanations:</strong>
        <ul>
          {result.explanations.map((exp, i) => <li key={i}>{exp}</li>)}
        </ul>
      </div>
    </div>
  );
}