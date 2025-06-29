import React, { useState, useEffect } from 'react';
import { Select, Button, Table, message, Spin } from 'antd';
import axiosInstance from '../axiosConfig';  // Import axiosConfig

const KelasManagement = () => {
  const [kelas, setKelas] = useState([]);
  const [mataKuliah, setMataKuliah] = useState([]);
  const [dosen, setDosen] = useState([]);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMataKuliah, setSelectedMataKuliah] = useState(null);
  const [selectedDosen, setSelectedDosen] = useState(null);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState([]);
  const [sks, setSks] = useState(0);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [mataKuliahRes, dosenRes, mahasiswaRes, kelasRes] = await Promise.all([
        axiosInstance.get('/matakuliah'),
        axiosInstance.get('/dosen'),
        axiosInstance.get('/mahasiswa'),
        axiosInstance.get('/kelas')
      ]);
      setMataKuliah(mataKuliahRes.data);  // Set Mata Kuliah data
      setDosen(dosenRes.data);  // Set Dosen data
      setMahasiswa(mahasiswaRes.data);  // Set Mahasiswa data
      setKelas(kelasRes.data);  // Set Kelas data
      setLoading(false);
    } catch (error) {
      setError("Error fetching data");
      setLoading(false);
    }
  };

  const handleAddKelas = () => {
    if (!selectedMataKuliah || !selectedDosen || !selectedMahasiswa.length || !sks) {
      message.error("Please select all required fields.");
      return;
    }
  
    setLoading(true);
  
    // Mengirimkan nama yang dipilih untuk mata kuliah, dosen, dan mahasiswa
    axiosInstance.post('/kelas', {
      mataKuliah: selectedMataKuliah,  // Mengirim nama Mata Kuliah
      dosen: selectedDosen,            // Mengirim nama Dosen
      mahasiswa: selectedMahasiswa,    // Mengirim array nama Mahasiswa
      sks
    })
      .then(() => {
        message.success("Kelas created successfully!");
        fetchInitialData();  // Refresh data after adding new kelas
        setLoading(false);
        // Reset form fields after success
        setSelectedMataKuliah(null);
        setSelectedDosen(null);
        setSelectedMahasiswa([]);
        setSks(0);
      })
      .catch(() => {
        message.error("Failed to create kelas.");
        setLoading(false);
      });
  };
  

  if (loading) return <Spin size="large" />;
  if (error) return <div>{error}</div>;

  const columns = [
    {
      title: 'Mata Kuliah',
      dataIndex: 'mataKuliah',
      key: 'mataKuliah',
      render: (text) => text || "No Mata Kuliah"
    },
    {
      title: 'Dosen',
      dataIndex: 'dosen',
      key: 'dosen',
      render: (text) => text || "No Dosen"
    },
    {
      title: 'Mahasiswa',
      dataIndex: 'mahasiswa',
      key: 'mahasiswa',
      render: (text) => text.join(", ") || "No Mahasiswa"
    },
    {
      title: 'SKS',
      dataIndex: 'sks',
      key: 'sks'
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Pengelolaan Kelas</h2>

      <div>
      <Select
  placeholder="Pilih Mata Kuliah"
  style={{ width: 200, marginBottom: 10 }}
  onChange={setSelectedMataKuliah}
  value={selectedMataKuliah}
>
  {mataKuliah.map(mk => (
    <Select.Option key={mk.id} value={mk.name}>
      {mk.name}
    </Select.Option>
  ))}
</Select>

<Select
  placeholder="Pilih Dosen"
  style={{ width: 200, marginBottom: 10 }}
  onChange={setSelectedDosen}
  value={selectedDosen}
>
  {dosen.map(d => (
    <Select.Option key={d.id} value={d.name}>
      {d.name}
    </Select.Option>
  ))}
</Select>

<Select
  mode="multiple"
  placeholder="Pilih Mahasiswa"
  style={{ width: 300, marginBottom: 10 }}
  onChange={setSelectedMahasiswa}
  value={selectedMahasiswa}
>
  {mahasiswa.map(m => (
    <Select.Option key={m.id} value={m.name}>
      {m.name}
    </Select.Option>
  ))}
</Select>

        <input
          type="number"
          value={sks}
          onChange={(e) => setSks(e.target.value)}
          placeholder="Jumlah SKS"
          style={{ marginBottom: 10, width: 100 }}
        />

        <Button
          type="primary"
          onClick={handleAddKelas}
        >
          Tambah Kelas
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={kelas}
        rowKey="id"
        pagination={false}
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default KelasManagement;
