
import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import { getAdminAnalytics } from "../../api/adminApi";

import AnalyticsCard from "../../components/cards/AnalyticsCard";

import VisitorsChart from "../../charts/VisitorsChart";
import BrowserChart from "../../charts/BrowserChart";
import DeviceChart from "../../charts/DeviceChart";
import OperatingSystemChart from "../../charts/OperatingSystemChart";
import TrafficSourceChart from "../../charts/TrafficSourceChart";
import CountriesChart from "../../charts/CountriesChart";

const AdminAnalytics = () => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");

  const fetchAnalytics = async () => {
    try {
      setloading(true);
      seterror("");

      const res = await getAdminAnalytics();
      setdata(res);

      console.log(res);
    } catch (error) {
      seterror(
        error.response?.data?.message ||
        "Unable to load analytics"
      );
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <AdminLayout title="Platform Analytics">
        <div className="py-20 text-center text-lightext">
          Loading analytics...
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="Platform Analytics">
        <div className="mt-8 rounded-xl border border-red-300 p-5 text-red-500">
          <p>{error}</p>

          <button
            onClick={fetchAnalytics}
            className="mt-3 underline"
          >
            Try again
          </button>
        </div>
      </AdminLayout>
    );
  }

  const stats = [
    {
      title: "Total Links",
      count: data?.totalLinks || 0,
    },
    {
      title: "Total Clicks",
      count: data?.totalClicks || 0,
    },
    {
      title: "Average Clicks",
      count: data?.averageClicks || 0,
    },
    {
      title: "Unique Visitors",
      count: data?.uniqueVisitors || 0,
    },
  ];

  return (
    <AdminLayout title="Platform Analytics">

      <div className="mt-8 space-y-12">

        {/* Overview */}

        <section>
          <div className="mb-5">
            <h2 className="text-lg font-semibold">
              Platform Overview
            </h2>

            <p className="text-sm text-lightext mt-1">
              Overall performance across all users and links.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {stats.map((item) => (
              <AnalyticsCard
                key={item.title}
                title={item.title}
                count={item.count}
              />
            ))}
          </div>
        </section>

        {/* Traffic */}

        <section className="rounded-2xl border border-bd bg-surface p-5">
          <VisitorsChart
            trafficData={data?.trafficData || []}
          />
        </section>

        {/* Browser and Device */}

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          <div className="rounded-2xl border border-bd bg-surface p-5">
            <BrowserChart data={data?.browsers || []} />
          </div>

          <div className="rounded-2xl border border-bd bg-surface p-5">
            <DeviceChart data={data?.devices || []} />
          </div>

        </section>

        {/* Operating Systems */}

        <section className="rounded-2xl border border-bd bg-surface p-5">
          <OperatingSystemChart
            data={data?.operatingSystems || []}
          />
        </section>

        {/* Traffic Sources */}

        <section className="rounded-2xl border border-bd bg-surface p-5">
          <TrafficSourceChart
            data={data?.referrers || []}
          />
        </section>

        {/* Countries */}

        <section className="rounded-2xl border border-bd bg-surface p-5">
          <CountriesChart
            data={data?.countries || []}
          />
        </section>

        {/* Top Links */}

        <section className="rounded-2xl border border-bd bg-surface">

          <div className="p-5 border-b border-bd">
            <h2 className="text-lg font-semibold">
              Top Performing Links
            </h2>

            <p className="text-sm text-lightext mt-1">
              Links with the highest number of clicks.
            </p>
          </div>

          {data?.topLinks?.length > 0 ? (
            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead className="text-sm text-lightext border-b border-bd">
                  <tr>
                    <th className="p-4">Short ID</th>
                    <th className="p-4">Destination</th>
                    <th className="p-4">Owner</th>
                    <th className="p-4">Clicks</th>
                  </tr>
                </thead>

                <tbody>
                  {data.topLinks.map((link) => (
                    <tr
                      key={link._id}
                      className="border-b border-bd last:border-0"
                    >
                      <td className="p-4 font-semibold text-accent">
                        {link.shortId}
                      </td>

                      <td
                        className="p-4 max-w-64 truncate"
                        title={link.originalLink}
                      >
                        {link.originalLink}
                      </td>

                      <td className="p-4">
                        <div>
                          {link.createdBy?.name || "Unknown"}
                        </div>
                        <p className="text-xs text-lightext">
                          {link.createdBy?.email || ""}
                        </p>
                      </td>

                      <td className="p-4 font-semibold">
                        {link.clicks?.toLocaleString() || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          ) : (
            <p className="p-5 text-lightext">
              No links available.
            </p>
          )}

        </section>

      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
