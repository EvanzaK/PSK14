import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from './Apis/AxiosInstance';

const BASE_URL = 'http://localhost:3001/matakuliah';

// Fetch semua Mata Kuliah
export const useMataKuliah = () => {
  return useQuery({
    queryKey: ['mataKuliah'], // queryKey dalam bentuk array
    queryFn: async () => {
      const { data } = await axiosInstance.get(BASE_URL);
      return data;
    },
  });
};

// Create Mata Kuliah (addMataKuliah)
export const useCreateMataKuliah = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newMataKuliah) => {
      const { data } = await axiosInstance.post(BASE_URL, newMataKuliah);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['mataKuliah']); // Refresh cache setelah data ditambahkan
    },
  });
};

// Update Mata Kuliah
export const useUpdateMataKuliah = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedMataKuliah) => {
      const { data } = await axiosInstance.put(`${BASE_URL}/${updatedMataKuliah.id}`, updatedMataKuliah);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['mataKuliah']); // Refresh cache setelah data diupdate
    },
  });
};

// Delete Mata Kuliah
export const useDeleteMataKuliah = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (mataKuliahId) => {
      const { data } = await axiosInstance.delete(`${BASE_URL}/${mataKuliahId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['mataKuliah']); // Refresh cache setelah data dihapus
    },
  });
};
