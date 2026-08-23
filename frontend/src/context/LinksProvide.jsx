import { createContext, useEffect, useState } from "react"
import { instance } from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";


const LinkContext = createContext();

const LinksProvider = ({children}) => {
    const [links, setlinks] = useState([]);
    const [linksData, setlinksData] = useState([]);
    const getLinks = async () => {
        const res = await instance.get(API_PATHS.LINK.GET_LINKS);
        setlinks(res.data);
    }
    const getDashboardData = async () => {
        const res = await instance.get(API_PATHS.LINK.GET_DATA); 

        setlinksData(res.data);
    } 
    useEffect(() => {
     getLinks();
    }, [])
    
    
    return (
       <LinkContext.Provider 
       value={{getLinks,links,linksData,getDashboardData}}
       >
       {children}
       </LinkContext.Provider>
    )
}

export default LinksProvider
