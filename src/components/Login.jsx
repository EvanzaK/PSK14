import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ Tambahkan Link di sini
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:3001/user", { params: { email } });
      const user = res.data[0];

      if (user && user.password === password) {
        navigate("/dashboard");
      } else {
        alert("Email atau password salah");
      }
    } catch (error) {
      alert("Gagal terhubung ke server!");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-3xl text-blue-600 font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Masukkan email" className="w-full px-4 py-2 border rounded-lg mb-4" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Masukkan password" className="w-full px-4 py-2 border rounded-lg mb-4" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg mb-4">
            Login
          </button>
        </form>
        <p className="text-sm text-center">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
