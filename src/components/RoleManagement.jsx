// src/components/RoleManagement.jsx

import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { Button, Select, Table, message, Spin } from 'antd';

const RoleManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedRoles, setSelectedRoles] = useState({});

  useEffect(() => {
    axiosInstance.get("/user").then((response) => {
      setUsers(response.data);
      setLoading(false);
    }).catch(() => {
      setError("Error fetching users");
      setLoading(false);
    });

    axiosInstance.get("/roles").then((response) => {
      setRoles(response.data);
    }).catch(() => {
      setError("Error fetching roles");
      setLoading(false);
    });
  }, []);

  const handleSelectChange = (userId, value) => {
    setSelectedRoles(prev => ({ ...prev, [userId]: value }));
  };

  const handleUpdateRole = (userId) => {
    const roleId = selectedRoles[userId];
    if (!roleId) {
      message.error('Please select a role first.');
      return;
    }

    setLoading(true);
    axiosInstance.put(`/user/${userId}/role`, { roleId })
      .then(() => {
        message.success('Role updated successfully');
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === userId ? { ...user, roleId } : user
          )
        );
        setLoading(false);
      })
      .catch(() => {
        message.error('Failed to update role');
        setLoading(false);
      });
  };

  if (loading) return <Spin size="large" />;
  if (error) return <div>{error}</div>;

  const columns = [
    {
      title: 'User',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Current Role',
      key: 'currentRole',
      render: (_, record) => {
        const currentRole = roles.find(role => role.id.toString() === record.roleId?.toString());
        return <span>{currentRole ? currentRole.name : "No Role"}</span>;
      },
    },
    {
      title: 'Change Role',
      key: 'changeRole',
      render: (_, record) => (
        <Select 
          value={selectedRoles[record.id] || record.roleId}
          style={{ width: 150 }}
          onChange={(value) => handleSelectChange(record.id, value)}
        >
          {roles.map(role => (
            <Select.Option key={role.id} value={role.id}>
              {role.name}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button 
          type="primary"
          onClick={() => handleUpdateRole(record.id)}
        >
          Update
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Role Management</h2>
      <Table columns={columns} dataSource={users} rowKey="id" pagination={false} />
    </div>
  );
};

export default RoleManagement;
