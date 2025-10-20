import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav2 from "../components/Nav2";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import ApiService from "../services/ApiService";
import { useTranslation } from "react-i18next";
function Navbar() {
  const [atTop, setAtTop] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [sharUserData, setUserData] = useState(null);
  const { t } = useTranslation();
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setAtTop(y < 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
   
  // Check if user is logged in

  }, []);

 useEffect(() => {
    if(ApiService.isAuthenticated()){
    ApiService.getUserDataById()
      .then((res) => {
        if (res) {
          console.log(res)
          setUserData(res);

        }
      }).catch((err) => console.error("Error fetching user:", err));

      }
    
     
  }, []);
 

  const handleLogout = () => {
    ApiService.logout();
    setIsLoggedIn(false);
    setShowUserMenu(false);
    window.location.href = "/";
  };

  return (
    <>
      <Nav2 />
      <nav
        className={`w-full shadow-sm py-3 px-8 flex items-center justify-between fixed left-0 z-50 transition-all duration-200 ${
          atTop ? "top-10 bg-white" : "top-0 bg-[#F5EFE6]"
        }`}
        style={{ minHeight: "70px" }}
      >
        <div className="flex items-center space-x-2">

          <img
            src="/Logo/Logo.png"
            alt="Paradise Logo"
            className="h-12 w-12 object-contain"
          />
        </div>

        <ul className="flex space-x-8 text-base font-medium text-gray-700">
          <li>
            <a href="/" className="hover:text-[#0D1164]">
              {t("home")}
            </a>
          </li>
          <li>
            <a href="/packages" className="hover:text-[#0D1164]">
              {t("packages")}
            </a>
          </li>
          <li>
            <a href="/gallery" className="hover:text-[#0D1164]">
              {t("gallery")}
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-[#0D1164]">
             {t("about")}
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-[#0D1164]">
             {t("contact")}
            </a>
          </li>
        </ul>

        <div className="flex items-center space-x-4">
          {ApiService.isAuthenticated() ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 text-gray-700 font-medium hover:text-[#0D1164] focus:outline-none"
              >
                <FaUser className="text-lg" />
                <span className="hidden md:inline">{sharUserData?.name ?? sharUserData?.email?? ""}</span>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                     {t("welcome")}, {sharUserData?.name ?? sharUserData?.email??""}
                  </div>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <FaUser className="inline mr-2" />
                    {t("Profile")}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="inline mr-2" />
                    {t("Logout")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <a
                href="/login"
                className="text-gray-700 font-medium hover:text-[#0D1164]"
              >
                {t("signIn")}
              </a>
              <Link to="/signup">
                <button className="bg-[#0D1164] text-white px-5 py-2 font-medium hover:bg-[#0D1144] transition">
                  {t("Register")}
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
