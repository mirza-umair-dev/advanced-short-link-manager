import { useEffect, useState } from "react";
import { Search, Users, RefreshCw } from "lucide-react";
import { instance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const getUsers = async () => {
        const res = await instance.get(API_PATHS.LINK.GET_USERS);
        setUsers(res.data.users || []);
      };

      getUsers();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Search users by name or email
  const filteredUsers = users.filter((user) => {
    const searchValue = search.toLowerCase();

    return (
      user.name?.toLowerCase().includes(searchValue) ||
      user.email?.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-lightext">
            Users Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor all registered users.
          </p>
        </div>

        <button
          onClick={fetchUsers}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-lg border border-bd bg-surface px-4 py-2.5 text-sm text-lightext transition hover:bg-accentdim disabled:opacity-50"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Total Users Card */}
      <div className="flex items-center gap-4 rounded-xl border border-bd bg-surface p-5">
        <div className="rounded-lg bg-accentdim p-3 text-accent">
          <Users size={24} />
        </div>

        <div>
          <p className="text-sm text-gray-500">Total Users</p>

          <h2 className="text-2xl font-semibold text-lightext">
            {users.length}
          </h2>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users by name or email..."
          className="w-full rounded-lg border border-bd bg-surface py-3 pl-10 pr-4 text-sm text-lightext outline-none transition focus:border-accent"
        />
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-xl border border-bd bg-surface">
        {loading ? (
          <div className="p-10 text-center text-sm text-gray-500">
            Loading users...
          </div>
        ) : error ? (
          <div className="p-10 text-center">
            <p className="text-sm text-red-500">{error}</p>

            <button
              onClick={fetchUsers}
              className="mt-3 text-sm text-accent hover:underline"
            >
              Try Again
            </button>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-10 text-center text-sm text-gray-500">
            No users found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">
              <thead className="border-b border-bd text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-5 py-4">User</th>
                  <th className="px-5 py-4">Role</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Joined Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-bd">
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="transition hover:bg-accentdim/30"
                  >
                    {/* User Details */}
                    <td className="px-5 py-4">
                      <p className="font-medium text-lightext">{user.name}</p>

                      <p className="mt-1 text-xs text-gray-500">{user.email}</p>
                    </td>

                    {/* Role */}
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-accentdim px-3 py-1 text-xs capitalize text-accent">
                        {user.role}
                      </span>
                    </td>

                    {/* Verification */}
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          user.isVerified
                            ? "bg-green-500/10 text-green-500"
                            : "bg-yellow-500/10 text-yellow-500"
                        }`}
                      >
                        {user.isVerified ? "Verified" : "Pending"}
                      </span>
                    </td>

                    {/* Registration Date */}
                    <td className="px-5 py-4 text-sm text-gray-500">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Results Count */}
      {!loading && !error && (
        <p className="text-sm text-gray-500">
          Showing {filteredUsers.length} of {users.length} users
        </p>
      )}
    </div>
  );
};

export default AdminUsers;
