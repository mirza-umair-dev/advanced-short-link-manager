import BrowserChart from "../../charts/BrowserChart";
import CountriesChart from "../../charts/CountriesChart";
import DeviceChart from "../../charts/DeviceChart";
import OperatingSystemChart from "../../charts/OperatingSystemChart";
import TrafficSourceChart from "../../charts/TrafficSourceChart";
import VisitorsChart from "../../charts/VisitorsChart";
import AnalyticsCard from "../../components/cards/AnalyticsCard";
import UseLinks from "../../hooks/UseLinks";
import UserLayout from "../../layouts/UserLayout";

const UserAnalytics = () => {
  const { data } = UseLinks();
  console.log(data);
  const {
    totalClicks,
    totalLinks,
    uniqueVisitors,
    averageClicks,
    browsers,
    trafficData,
    devices,
    operatingSystems,
    referrers,
    countries
  } = data ?? {};

  return (
    <UserLayout title={"User Analytics"}>
      <div className="mt-8 grid grid-cols-4 items-center gap-4 w-full">
        <AnalyticsCard title={"Total Links"} count={totalLinks} />
        <AnalyticsCard title={"Total Click"} count={totalClicks} />
        <AnalyticsCard title={"Avg. click rate"} count={averageClicks} />
        <AnalyticsCard title={"uniqueVisitors"} count={uniqueVisitors} />
      </div>
      <div className="mt-16">
        <VisitorsChart trafficData={trafficData || []} />
      </div>

      <div className="flex mt-16">
        <BrowserChart data={browsers || []} />
        <DeviceChart data={devices || []}/>
      </div>
      <div className="mt-16">
        <OperatingSystemChart data={operatingSystems || []} />
      </div >
      <div className="mt-16">
        <TrafficSourceChart data={referrers|| []} />
      </div>
      <div className="mt-16">
        <CountriesChart  data={countries||[]}/>
      </div>
    </UserLayout>
  );
};

export default UserAnalytics;
