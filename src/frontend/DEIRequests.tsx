import React, { useState } from "react";
import "./DEI.css"; // ✅ Import new CSS

// ✅ Define Type for Requests
interface RequestData {
  id: string;
  request: string;
}

const DEIRequests: React.FC = () => {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const data: RequestData[] = [
    { id: "1", request: "Screen Reader Compatibility" },
    { id: "2", request: "Keyboard Navigation Support" },
    { id: "3", request: "Text Size Adjustment" },
    { id: "4", request: "High Contrast Mode" },
    { id: "5", request: "Captions for Videos" },
  ];

  // ✅ Handle Submission
  const handleSubmit = (request: string) => {
    setSelectedRequest(request);
    setMessage(`✅ Your request "${request}" has been submitted.`);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="dei-container">
      <h2 className="dei-title">🌐 Website DEI Accommodation Requests</h2>

      {/* ✅ Success Message */}
      {message && <div className="dei-message">{message}</div>}

      {/* ✅ Table */}
      <div className="dei-table">
        <div className="dei-table-header">
          <span>Accommodation Request</span>
          <span>Action</span>
        </div>
        {data.map((item) => (
          <div key={item.id} className="dei-table-row">
            <span>{item.request}</span>
            <button className="dei-submit-button" onClick={() => handleSubmit(item.request)}>
              Submit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DEIRequests;
