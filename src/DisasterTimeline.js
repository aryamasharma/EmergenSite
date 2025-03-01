import React from "react";

const disasters = [
  { name: "Great Fire of London (1666)", query: "Great Fire of London 1666" },
  { name: "Spanish Flu (1918)", query: "Spanish Flu 1918" },
  { name: "Pompeii Eruption (79 AD)", query: "Pompeii Eruption 79 AD" },
  { name: "Chernobyl Disaster (1986)", query: "Chernobyl Disaster 1986" },
  { name: "2004 Indian Ocean Tsunami", query: "2004 Indian Ocean Tsunami" },
];

const DisasterTimeline = ({ onSelect }) => {
  return (
    <div className="p-4 bg-yellow-100 rounded-md">
      <h2 className="text-xl font-bold mb-2">Historical Disaster Timeline</h2>
      <p className="text-gray-600 mb-4">
        Click on a disaster to learn how AI would have changed the response.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {disasters.map((disaster, index) => (
          <button
            key={index}
            className="bg-red-500 text-white p-2 rounded-md shadow-md hover:bg-red-700"
            onClick={() => onSelect(disaster.query)}
          >
            {disaster.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DisasterTimeline;

