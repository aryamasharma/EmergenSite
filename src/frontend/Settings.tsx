import React, { useState } from "react";
import { UserOutlined, LaptopOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import DEIRequests from "./DEIRequests";
import ParticlesComponent from "./particles"; // ✅ Ensure it's imported
import "./Settings.css"; // ✅ Import the new CSS

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  children?: { key: string; label: string }[];
}

const Settings: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>("11");
  const { control, handleSubmit } = useForm();

  const items: MenuItem[] = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Information Settings",
      children: [
        { key: "11", label: "Personal Information" },
      ],
    },
    {
      key: "2",
      icon: <LaptopOutlined />,
      label: "Accommodations",
      children: [{ key: "21", label: "DEI Requests" }], // ✅ Fixed label
    },
  ];

  const handleClick = (key: string) => {
    setSelectedKey(key);
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case "11":
        return (
          <div className="settings-form">
            <h2 className="settings-title">Personal Information</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label>Name</label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Name is required" }}
                  render={({ field }) => <input {...field} placeholder="Damon Salvator" />}
                />
              </div>
              <div>
                <label>Pronouns</label>
                <Controller
                  name="pronouns"
                  control={control}
                  render={({ field }) => <input {...field} placeholder="Example: she/they" />}
                />
              </div>
              <div>
                <label>Phone</label>
                <Controller
                  name="phonenumber"
                  control={control}
                  render={({ field }) => <input {...field} placeholder="(704) 567-8103" />}
                />
              </div>
              <div>
                <label>Bio</label>
                <Controller name="bio" control={control} render={({ field }) => <textarea {...field} />} />
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        );
      case "21":
        return <DEIRequests />;
      default:
        return <p className="settings-placeholder">Please select a setting from the sidebar.</p>;
    }
  };

  return (
    <div className="settings-container">
      <ParticlesComponent id="particles-bg" /> {/* ✅ Fix background particles */}
      
      {/* ✅ Sidebar */}
      <div className="settings-sidebar">
        <h3 className="sidebar-title">Settings</h3>
        {items.map((item) => (
          <div key={item.key} className="settings-category">
            <h4>{item.label}</h4>
            {item.children?.map((child) => (
              <a key={child.key} onClick={() => handleClick(child.key)} className="settings-link">
                {child.label}
              </a>
            ))}
          </div>
        ))}
      </div>

      {/* ✅ Main Content Area */}
      <div className="settings-content">{renderContent()}</div>
    </div>
  );
};

export default Settings;
