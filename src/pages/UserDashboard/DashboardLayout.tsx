import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHistory, FaImages, FaSignOutAlt, FaChevronLeft,FaStar } from "react-icons/fa";
import ApiService from "../../services/ApiService";

type DashboardLayoutProps = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
};

const SidebarItem: React.FC<{
  to: string;
  icon: React.ReactNode;
  label: string;
}> = ({ to, icon, label }) => {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-150 ${
        active
          ? "bg-white/10 text-white"
          : "text-gray-200 hover:bg-white/10 hover:text-white"
      }`}
    >
      <span className="text-base">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ title, subtitle, children }) => {
  const navigate = useNavigate();
  const [sharUserData, setUserData] = useState<any>(null);
  
    useEffect(() => {
   
    ApiService.getUserDataById()
      .then((res) => {
        if (res) {
          setUserData(res);

        }
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, []);
 

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className="w-[260px] shrink-0 h-full bg-[#0D1244] text-white border-r border-white/10 flex flex-col"
        style={{ boxShadow: "inset -1px 0 0 rgba(255,255,255,0.04)" }}
      >
        <div className="px-4 py-5 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold">
           {sharUserData?.name?.charAt(0) ?? ""}
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">{sharUserData?.name ?? ""}</div>
            <div className="text-[11px] text-white/70">Good Morning</div>
          </div>
        </div>

        <nav className="px-3 py-4 flex-1 flex flex-col gap-2">
          <SidebarItem to="/bookinghistory" icon={<FaHistory />} label="Booking History" />
          <SidebarItem to="/userreview" icon={<FaStar/>} label="Reviews" />
          <SidebarItem to="/sharephotos" icon={<FaImages />} label="Share Photos" />
        </nav>

        <div className="mt-auto p-3">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-gray-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <FaChevronLeft />
            <span className="text-sm font-medium">Back to site</span>
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 min-w-0 h-full overflow-y-auto">

        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-gray-200 flex items-start justify-between px-6 md:px-10 pt-6 pb-4">
          <div>
            <div className="text-sm text-gray-500">Welcome back, {sharUserData?.name ?? ""}</div>
            <div className="text-xs text-gray-400"> {sharUserData?.email ?? ""}</div>
            {title && (
              <h1 className="text-xl md:text-2xl font-semibold mt-3 text-gray-900">{title}</h1>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          <button
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 text-sm font-medium"
            onClick={() => {

              ApiService.logout();
              navigate("/");
            }}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>


        <div className="px-6 md:px-10 pb-10">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
