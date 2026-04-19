import React from "react";
import { jsPDF } from "jspdf";

const drugTable = {
  "Avoid beta-blockers": {
    drug: "Beta-blockers",
    action: "Avoid",
    reason: "Poor CYP2D6 metabolism increases adverse effects"
  },
  "Use ACE inhibitors": {
    drug: "ACE inhibitors",
    action: "Recommended",
    reason: "ACE gene variant improves treatment response"
  },
  "Consider dose adjustment for certain antihypertensives": {
    drug: "Antihypertensives",
    action: "Adjust dose",
    reason: "CYP3A5 affects drug metabolism"
  }
};

function ResultDashboard({ result }) {

  const getColor = () => {
    if (result.risk_level === "high") return "#dc2626";
    if (result.risk_level === "medium") return "#f59e0b";
    return "#16a34a";
  };

  const getWidth = () => {
    const score = result.risk_score || 0;
    const maxScore = 5;
    return `${(score / maxScore) * 100}%`;
  };

  return (
    <div className="card">
      <h2>Analysis Results</h2>

      <p>
        <strong>Risk Level: </strong>
        <span style={{ color: getColor(), fontWeight: "bold" }}>
          {result.risk_level.toUpperCase()}
        </span>
      </p>

      <p>
        <strong>Risk Score:</strong> {result.risk_score}
      </p>

      {/* Risk Bar */}
      <div className="risk-bar-container">
        <div
          className="risk-bar-fill"
          style={{
            width: getWidth(),
            background: getColor()
          }}
        ></div>
      </div>

      <hr />

 <h3>Drug Recommendations</h3>

<table>
  <thead>
    <tr>
      <th>Drug Class</th>
      <th>Recommendation</th>
      <th>Reason</th>
    </tr>
  </thead>
  <tbody>
    {result.recommendations.map((rec, i) => {
      const row = drugTable[rec];
      if (!row) return null;

      return (
        <tr key={i}>
          <td>{row.drug}</td>
          <td>{row.action}</td>
          <td>{row.reason}</td>
        </tr>
      );
    })}
  </tbody>
</table>

      <h3>Warnings</h3>
      <ul>
        {result.warnings.map((warn, i) => (
          <li key={i}>{warn}</li>
        ))}
      </ul>

      <h3>Clinical Explanation</h3>
      <ul>
        {result.explanations.map((exp, i) => (
          <li key={i}>{exp}</li>
        ))}
      </ul>

    </div>
  );
}

export default ResultDashboard;