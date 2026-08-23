import { FaPlus } from "react-icons/fa6";
import Searchbar from "../components/Searchbar";
import AnalyticsCard from "../components/cards/AnalyticsCard";
import UsersTable from "../components/LinksTable";
import UseLinks from "../hooks/UseLinks";
import { useState } from "react";
import { Link } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";

const UserDashboard = () => {
  const { data } = UseLinks();

  const { latestLinks = [] } = data ?? {};
  const [searchQuery, setsearchQuery] = useState("");

  const filteredLinks = latestLinks.filter(
    (item) =>
      item.originalLink.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortId.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const { totalClicks, totalLinks, uniqueVisitors, averageClicks } = data ?? {};

  return (
    <UserLayout title={"Your Links"}>
      <div className="flex gap-4 items-center mt-4">
        <Searchbar searchQuery={searchQuery} setsearchQuery={setsearchQuery} />

        <div>
          <Link to={"/generate-link"}>
            <button className=" flex gap-1  items-center px-3 py-2 hover:bg-accent2h rounded-lg transition-all bg-accent2 outline-0 font-semibold  font-sm w-full">
              <FaPlus size={12} />
              New link
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-4 items-center gap-4 w-full">
        <AnalyticsCard title={"Total Links"} count={totalLinks} />
        <AnalyticsCard title={"Total Click"} count={totalClicks} />
        <AnalyticsCard title={"Avg. click rate"} count={averageClicks} />
        <AnalyticsCard title={"uniqueVisitors"} count={uniqueVisitors} />
      </div>

      <div className="w-full mt-8">
        <UsersTable links={filteredLinks} />
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
