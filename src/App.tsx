import { useState } from "react";
import "./App.css";
import LandingPage from "./frontend/LandingPage";

function App() {
  return (
      <div className="App">
        <div className="flex flex-col items-center">
          <LandingPage />
        </div>
      </div>
  );
}

export default App;
