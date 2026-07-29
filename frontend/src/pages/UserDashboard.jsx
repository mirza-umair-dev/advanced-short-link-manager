import { FaPlus } from "react-icons/fa6";
import { Navbar } from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import AnalyticsCard from "../components/cards/AnalyticsCard";
import UsersTable from "../components/UsersTable";
import UseLinks from "../context/UseLinks";
import { useState } from "react";
import GenerateLink from "../components/GenerateLink";

const UserDashboard = () => {
const { data} = UseLinks();

 const { latestLinks = [] } = data ?? {};
const [searchQuery, setsearchQuery] = useState('');
// console.log(data);
// console.log(data.latestLinks);

const filteredLinks = latestLinks.filter(item => 
    item.originalLink.toLowerCase().includes(searchQuery.toLowerCase()) || item.shortId.toLowerCase().includes(searchQuery.toLowerCase()));

const { totalClicks, totalLinks,uniqueVisitors,averageClicks } = data ?? {};

  return (
    <div className="w-screen min-h-screen">
      <Navbar />
     <div className="px-15 py-4">
        
        <div className="flex w-full mt-4 items-center justify-between">
          <h2 className="text-xl font-bold">Your Links</h2>
          <div className="flex gap-4 items-center">
            <Searchbar searchQuery={searchQuery} setsearchQuery={setsearchQuery} />
            <div>
              <button className=" flex gap-1  items-center px-3 py-2 hover:bg-accent2h rounded-lg transition-all bg-accent2 outline-0 font-semibold  font-sm w-full">
                
                <FaPlus size={12} />
                New link
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-4 items-center gap-4 w-full">
            <AnalyticsCard title={'Total Links'} count={totalLinks} />
            <AnalyticsCard title={'Total Click'} count={totalClicks} />
            <AnalyticsCard title={'Avg. click rate'} count={averageClicks} />
            <AnalyticsCard title={'uniqueVisitors'} count={uniqueVisitors} />
        </div>

        <div className="w-full mt-8">
            <UsersTable links={filteredLinks} />
        </div>
     </div>
     <div className="flex">
      <GenerateLink />
     </div>
    </div>
  );
};

export default UserDashboard;
