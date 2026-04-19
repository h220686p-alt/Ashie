import React, { useState } from "react";
import GeneForm from "./components/GeneForm";
import ResultDashboard from "./components/ResultDashboard";
import "./styles.css";
import logo from "./assets/logo.png";
import PatientSearch from "./components/PatientSearch";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="app-layout">

      {/* Sidebar */}
      <aside className="sidebar">
        <img src={logo} alt="logo" className="sidebar-logo" />

        <h2>PGx DSS</h2>

        <nav>
          <ul>
            <li>🏠 Dashboard</li>
            <li>🧬 Gene Analysis</li>
            <li>💊 Drug Guidance</li>
            <li>📄 Reports</li>
            <li>ℹ️ About</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">

        <header className="top-header">
  <div className="header-left">
    <h1>Pharmacogenetic DSS</h1>
    <p className="header-subtitle">
      Personalized Hypertension Management
    </p>
  </div>

  <div className="header-right">
    <button className="header-btn">Export</button>
    <button className="header-btn">Help</button>
  </div>
</header>

import PatientSearch from "./components/PatientSearch";
        <div className="container">
          <GeneForm setResult={setResult} />
          {result && <ResultDashboard result={result} />}
        </div>

      </main>

    </div>
  );
}

export default App;