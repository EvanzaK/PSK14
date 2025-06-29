import { FaUserGraduate, FaBook, FaChalkboardTeacher, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-900 text-white fixed h-screen">
      <div className="p-4 font-bold text-2xl text-center border-b border-blue-700">Dashboard</div>
      <nav className="mt-4 px-4 space-y-2">
        <Link to="/dashboard" className="block hover:bg-blue-700 px-3 py-2 rounded">
          <FaHome className="inline mr-2" /> Dashboard
        </Link>
        <Link to="/mahasiswa" className="block hover:bg-blue-700 px-3 py-2 rounded">
          <FaUserGraduate className="inline mr-2" /> Mahasiswa
        </Link>
        <Link to="/dosen" className="block hover:bg-blue-700 px-3 py-2 rounded">
          <FaChalkboardTeacher className="inline mr-2" /> Dosen
        </Link>
        <Link to="/matakuliah" className="block hover:bg-blue-700 px-3 py-2 rounded">
          <FaBook className="inline mr-2" /> Mata Kuliah
        </Link>
        <Link to="/role-management" className="block hover:bg-blue-700 px-3 py-2 rounded">
          <FaBook className="inline mr-2" /> Role Management
        </Link>
        <Link to="/permission-management" className="block hover:bg-blue-700 px-3 py-2 rounded">
          <FaBook className="inline mr-2" /> Permission Management
        </Link>
        <Link to="/kelas-management" className="block hover:bg-blue-700 px-3 py-2 rounded">
          <FaBook className="inline mr-2" /> Kelas Management
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
