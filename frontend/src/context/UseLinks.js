import { useQuery } from "@tanstack/react-query"
import { instance } from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const UseLinks = () => {
   return useQuery({
    queryKey:['links'],
    queryFn:async () => {
        const res = await instance.get(API_PATHS.LINK.GET_DATA);
      return res.data;
    }
   })
}

export default UseLinks
