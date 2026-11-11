import AdminNavbar from "../components/admin/AdminNavbar";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen w-full bg-background">

      <AdminNavbar />

      <main className="flex min-h-[calc(100vh-4rem)]">

        <AdminSidebar />

        <div className="flex-1 min-w-0 overflow-y-auto px-8 py-8">

          <h1 className="text-2xl font-bold font-Inter">
            {title}
          </h1>

          {children}

        </div>

      </main>

    </div>
  );
};

export default AdminLayout;