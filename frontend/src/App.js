import React, { useState } from "react";
import GeneForm from "./components/GeneForm";
import ResultDashboard from "./components/ResultDashboard";
import "./styles.css";
import logo from "./assets/logo.png";
import PatientSearch from "./components/PatientSearch";
import AddPatientForm from "./components/AddPatientForm";
import { jsPDF } from "jspdf";

function App() {
  const [result, setResult] = useState(null);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const handleExport = () => {
      if (!result) {
        alert("No results to export yet! Please run an analysis first.");
        return;
      }
  
      const doc = new jsPDF();
  
      // Title
      doc.setFontSize(18);
      doc.setTextColor(0, 51, 102); // Dark blue color
      doc.text("DTG-HTN Panel - Patient Report", 14, 22);
  
      // Patient Info
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0); 
      const name = currentPatient ? currentPatient.patient_name : "Unknown";
      const id = currentPatient ? currentPatient.patient_id : "Unknown";
      
      doc.text(`Patient Name: ${name}`, 14, 32);
      doc.text(`Patient ID: ${id}`, 14, 38);
  
      // Risk Level and Score
      doc.setFontSize(14);
      doc.text(`Risk Level: ${result.risk_level.toUpperCase()}`, 14, 50);
      doc.text(`Risk Score: ${result.risk_score}`, 14, 58);
  
      let yPos = 70; 
  
      const addSection = (title, items) => {
        if (items && items.length > 0) {
          doc.setFontSize(12);
          doc.setFont("helvetica", "bold");
          doc.text(title, 14, yPos);
          yPos += 7;
  
          doc.setFont("helvetica", "normal");
          items.forEach(item => {
            const lines = doc.splitTextToSize(`• ${item}`, 180);
            doc.text(lines, 14, yPos);
            yPos += (7 * lines.length);
          });
          yPos += 5; 
        }
      };
  
      addSection("Recommendations:", result.recommendations);
      addSection("Warnings:", result.warnings);
      addSection("Explanations:", result.explanations);
  
      // Dynamic filename based on Patient ID
      doc.save(`PGx_Report_${id}.pdf`);
    };

  return (
    <div className="app-layout">
      {/* Sidebar */}
     <aside className="sidebar">
  <div className="sidebar-top">
    <img src={logo} alt="logo" className="sidebar-logo" />
    <h2>DTG-HTN Panel</h2>
  </div>

  <nav>
    <ul>
      <li
        className={activeMenu === "add-patient" ? "active" : ""}
        onClick={() => setActiveMenu("add-patient")}
      >
        Add Patient
      </li>

      <li
        className={activeMenu === "dashboard" ? "active" : ""}
        onClick={() => setActiveMenu("dashboard")}
      >
        Dashboard
      </li>
    </ul>
  </nav>
</aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-header">
          <div className="header-left">
            <h1>DTG-HTN Dual PGx Panel</h1>
            <p className="header-subtitle">
              Personalized Hypertension Management
            </p>
          </div>

          <div className="header-right">
            <button className="header-btn" onClick={handleExport}>
              Export
            </button>
          </div>
        </header>

        <div className="container">
          {activeMenu === "add-patient" && <AddPatientForm />}

          {activeMenu === "dashboard" && (
            <>
              <PatientSearch setCurrentPatient={setCurrentPatient} />

              {currentPatient && (
                <div
                  style={{
                    padding: "10px",
                    background: "#e8f4f8",
                    borderRadius: "5px",
                    marginBottom: "15px",
                    borderLeft: "4px solid #0056b3",
                  }}
                >
                  <strong>Active Patient:</strong>{" "}
                  {currentPatient.patient_name} (ID:{" "}
                  {currentPatient.patient_id})
                </div>
              )}

              <GeneForm setResult={setResult} />
              {result && <ResultDashboard result={result} />}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;