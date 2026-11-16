import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import Searchbar from "../../components/Searchbar";
import LinksTable from "../../components/LinksTable";
import { getAdminLinks } from "../../api/adminApi";

const AdminLinks = () => {
  const [searchQuery, setsearchQuery] = useState("");
  const [links, setlinks] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");

  const fetchLinks = async () => {
    try {
      setloading(true);
      seterror("");

      const res = await getAdminLinks();

      setlinks(res.links || []);
    } catch (error) {
      seterror(
        error.response?.data?.message || "Unable to fetch links"
      );
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const filteredLinks = links.filter(
    (item) =>
      item.originalLink
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.shortId
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.createdBy?.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.createdBy?.email
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout title="Links Management">
      <div className="mt-8 space-y-5">

        <Searchbar
          searchQuery={searchQuery}
          setsearchQuery={setsearchQuery}
        />

        {loading ? (
          <p className="py-10 text-center">Loading links...</p>
        ) : error ? (
          <div className="rounded-xl border border-red-300 p-5 text-red-500">
            {error}
            <button
              onClick={fetchLinks}
              className="ml-3 underline"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-bd bg-surface p-5">
                <p className="text-sm text-lightext">Total Links</p>
                <h2 className="mt-2 text-2xl font-bold">
                  {links.length}
                </h2>
              </div>

              <div className="rounded-xl border border-bd bg-surface p-5">
                <p className="text-sm text-lightext">Total Clicks</p>
                <h2 className="mt-2 text-2xl font-bold">
                  {links.reduce(
                    (total, link) => total + (link.clicks || 0),
                    0
                  )}
                </h2>
              </div>
            </div>

            <LinksTable links={filteredLinks} />
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminLinks;