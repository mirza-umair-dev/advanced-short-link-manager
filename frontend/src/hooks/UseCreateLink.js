
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import { toast } from 'react-toastify';


const UseCreateLink = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (originalLink) => {
            const res = await instance.post(API_PATHS.LINK.GENERATE, {
                    originalLink,
                  });
                  return res.data; 
        },
        onSuccess: () => {
            toast.success("Link Generated Successfully!");

            queryClient.invalidateQueries({
                queryKey:['links']
            })
        },
        onError: (error) => {
            toast.error(error.response?.data?.message ||
          error.message ||
          "Something went wrong!")
        }
    })
}

export default UseCreateLink
