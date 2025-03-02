import React, { useState } from 'react';
import { Table, Button, message } from 'antd';

const DEIRequests = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const data = [
    {
      key: '1',
      request: 'Screen Reader Compatibility',
    },
    {
      key: '2',
      request: 'Keyboard Navigation Support',
    },
    {
      key: '3',
      request: 'Text Size Adjustment',
    },
    {
      key: '4',
      request: 'High Contrast Mode',
    },
    {
      key: '5',
      request: 'Captions for Videos',
    },
  ];

  const handleSubmit = () => {
    if (selectedRequest) {
      message.success(`You have submitted: ${selectedRequest}. We will get back to you soon.`);
    }
  };

  const columns = [
    {
      title: 'Accommodation Request',
      dataIndex: 'request',
      key: 'request',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => {
            setSelectedRequest(record.request);
            handleSubmit();
          }}
          style={{
            backgroundColor: '#9E7B5E', // Darker shade of AB886D
            borderColor: '#9E7B5E',
          }}
        >
          Submit
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Website DEI Accommodation Requests</h2>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="key"
        style={{ margin: '0 auto', maxWidth: 600, backgroundColor: '#AB886D' }}
        rowClassName="table-row"
      />
    </div>
  );
};

export default DEIRequests;