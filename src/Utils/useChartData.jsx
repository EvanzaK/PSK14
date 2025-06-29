import { useQuery } from '@tanstack/react-query';
import { getAllChartData } from './Apis/ChartApi'; // Memanggil API untuk mengambil data

// Custom hook untuk mengambil data chart
export const useChartData = () => {
  return useQuery({
    queryKey: ['chartData'],
    queryFn: getAllChartData,
    select: (res) => res.data,
  });
};
