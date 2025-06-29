import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Menggunakan useNavigate untuk navigasi
import { useMataKuliah, useCreateMataKuliah, useUpdateMataKuliah, useDeleteMataKuliah } from "../Utils/MataKuliahUtils";
import { Modal, Button, Input, Pagination } from "antd"; // Import Pagination, Button, Modal, and Input from Ant Design

const MataKuliah = () => {
  const navigate = useNavigate(); // Hook untuk navigasi
  const { data: mataKuliah, isLoading, isError } = useMataKuliah();
  const { mutate: createMataKuliah } = useCreateMataKuliah();
  const { mutate: updateMataKuliah } = useUpdateMataKuliah();
  const { mutate: deleteMataKuliah } = useDeleteMataKuliah();

  const [newMataKuliah, setNewMataKuliah] = useState({
    nama: "",
    kode: "",
  });

  const [editMataKuliah, setEditMataKuliah] = useState({
    id: null,
    nama: "",
    kode: "",
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5); // Number of items per page

  const showModal = (editMode, mataKuliah = {}) => {
    setIsModalVisible(true);
    setIsEditMode(editMode);
    if (editMode) {
      setEditMataKuliah(mataKuliah); // Set form fields for editing
    } else {
      setNewMataKuliah({ nama: "", kode: "" }); // Reset form fields for adding new mata kuliah
    }
  };

  const handleOk = () => {
    if (isEditMode) {
      // Update Mata Kuliah
      updateMataKuliah(editMataKuliah);
    } else {
      // Create Mata Kuliah
      createMataKuliah(newMataKuliah);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    deleteMataKuliah(id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isEditMode) {
      setEditMataKuliah((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setNewMataKuliah((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update current page
  };

  const handleBack = () => {
    navigate("/dashboard"); // Kembali ke halaman Dashboard atau halaman sebelumnya
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Data Mata Kuliah</h1>

        {/* Button Kembali */}
        <Button type="default" onClick={handleBack} className="mb-6">
          Kembali
        </Button>

        <div className="flex justify-between items-center mb-6">
          <Button type="primary" onClick={() => showModal(false)} className="bg-green-500 hover:bg-green-600 text-white">
            Tambah Mata Kuliah
          </Button>
        </div>

        <table className="min-w-full table-auto border-collapse shadow-md rounded-lg mb-8">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-5 text-left">Kode</th>
              <th className="py-3 px-5 text-left">Nama</th>
              <th className="py-3 px-5 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {mataKuliah
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)  // Slice data for current page
              .map((matkul) => (
                <tr key={matkul.id} className="hover:bg-gray-50">
                  <td className="py-3 px-5">{matkul.kode}</td>
                  <td className="py-3 px-5">{matkul.nama}</td>
                  <td className="py-3 px-5 flex gap-4">
                    <Button onClick={() => showModal(true, matkul)} className="bg-yellow-500 hover:bg-yellow-600 text-white">
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(matkul.id)} className="bg-red-500 hover:bg-red-600 text-white">
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Pagination */}
        <Pagination
          current={currentPage}  // Show the current page
          pageSize={pageSize}  // Set page size
          total={mataKuliah.length}  // Total number of items
          onChange={handlePageChange}  // Handle page change
          showSizeChanger={false}  // Disable page size changer
        />
      </div>

      {/* Modal untuk tambah/edit Mata Kuliah */}
      <Modal
        title={isEditMode ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Kembali
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Simpan
          </Button>,
        ]}
      >
        <div className="flex flex-col gap-4">
          <Input
            name="kode"
            placeholder="Kode Mata Kuliah"
            value={isEditMode ? editMataKuliah.kode : newMataKuliah.kode}
            onChange={handleChange}
          />
          <Input
            name="nama"
            placeholder="Nama Mata Kuliah"
            value={isEditMode ? editMataKuliah.nama : newMataKuliah.nama}
            onChange={handleChange}
          />
        </div>
      </Modal>
    </div>
  );
};

export default MataKuliah;
