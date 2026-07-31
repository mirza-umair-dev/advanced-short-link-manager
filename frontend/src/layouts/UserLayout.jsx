import { Navbar } from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const UserLayout = ({ children, title }) => {
  return (
    <div className="w-screen min-h-screen">
      <Navbar />

      <main className="flex  h-[calc(100vh-4rem)]">
        <Sidebar />
        <div className="flex-1 overflow-y-auto px-8 py-10">
          <h2 className="text-2xl font-semibold font-Inter">{title} </h2>
          {children}
        </div>
      </main>
    </div>
  );
};

export default UserLayout;
