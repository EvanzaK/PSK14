import React, { useEffect, useState } from 'react';
import { Checkbox, Button, Spin, message, Select } from 'antd';
import axiosInstance from '../axiosConfig';

const PermissionManagement = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [rolesRes, permissionsRes] = await Promise.all([
        axiosInstance.get('/roles'),
        axiosInstance.get('/permissions'),
      ]);
      setRoles(rolesRes.data);
      setPermissions(permissionsRes.data);
    } catch (error) {
      message.error('Error fetching initial data.');
    } finally {
      setLoading(false);
    }
  };

  const fetchRolePermissions = async (roleId) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/role/${roleId}/permissions`);
      setSelectedPermissions(res.data.map(rp => rp.permission_id));
    } catch (error) {
      message.error('Error fetching role permissions.');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (value) => {
    setSelectedRole(value);
    fetchRolePermissions(value);
  };

  const handleSavePermissions = async () => {
    if (!selectedRole) {
      message.error('Please select a role first.');
      return;
    }
    setLoading(true);
    try {
      await axiosInstance.put(`/role/${selectedRole}/permissions`, {
        permissions: selectedPermissions,
      });
      message.success('Permissions updated successfully.');
    } catch (error) {
      message.error('Error updating permissions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Permission Management</h2>

      {loading && <Spin size="large" style={{ marginBottom: '1rem' }} />}

      <Select
        placeholder="Select a Role"
        style={{ width: 200, marginBottom: '1rem' }}
        onChange={handleRoleChange}
        value={selectedRole}
      >
        {roles.map(role => (
          <Select.Option key={role.id} value={role.id}>
            {role.name}
          </Select.Option>
        ))}
      </Select>

      {selectedRole && (
        <Checkbox.Group
          options={permissions.map(permission => ({
            label: permission.name,
            value: permission.id,
          }))}
          value={selectedPermissions}
          onChange={setSelectedPermissions}
          style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}
        />
      )}

      <Button type="primary" onClick={handleSavePermissions}>
        Save Permissions
      </Button>
    </div>
  );
};

export default PermissionManagement;
