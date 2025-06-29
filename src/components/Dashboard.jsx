import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Tooltip, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import { Pagination, Button } from "antd";
import { useChartData } from "../Utils/useChartData"; // Menggunakan custom hook untuk mengambil data chart

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: chartData, isLoading, isError, error } = useChartData();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data: {error.message}</div>;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="ml-64 w-full">
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-cyan-500 p-4 text-white shadow-md">
          <h1 className="text-xl font-semibold">Selamat Datang di Sistem Akademik</h1>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow">
            Logout
          </button>
        </div>

        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

          {/* LineChart */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Statistik Data</h3>

            {/* LineChart */}
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData.students}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="faculty" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>

            {/* BarChart */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.students}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="faculty" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>

            {/* PieChart */}
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={chartData.genderRatio} dataKey="count" nameKey="gender" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" />
              </PieChart>
            </ResponsiveContainer>

            {/* Pagination */}
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={chartData.students.length}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
