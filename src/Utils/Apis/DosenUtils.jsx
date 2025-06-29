import axios from "axios";

const API = "http://localhost:3001/dosen";

export const getAllDosen = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createDosen = async (data) => {
  return await axios.post(API, data);
};

export const updateDosen = async (id, data) => {
  return await axios.put(`${API}/${id}`, data);
};

export const deleteDosenById = async (id) => {
  return await axios.delete(`${API}/${id}`);
};
