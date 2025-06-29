import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateMahasiswa } from "../Utils/MahasiswaUtils"; // Hook untuk menambah mahasiswa

const TambahMahasiswa = () => {
  const navigate = useNavigate();
  const { mutate: createMahasiswa, isLoading, isError } = useCreateMahasiswa(); // Hook untuk create mahasiswa

  const [newMahasiswa, setNewMahasiswa] = useState({
    nim: "",
    nama: "",
    status: "aktif",
    tugas: 0,
    uts: 0,
    uas: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMahasiswa((prev) => ({
      ...prev,
      [name]: ["tugas", "uts", "uas"].includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMahasiswa(newMahasiswa); // Memanggil hook untuk menambah mahasiswa
      alert("Mahasiswa berhasil ditambahkan!");
      navigate("/mahasiswa"); // Redirect ke halaman mahasiswa setelah berhasil tambah
    } catch (error) {
      alert("Gagal menambah mahasiswa.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Tambah Mahasiswa</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input NIM */}
          <div>
            <label htmlFor="nim" className="block text-sm font-medium text-gray-700">NIM</label>
            <input
              type="text"
              id="nim"
              name="nim"
              value={newMahasiswa.nim}
              onChange={handleChange}
              className="input w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Input Nama */}
          <div>
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama</label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={newMahasiswa.nama}
              onChange={handleChange}
              className="input w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              name="status"
              value={newMahasiswa.status}
              onChange={handleChange}
              className="input w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="aktif">Aktif</option>
              <option value="tidak">Tidak Aktif</option>
            </select>
          </div>

          {/* Input Tugas, UTS, UAS */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="tugas" className="block text-sm font-medium text-gray-700">Tugas</label>
              <input
                type="number"
                id="tugas"
                name="tugas"
                value={newMahasiswa.tugas}
                onChange={handleChange}
                className="input w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tugas"
              />
            </div>

            <div>
              <label htmlFor="uts" className="block text-sm font-medium text-gray-700">UTS</label>
              <input
                type="number"
                id="uts"
                name="uts"
                value={newMahasiswa.uts}
                onChange={handleChange}
                className="input w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="UTS"
              />
            </div>

            <div>
              <label htmlFor="uas" className="block text-sm font-medium text-gray-700">UAS</label>
              <input
                type="number"
                id="uas"
                name="uas"
                value={newMahasiswa.uas}
                onChange={handleChange}
                className="input w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="UAS"
              />
            </div>
          </div>

          {/* Tombol Simpan */}
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default TambahMahasiswa;
