import { useContext, useState } from "react";
import { AppContext } from "../../context/ContextProvider";
import AdminLayout from "../../layouts/AdminLayout";
import Searchbar from "../../components/Searchbar";
import LinksTable from "../../components/LinksTable";

const AdminLinks = () => {
    const [searchQuery, setsearchQuery] = useState('');
    
    const {links} = useContext(AppContext);
    
    
      const filteredLinks = links?.filter(
        (item) =>
          item.originalLink.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.shortId.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    
    
        return (
            <AdminLayout 
            title={'Links Page'}
            >
                <div className='mt-8'>
                    <div>
                        <Searchbar searchQuery={searchQuery} setsearchQuery={setsearchQuery} />
                    </div>
                    <div className='mt-4'>
                        <LinksTable links={filteredLinks}/>
                    </div>
                </div>
    
    
            </AdminLayout>
        )
}

export default AdminLinks
