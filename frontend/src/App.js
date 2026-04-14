// src/App.js
import React from "react";
import GeneForm from './components/GeneForm';

function App() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Pharmacogenetic Dashboard</h1>
      <GeneForm />
    </div>
  );
}

export default App;