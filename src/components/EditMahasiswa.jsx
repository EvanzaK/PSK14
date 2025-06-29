import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateMahasiswa, useMahasiswa } from "../Utils/MahasiswaUtils"; // Menggunakan hook yang benar

const EditMahasiswa = () => {
  const { id } = useParams(); // Mengambil ID mahasiswa dari URL
  const navigate = useNavigate();
  const { data: mahasiswa, isLoading, isError } = useMahasiswa(); // Mengambil data mahasiswa
  const { mutate: updateMahasiswa } = useUpdateMahasiswa(); // Hook untuk update mahasiswa

  const [form, setForm] = useState({
    nim: "",
    nama: "",
    status: "aktif",
    tugas: 0,
    uts: 0,
    uas: 0,
  });

  useEffect(() => {
    if (mahasiswa) {
      const target = mahasiswa.find((mhs) => mhs.id === id); // Temukan mahasiswa berdasarkan ID
      if (target) setForm(target);
    }
  }, [mahasiswa, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ["tugas", "uts", "uas"].includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMahasiswa(form); // Memanggil hook untuk mengupdate mahasiswa
      alert("Mahasiswa berhasil diperbarui!");
      navigate("/mahasiswa"); // Redirect ke halaman mahasiswa setelah berhasil edit
    } catch (error) {
      alert("Gagal memperbarui mahasiswa.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Edit Mahasiswa</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input NIM */}
          <div>
            <label htmlFor="nim" className="block text-sm font-medium text-gray-700">NIM</label>
            <input
              type="text"
              id="nim"
              name="nim"
              value={form.nim}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              value={form.nama}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                value={form.tugas}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tugas"
              />
            </div>

            <div>
              <label htmlFor="uts" className="block text-sm font-medium text-gray-700">UTS</label>
              <input
                type="number"
                id="uts"
                name="uts"
                value={form.uts}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="UTS"
              />
            </div>

            <div>
              <label htmlFor="uas" className="block text-sm font-medium text-gray-700">UAS</label>
              <input
                type="number"
                id="uas"
                name="uas"
                value={form.uas}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="UAS"
              />
            </div>
          </div>

          {/* Tombol Simpan */}
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditMahasiswa;
