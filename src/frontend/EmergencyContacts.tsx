import React from "react";

const EmergencyContacts: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold text-red-500">📞 Emergency Contacts</h1>
      <p className="text-gray-300 mt-2">For immediate assistance, call:</p>
      <ul className="mt-4 space-y-2">
        <li className="text-lg">🚨 **911 - General Emergency Services**</li>
        <li className="text-lg">💜 **National Domestic Violence Hotline: 1-800-799-7233**</li>
        <li className="text-lg">🆘 **RAINN Sexual Assault Hotline: 1-800-656-4673**</li>
        <li className="text-lg">🚑 **Poison Control: 1-800-222-1222**</li>
      </ul>
    </div>
  );
};

export default EmergencyContacts;
