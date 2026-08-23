import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../context/ContextProvider";
export const Navbar = () => {
  const { user, logout} = useContext(AppContext);
  const [showpop, setshowpop] = useState(false);
  return (
    <div className="sticky top-0 z-50 h-16 bg-surface border-b border-bd flex items-center justify-between px-10">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-accent rounded-full"></div>
        <Link to="/">Link Manager</Link>
      </div>
      <div>
        <div
          className="rounded-full h-10 w-10 bg-accent2 font-semibold flex items-center justify-center text-lg cursor-pointer"
          onClick={() => setshowpop(!showpop)}
        >
          {user?.name[0].toUpperCase()}
        </div>
        {showpop && (
          <div className="relative">
            <div className=" z-50 flex px-4 py-3 flex-col gap-1 border border-bd rounded-lg absolute top-6 right-0 bg-surface">
              <h3 className="font-semibold text-xl">{user?.name}</h3>
              <p className="text-sm">{user?.email}</p>
              <button
                className="bg-red-500 px-2 py-1 text-white rounded cursor-pointer"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
