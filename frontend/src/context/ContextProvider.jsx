import { createContext, useEffect, useState } from "react"
import { API_PATHS } from "../utils/apiPaths";
import { instance } from "../utils/axiosInstance";



const AppContext = createContext();

const ContextProvider = ({children}) => {
     const [loading, setloading] = useState(true);
     const [links, setlinks] = useState([]);
    const [linksData, setlinksData] = useState([]);
    
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



      const getLinks = async () => {
        const res = await instance.get(API_PATHS.LINK.GET_LINKS);
        setlinks(res.data);
    }
    const getDashboardData = async () => {
        const res = await instance.get(API_PATHS.LINK.GET_DATA); 

        setlinksData(res.data);
    } 
    
      useEffect(() => {
        getUser();
        getLinks();
      }, []);






    return (
        <AppContext.Provider
        
        value={{
          user,
          setuser,
          getUser,
          logout,
          loading,
          getLinks,
          getDashboardData,
          links,
          linksData
        }}

        >

            {children}
        </AppContext.Provider>
    )
}

export default ContextProvider;
export {AppContext}
