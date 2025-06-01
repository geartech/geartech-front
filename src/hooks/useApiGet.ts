import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/utils/axiosInstance';

export function useApiGet<T>(key: string, url: string, options?: UseQueryOptions<T>) {
  return useQuery<T>({
    queryKey: [key, url],
    queryFn: async () => {
      const { data } = await api.get<T>(url);
      return data;
    },
    ...options,
  });
}
