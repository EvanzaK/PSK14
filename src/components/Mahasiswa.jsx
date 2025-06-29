import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useMahasiswa, useDeleteMahasiswa, useUpdateMahasiswa } from "../Utils/MahasiswaUtils"; // Mengimpor hook dari MahasiswaUtils
import { Pagination, Button, Modal, Input } from "antd"; // Import Pagination, Button, Modal, and Input dari Ant Design

const Mahasiswa = () => {
  const { data: mahasiswa, isLoading, isError, error } = useMahasiswa();
  const { mutate: deleteMahasiswa } = useDeleteMahasiswa();
  const { mutate: updateMahasiswa } = useUpdateMahasiswa();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  const [isModalVisible, setIsModalVisible] = useState(false); // State untuk modal
  const [editMhs, setEditMhs] = useState({ id: "", nama: "", nim: "" }); // State untuk menyimpan data mahasiswa yang sedang diedit

  // Menangani loading dan error states
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data: {error.message}</div>;

  // Menangani perubahan halaman
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Menangani pengeditan mahasiswa
  const handleEdit = (mhs) => {
    setEditMhs(mhs); // Menyimpan data mahasiswa yang akan diedit
    setIsModalVisible(true); // Menampilkan modal untuk edit
  };

  // Menangani penghapusan mahasiswa
  const handleDelete = (id) => {
    const konfirmasi = window.confirm(`Yakin ingin menghapus mahasiswa dengan ID ${id}?`);
    if (konfirmasi) {
      deleteMahasiswa(id); // Melakukan delete mahasiswa
      alert("Data berhasil dihapus.");
    }
  };

  // Menangani perubahan form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditMhs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Menangani submit form edit
  const handleSubmitEdit = () => {
    updateMahasiswa(editMhs); // Update data mahasiswa
    setIsModalVisible(false); // Menutup modal setelah berhasil update
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="ml-64 w-full">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 text-white shadow-md">
          <h1 className="text-xl font-semibold">Dashboard Mahasiswa</h1>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-700">Data Mahasiswa</h2>
            <a href="/tambah" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">
              + Tambah Mahasiswa
            </a>
          </div>

          <div className="shadow-lg rounded-lg overflow-hidden">
            {/* Tabel Mahasiswa */}
            <table className="min-w-full table-auto border-collapse shadow-md rounded-lg mb-8">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-3 px-5 text-left">ID</th>
                  <th className="py-3 px-5 text-left">NIM</th>
                  <th className="py-3 px-5 text-left">Nama</th>
                  <th className="py-3 px-5 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {mahasiswa.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((mhs) => (
                  <tr key={mhs.id} className="hover:bg-gray-50">
                    <td className="py-3 px-5">{mhs.id}</td>
                    <td className="py-3 px-5">{mhs.nim}</td>
                    <td className="py-3 px-5">{mhs.nama}</td>
                    <td className="py-3 px-5">
                      {/* Tombol Edit */}
                      <Button
                        onClick={() => handleEdit(mhs)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white"
                      >
                        Edit
                      </Button>
                      {/* Tombol Hapus */}
                      <Button
                        onClick={() => handleDelete(mhs.id)}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={mahasiswa.length} // Jumlah total mahasiswa
              onChange={handlePageChange}
              showSizeChanger={false} // Tidak mengubah page size
            />
          </div>
        </div>
      </div>

      {/* Modal Edit Mahasiswa */}
      <Modal
        title="Edit Mahasiswa"
        visible={isModalVisible}
        onOk={handleSubmitEdit}
        onCancel={() => setIsModalVisible(false)}
      >
        <div className="flex flex-col gap-4">
          <Input
            name="nama"
            placeholder="Nama Mahasiswa"
            value={editMhs.nama}
            onChange={handleChange}
          />
          <Input
            name="nim"
            placeholder="NIM"
            value={editMhs.nim}
            onChange={handleChange}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Mahasiswa;
