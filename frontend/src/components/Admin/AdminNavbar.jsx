import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/ContextProvider";

const AdminNavbar = () => {
  const { user, logout } = useContext(AppContext);
  const [showMenu, setshowMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-bd bg-surface px-8 flex items-center justify-between">

      <Link
        to="/admin/dashboard"
        className="font-bold text-xl font-Inter"
      >
        Link Manager
        <span className="ml-2 text-xs text-accent">ADMIN</span>
      </Link>

      <div className="relative">

        <button
          onClick={() => setshowMenu(!showMenu)}
          className="h-10 w-10 rounded-full bg-accent2 font-semibold"
        >
          {user?.name?.charAt(0)?.toUpperCase()}
        </button>

        {showMenu && (
          <div className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-bd bg-surface p-4 shadow-lg">

            <h3 className="font-semibold">
              {user?.name}
            </h3>

            <p className="mb-4 text-sm text-lightext">
              {user?.email}
            </p>

            <button
              onClick={logout}
              className="w-full rounded-lg bg-red-500 px-3 py-2 text-white"
            >
              Logout
            </button>

          </div>
        )}

      </div>

    </header>
  );
};

export default AdminNavbar;