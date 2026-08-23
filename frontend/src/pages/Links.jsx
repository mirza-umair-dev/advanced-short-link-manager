import { useContext, useState } from 'react'
import Searchbar from '../components/Searchbar'
import UserLayout from '../layouts/UserLayout'
import UsersTable from '../components/LinksTable';
import { AppContext } from '../context/ContextProvider';

const Links = () => {
    const [searchQuery, setsearchQuery] = useState('');

const {links} = useContext(AppContext);


  const filteredLinks = links?.filter(
    (item) =>
      item.originalLink.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortId.toLowerCase().includes(searchQuery.toLowerCase()),
  );


    return (
        <UserLayout 
        title={'Links Page'}
        >
            <div className='mt-8'>
                <div>
                    <Searchbar searchQuery={searchQuery} setsearchQuery={setsearchQuery} />
                </div>
                <div className='mt-4'>
                    <UsersTable links={filteredLinks}/>
                </div>
            </div>


        </UserLayout>
    )
}

export default Links
