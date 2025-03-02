import { useState, useEffect } from "react";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import axios from "axios";

import React from "react";
import { Menu, Button, Form, Input, Select } from "antd";
import Layout from 'ant-design-layout';
import DEIRequests from "./DEIRequests";

const { Header, Content, Sider} = Layout;
const { Option } = Select;

  const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    const labels = ["Information Settings", "Accommodations", "Announcement"];
    const children = [
        [
          { key: '1', label: 'Personal Information' },
          { key: '2', label: 'Money Info' },
        ], // Children for Information Settings
        [
          { key: '3', label: 'Requests' },
        ], // Children for Accommodations
        [
          { key: '4', label: 'Important Notices' },
        ], // Children for Announcements
      ];
      

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: labels[index],
      children: children[index],
    };
  });

const Settings = () => {
    const [selectedKey, setSelectedKey] = useState('11');

    const items = [
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
  
    const handleClick = (e) => {
      setSelectedKey(e.key);
    };
  
    const renderContent = () => {
      switch (selectedKey) {
        case '11':
          return (
            <div>
              <h2 style={{ textAlign: 'center' }}>Personal Information</h2>
              <p style=
              {{  
                marginTop:30,
                marginBottom: 30,
                textAlign:"center"
              }}></p>
              <Form
    name="user_info"
    labelCol={{
      span: 5,
    }}
    wrapperCol={{
      span: 15,
    }}
    style={{
      
    }}
  >
    <Form.Item label="Name">
        <Form.Item
          name="name"
          
          rules={[
            {
              required: true,
              message: 'Name is required',
            },
          ]}
        >
          <Input
            style={{
            alignItems:"center",
           
            }}
            placeholder="Damon Salvator"
          />
        </Form.Item>
    </Form.Item>
    <Form.Item label="Pronouns">
        <Form.Item
          name="pronouns"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input
            style={{
            
               
                marginTop:0,
            }}
            placeholder="Example: she/they"
          />
        </Form.Item>
    </Form.Item>
    <Form.Item label="Phone:">
        <Form.Item
          name="phonenumber"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input
            style={{
            
                marginTop:0,
            }}
            placeholder="(704) 567-8103"
          />
        </Form.Item>
    </Form.Item>
    <Form.Item
        name="bio"
        label="Bio"
      >
        <Input.TextArea style={{
           
        }} />
      </Form.Item>
      
    <Form.Item label=" " colon={false}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
            </div>
          );
        case '12':
          return (
            <div>
              <h2>Upcoming Events</h2>
              <p>You can find your mentioned upcoming events here.</p>
      <CalendarSettings/>

            </div>
          );
        case '21':
          return (
            <DEIRequests></DEIRequests>
          );

        case '31':
          return(<AboutUs></AboutUs>)

        case '32':
          return (
          <div style={{ backgroundColor:  '#F7DCB9'}}>
            <h1 style = {{
              textAlign: 'center',
              textDecorationColor: '#AB886D',
              color: '#DEAC80',
              margin: '20px 0',
            }}
            >Important Notices</h1>
            <CardSettings></CardSettings>
          </div>


          );
      }
    };
  

  const [eventData, setEventData] = useState(null);
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
        <Sider
          width={200}
          style={{
            background: '#fff',
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={[selectedKey]}
            defaultOpenKeys={['1']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={items}
            onClick={handleClick}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Content
            style={{
              padding: 24,
              margin: '24px 16px',
              minHeight: 280,
              background: '#fff',
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    );
  };
  
  export default Settings;