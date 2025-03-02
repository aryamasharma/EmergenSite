import { useState, useEffect } from "react";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import axios from "axios";

import React from "react";
import { Layout, Menu, Button, Form, Input, Select } from "antd";
import DEIRequests from "./DEIRequests";

const { Header, Content, Sider } = Layout;
const { Option } = Select;

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
    },
    {
      key: '3',
      icon: <NotificationOutlined />,
      label: 'Announcement',
      children: [
        { key: '31', label: 'About Us' },
        { key: '32', label: 'Important Notices' },
      ],
    },
  ];

  const handleClick = (e: { key: string }) => {
    setSelectedKey(e.key);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case '11':
        return (
          <div>
            <h2 style={{ textAlign: 'center' }}>Personal Information</h2>
            <p style={{ marginTop: 30, marginBottom: 30, textAlign: "center" }}></p>
            <Form
              name="user_info"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
            >
              <Form.Item label="Name">
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: 'Name is required' }]}
                >
                  <Input placeholder="Damon Salvator" />
                </Form.Item>
              </Form.Item>
              <Form.Item label="Pronouns">
                <Form.Item name="pronouns">
                  <Input placeholder="Example: she/they" />
                </Form.Item>
              </Form.Item>
              <Form.Item label="Phone:">
                <Form.Item name="phonenumber">
                  <Input placeholder="(704) 567-8103" />
                </Form.Item>
              </Form.Item>
              <Form.Item name="bio" label="Bio">
                <Input.TextArea />
              </Form.Item>
              <Form.Item label=" " colon={false}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
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
    <Layout>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={[selectedKey]}
          defaultOpenKeys={['1']}
          style={{ height: '100%', borderRight: 0 }}
          items={items}
          onClick={handleClick}
        />
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content style={{ padding: 24, margin: '24px 16px', minHeight: 280, background: '#fff' }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Settings;