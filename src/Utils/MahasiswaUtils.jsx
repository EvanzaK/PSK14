import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from './Apis/AxiosInstance';

// Fetch semua mahasiswa
export const useMahasiswa = () => {
  return useQuery({
    queryKey: ['mahasiswa'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/mahasiswa');
      return data;
    },
  });
};

// Create mahasiswa
export const useCreateMahasiswa = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newMahasiswa) => {
      const { data } = await axiosInstance.post('/mahasiswa', newMahasiswa);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['mahasiswa']); // Refresh cache setelah data ditambahkan
    },
    onError: (error) => {
      console.error('Error during create:', error);
    },
  });
};

// Update mahasiswa
export const useUpdateMahasiswa = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedMahasiswa) => {
      const { data } = await axiosInstance.put(`/mahasiswa/${updatedMahasiswa.id}`, updatedMahasiswa); // Menggunakan id yang benar
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['mahasiswa']); // Refresh cache setelah data diupdate
    },
    onError: (error) => {
      console.error('Error during update:', error);
    },
  });
};

// Delete mahasiswa berdasarkan NIM
export const useDeleteMahasiswa = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      console.log(`Trying to delete mahasiswa with ID: ${id}`); // Verifikasi ID yang dikirim
      try {
        // Menggunakan `id` yang benar sesuai dengan data di backend
        const { data } = await axiosInstance.delete(`/mahasiswa/${id}`);
        return data;
      } catch (error) {
        console.error('Error during delete:', error); // Menangkap error dari Axios
        throw error; // Tangani error yang terjadi selama operasi DELETE
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['mahasiswa']); // Refresh cache setelah data dihapus
    },
    onError: (error) => {
      console.error('Error during delete:', error); // Menangkap error dari Axios
    },
  });
};
