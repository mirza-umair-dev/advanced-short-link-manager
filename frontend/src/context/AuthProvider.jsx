import { useEffect, useState } from "react";
import { instance } from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { AuthContext } from "./authContext";

const AuthProvider = ({ children }) => {
  const [loading, setloading] = useState(true);

  const [user, setuser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const getUser = async () => {
    try {
      const res = await instance.get(API_PATHS.AUTH.MY_PROFILE);
      setuser(res.data.user);
      localStorage.setItem("user", JSON.stringify({
        name:res.data.user.name,
        email:res.data.user.email
      }));
    } catch (error) {
      localStorage.removeItem("user");
      setuser(null);
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  const logout = async () => {
    await instance.post(API_PATHS.AUTH.SIGN_OUT);
    setuser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <AuthContext.Provider
        value={{
          user,
          setuser,
          getUser,
          logout,
          loading,
        }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
