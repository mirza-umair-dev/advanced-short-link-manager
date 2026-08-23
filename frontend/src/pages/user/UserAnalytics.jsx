import BrowserChart from "../../charts/BrowserChart";
import VisitorsChart from "../../charts/VisitorsChart";
import AnalyticsCard from "../../components/cards/AnalyticsCard";
import UseLinks from "../../hooks/UseLinks";
import UserLayout from "../../layouts/UserLayout"

const UserAnalytics = () => {
       const { data } = UseLinks();
       console.log(data);
      const { totalClicks, totalLinks, uniqueVisitors, averageClicks,browsers } = data ?? {};


    return (
        <UserLayout
        title={'User Analytics'}
        >

            <div>
                <VisitorsChart
  totalClicks={totalClicks || 0}
  uniqueVisitors={uniqueVisitors || 0}
/>
            </div>

            <div className="mt-8 grid grid-cols-4 items-center gap-4 w-full">
        <AnalyticsCard title={"Total Links"} count={totalLinks} />
        <AnalyticsCard title={"Total Click"} count={totalClicks} />
        <AnalyticsCard title={"Avg. click rate"} count={averageClicks} />
        <AnalyticsCard title={"uniqueVisitors"} count={uniqueVisitors} />
      </div>
      <div>
        <BrowserChart data={browsers || []} />
      </div>
      
            
        </UserLayout>
    )
}

export default UserAnalytics
