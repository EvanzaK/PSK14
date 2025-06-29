import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/user", form);
      alert("Registrasi berhasil!");
      navigate("/");
    } catch (err) {
      alert("Gagal registrasi");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-700">Registrasi User</h2>
        <form onSubmit={handleSubmit}>
          <input name="email" type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg mb-4" value={form.email} onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-lg mb-4" value={form.password} onChange={handleChange} required />
          <button type="submit" className="bg-blue-600 w-full text-white py-2 mt-4 rounded-md">
            Daftar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
