import {NavLink } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import { MdAddLink } from "react-icons/md";
import { FiLink } from "react-icons/fi";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
const Sidebar = () => {

    const sidebarLinks = [
  {
    id: 1,
    title: "Overview",
    path: "/",
    icon: TbListDetails,
  },
  {
    id: 2,
    title: "Generate Link",
    path: "/generate-link",
    icon: MdAddLink,
  },
  {
    id: 3,
    title: "Links",
    path: "/links",
    icon: FiLink,
  },
  {
    id: 4,
    title: "Analytics",
    path: "/analytics",
    icon: TbBrandGoogleAnalytics,
  },
];


  return (
   <aside className="w-64
        shrink-0
        sticky
        top-16
        h-[calc(100vh-4rem)] bg-surface border-r border-bd p-5">
      <ul className="space-y-2">

        {sidebarLinks.map((item) => {

          const Icon = item.icon;

          return (
            <li key={item.id}>

              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? "bg-accentdim"
                      : "hover:bg-glasss"
                  }`
                }
              >

                <Icon size={20} />

                <span>{item.title}</span>

              </NavLink>

            </li>
          );
        })}

      </ul>

      

    </aside>

  );
};

export default Sidebar;
