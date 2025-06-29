import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import React Query Client

// Komponen
import Dosen from "./components/Dosen";
import Dashboard from "./components/Dashboard";
import MataKuliah from "./components/MataKuliah";
import Register from "./components/Register";
import Login from "./components/Login";
import Mahasiswa from "./components/Mahasiswa";
import MahasiswaDetail from "./components/MahasiswaDetail";
import TambahMahasiswa from "./components/TambahMahasiswa";
import EditMahasiswa from "./components/EditMahasiswa";
import PermissionManagement from "./components/PermissionManagement";
import KelasManagement from './components/KelasManagement';
import RoleManagement from "./components/RoleManagement";

// Setup QueryClient
const queryClient = new QueryClient();

// CSS
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mahasiswa/:id" element={<MahasiswaDetail />} />
        <Route path="/tambah" element={<TambahMahasiswa />} />
        <Route path="/edit/:id" element={<EditMahasiswa />} />
        <Route path="/dosen" element={<Dosen />} />
        <Route path="/matakuliah" element={<MataKuliah />} />
        <Route path="/mahasiswa" element={<Mahasiswa />} />
        <Route path="/role-management" element={<RoleManagement />} />
        <Route path="/permission-management" element={<PermissionManagement />} />
        <Route path="/kelas-management" element={<KelasManagement />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
