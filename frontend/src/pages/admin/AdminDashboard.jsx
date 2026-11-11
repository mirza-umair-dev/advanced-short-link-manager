import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../api/adminApi";
import AdminLayout from "../../layouts/AdminLayout";

const AdminDashboard = () => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getAdminDashboard();
        setdata(res);
      } catch (error) {
        seterror(
          error.response?.data?.message ||
          "Unable to load dashboard"
        );
      } finally {
        setloading(false);
      }
    };

    fetchDashboard();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: data?.totalUsers ?? 0,
    },
    {
      title: "Total Links",
      value: data?.totalLinks ?? 0,
    },
    {
      title: "Total Clicks",
      value: data?.totalClicks ?? 0,
    },
    {
      title: "Unique Visitors",
      value: data?.uniqueVisitors ?? 0,
    },
  ];

  return (
    <AdminLayout title="Dashboard Overview">

      {loading ? (
        <div className="py-20 text-center">
          Loading dashboard...
        </div>
      ) : error ? (
        <div className="mt-8 rounded-xl border border-red-300 p-5 text-red-500">
          {error}
        </div>
      ) : (
        <>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

            {stats.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-bd bg-surface p-5"
              >
                <p className="text-sm text-lightext">
                  {item.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  {item.value.toLocaleString()}
                </h2>
              </div>
            ))}

          </div>

          <div className="mt-10 rounded-2xl border border-bd bg-surface">

            <div className="border-b border-bd p-5">
              <h2 className="text-lg font-semibold">
                Recently Created Links
              </h2>
            </div>

            {data?.latestLinks?.length > 0 ? (
              <div className="overflow-x-auto">

                <table className="w-full text-left">

                  <thead className="border-b border-bd text-sm text-lightext">
                    <tr>
                      <th className="p-4">Short ID</th>
                      <th className="p-4">Destination</th>
                      <th className="p-4">Owner</th>
                      <th className="p-4">Clicks</th>
                    </tr>
                  </thead>

                  <tbody>

                    {data.latestLinks.map((link) => (
                      <tr
                        key={link._id}
                        className="border-b border-bd last:border-0"
                      >
                        <td className="p-4 font-medium text-accent">
                          {link.shortId}
                        </td>

                        <td
                          className="max-w-64 truncate p-4"
                          title={link.originalLink}
                        >
                          {link.originalLink}
                        </td>

                        <td className="p-4">
                          {link.createdBy?.name || "Unknown"}
                        </td>

                        <td className="p-4">
                          {link.clicks}
                        </td>
                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>
            ) : (
              <p className="p-5 text-lightext">
                No links found.
              </p>
            )}

          </div>

        </>
      )}

    </AdminLayout>
  );
};

export default AdminDashboard;
