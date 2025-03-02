import React from "react";
import Navbar from "./NavBar"; // ✅ Correct import
import AlertSystem from "./AlertSystem";
import EvacuationMap from "./EvacuationMap";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      
      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Emergency Message */}
      <div className="bg-red-600 p-4 text-center text-lg font-bold shadow-lg">
        🚨 No active emergency alerts at this time.
      </div>

      {/* ✅ Main Section - Alert System & Evacuation Map */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <AlertSystem />
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <EvacuationMap />
        </div>
      </div>

      {/* ✅ Emergency Contacts Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center mx-6 mt-6">
        <h2 className="text-xl font-bold text-red-400">📞 Emergency Contacts</h2>
        <p className="text-gray-300 mt-2">For immediate assistance, contact:</p>
        <div className="mt-4">
          <a href="tel:911" className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-lg text-lg">Call 911</a>
        </div>
      </div>

    </div>
  );
};

export default LandingPage;
