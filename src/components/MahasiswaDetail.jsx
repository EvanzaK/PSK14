import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { getMahasiswa } from "../Utils/Apis/MahasiswaApi";

const MahasiswaDetail = () => {
  const { id } = useParams();
  const [mahasiswa, setMahasiswa] = useState(null);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    const res = await getMahasiswa(id);
    setMahasiswa(res.data);
  };

  if (!mahasiswa) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-64 flex-1">
        <div className="bg-yellow-400 p-4 text-white font-semibold">Selamat datang Super Admin</div>
        <div className="p-6">
          <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded inline-block mb-4">
            Kembali
          </Link>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Detail Mahasiswa</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>ID:</strong> {mahasiswa.id}
              </div>
              <div>
                <strong>NIM:</strong> {mahasiswa.nim}
              </div>
              <div className="col-span-2">
                <strong>Nama:</strong> {mahasiswa.nama}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MahasiswaDetail;
