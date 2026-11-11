import { NavLink } from "react-router-dom";
import { TbBrandGoogleAnalytics,TbListDetails } from "react-icons/tb";
import { FiLink } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
const sidebarLinks = [
  {
    title: "Overview",
    path: "/admin/dashboard",
    icon: TbListDetails,
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: FaRegUser
,
  },
  {
    title: "Links",
    path: "/admin/links",
    icon: FiLink,
  },
  {
    title: "Analytics",
    path: "/admin/analytics",
    icon: TbBrandGoogleAnalytics,
  },
];

const AdminSidebar = () => {
  return (
    <aside className="w-64 shrink-0 border-r border-bd bg-surface p-5">

      <p className="mb-5 px-3 text-xs font-semibold uppercase tracking-wider text-lightext">
        Administration
      </p>

      <nav className="space-y-2">

        {sidebarLinks.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg p-3 transition-all ${
                  isActive
                    ? "bg-accentdim text-accent font-semibold"
                    : "hover:bg-glasss text-lightext"
                }`
              }
            >
              <Icon size={19} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}

      </nav>

    </aside>
  );
};

export default AdminSidebar;