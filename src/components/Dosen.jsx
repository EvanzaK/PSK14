import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { getAllDosen, createDosen, updateDosen, deleteDosenById } from "../Utils/Apis/DosenUtils";
import { Pagination, Button } from "antd"; // Import Pagination dan Button dari Ant Design

const Dosen = () => {
  const [dosen, setDosen] = useState([]);
  const [nama, setNama] = useState("");
  const [nidn, setNidn] = useState("");
  const [editId, setEditId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const [pageSize] = useState(5); // Jumlah data per halaman

  useEffect(() => {
    fetchDosen();
  }, [currentPage, pageSize]); // Menambah dependency pada halaman dan pageSize

  const fetchDosen = async () => {
    const res = await getAllDosen(currentPage, pageSize); // Mengambil data dengan pagination
    setDosen(res);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nama || !nidn) return;

    if (editId !== null) {
      await updateDosen(editId, { nama, nidn });
    } else {
      await createDosen({ nama, nidn });
    }

    setNama("");
    setNidn("");
    setEditId(null);
    fetchDosen();
  };

  const handleEdit = (d) => {
    setEditId(d.id);
    setNama(d.nama);
    setNidn(d.nidn);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus dosen ini?")) {
      await deleteDosenById(id);
      fetchDosen();
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="ml-64 w-full p-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Data Dosen</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <input type="text" placeholder="Nama Dosen" value={nama} onChange={(e) => setNama(e.target.value)} className="w-full p-2 border rounded" />
          <input type="text" placeholder="NIDN" value={nidn} onChange={(e) => setNidn(e.target.value)} className="w-full p-2 border rounded" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {editId !== null ? "Update" : "Tambah"}
          </button>
        </form>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">NIDN</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dosen.map((d) => (
              <tr key={d.id} className="bg-white border-b hover:bg-gray-100">
                <td className="px-4 py-2">{d.id}</td>
                <td className="px-4 py-2">{d.nama}</td>
                <td className="px-4 py-2">{d.nidn}</td>
                <td className="px-4 py-2 space-x-2">
                  <button onClick={() => handleEdit(d)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(d.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={dosen.length} // Jumlah total data dosen
          onChange={handlePageChange}
          showSizeChanger={false} // Tidak mengubah page size
        />
      </div>
    </div>
  );
};

export default Dosen;
