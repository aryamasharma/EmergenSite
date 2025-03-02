import { useState, useEffect } from "react";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import axios from "axios";

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { slide as Menu } from 'react-burger-menu';
import DEIRequests from "./DEIRequests";
import { Button } from "react-bootstrap";

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  children?: { key: string; label: string }[];
}

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  const labels = ["Information Settings", "Accommodations"];
  const children = [
    [
      { key: '1', label: 'Personal Information' }
    ], // Children for Information Settings
    [
      { key: '3', label: 'Requests' },
    ]
  ];

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: labels[index],
    children: children[index],
  };
});

const Settings: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>('11');
  const { control, handleSubmit } = useForm();

  const items: MenuItem[] = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'Information Settings',
      children: [
        { key: '11', label: 'Personal Information' },
        { key: '12', label: 'Event Information' },
      ],
    },
    {
      key: '2',
      icon: <LaptopOutlined />,
      label: 'Accommodations',
      children: [{ key: '21', label: 'Requests' }],
    }
  ];

  const handleClick = (key: string) => {
    setSelectedKey(key);
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case '11':
        return (
          <div>
            <h2 style={{ textAlign: 'center' }}>Personal Information</h2>
            <p style={{ marginTop: 30, marginBottom: 30, textAlign: "center" }}></p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div style={{ marginBottom: '16px' }}>
                <label>Name</label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Name is required' }}
                  render={({ field }) => <input {...field} placeholder="Damon Salvator" />}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label>Pronouns</label>
                <Controller
                  name="pronouns"
                  control={control}
                  render={({ field }) => <input {...field} placeholder="Example: she/they" />}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label>Phone</label>
                <Controller
                  name="phonenumber"
                  control={control}
                  render={({ field }) => <input {...field} placeholder="(704) 567-8103" />}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label>Bio</label>
                <Controller
                  name="bio"
                  control={control}
                  render={({ field }) => <textarea {...field} />}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        );
      case '21':
        return <DEIRequests />;
      default:
        return null;
    }
  };

  const [eventData, setEventData] = useState<any>(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get('/api/get-event-data');
        setEventData(response.data);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchEventData();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md={2} style={{ background: '#fff' }}>
          <Menu>
            {items.map((item) => (
              <div key={item.key}>
                <h3>{item.label}</h3>
                {item.children?.map((child) => (
                  <a key={child.key} onClick={() => handleClick(child.key)}>{child.label}</a>
                ))}
              </div>
            ))}
          </Menu>
        </Col>
        <Col md={10} style={{ padding: '24px' }}>
          {renderContent()}
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;