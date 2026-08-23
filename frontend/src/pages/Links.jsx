import { useContext, useState } from 'react'
import Searchbar from '../components/Searchbar'
import UserLayout from '../layouts/UserLayout'
import UsersTable from '../components/LinksTable';
import LinksProvider from '../context/LinksProvide';
// import UseLinks from '../hooks/UseLinks';

const Links = () => {
    const [searchQuery, setsearchQuery] = useState('');
//     const { data} = UseLinks();

//   const { links = [] } = data ?? {};

const {links} = useContext(LinksProvider);


  const filteredLinks = links.filter(
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
