import { useEffect, useState } from "react"
import { instance } from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { AuthContext } from "./authContext";

const AuthProvider = ({children}) => {
    const [user, setuser] = useState('');
    const [loading, setloading] = useState(false);

    const checkAuth = async () => {
         try {
      const res = await instance.get(API_PATHS.AUTH.MY_PROFILE);

      setuser(res.data.user);
    } catch (error) {
      setuser(null);
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [])
  
    return (
        <div>
            <AuthContext.Provider
            value={{
                user,loading,setuser,checkAuth
            }}
            >
                {children}
            </AuthContext.Provider>

        </div>
    )
}

export default AuthProvider
