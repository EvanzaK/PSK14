import React from "react";
import { Link } from "react-router-dom";

const TableMahasiswa = ({ data, onDelete }) => {
  return (
    <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <thead className="bg-blue-500 text-white">
        <tr>
          <th className="py-3 px-5">ID</th>
          <th className="py-3 px-5">NIM</th>
          <th className="py-3 px-5">Nama</th>
          <th className="py-3 px-5">Aksi</th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {data.map((mhs) => (
          <tr key={mhs.id} className="hover:bg-gray-50 transition">
            <td className="border-t py-3 px-5 text-center">{mhs.id}</td>
            <td className="border-t py-3 px-5">{mhs.nim}</td>
            <td className="border-t py-3 px-5">{mhs.nama}</td>
            <td className="border-t py-3 px-5 flex gap-2 justify-center">
              <Link to={`/mahasiswa/${mhs.id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                Detail
              </Link>
              <Link to={`/edit/${mhs.id}`} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm">
                Edit
              </Link>
              <button onClick={() => onDelete(mhs.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
                Hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableMahasiswa;
