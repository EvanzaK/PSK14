import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from './Apis/AxiosInstance';

// Endpoint untuk mata kuliah
const BASE_URL = 'http://localhost:3001/matakuliah';

// Hook untuk mendapatkan semua mata kuliah
export const useMataKuliah = () => {
  return useQuery(['mataKuliah'], async () => {
    const { data } = await axiosInstance.get(BASE_URL);
    return data;
  });
};

// Hook untuk menambah mata kuliah
export const useCreateMataKuliah = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (newMataKuliah) => {
      const { data } = await axiosInstance.post(BASE_URL, newMataKuliah);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['mataKuliah']); // Invalidate cache untuk memuat ulang data mata kuliah
      },
    }
  );
};

// Hook untuk mengupdate mata kuliah
export const useUpdateMataKuliah = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (updatedMataKuliah) => {
      const { data } = await axiosInstance.put(`${BASE_URL}/${updatedMataKuliah.id}`, updatedMataKuliah);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['mataKuliah']); // Invalidate cache setelah update
      },
    }
  );
};

// Hook untuk menghapus mata kuliah
export const useDeleteMataKuliah = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (mataKuliahId) => {
      const { data } = await axiosInstance.delete(`${BASE_URL}/${mataKuliahId}`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['mataKuliah']); // Invalidate cache setelah penghapusan
      },
    }
  );
};
