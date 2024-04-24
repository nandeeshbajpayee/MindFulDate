import React, { useState, useEffect } from "react";
import Logo from "./logo.png";
import { Link } from "react-router-dom";
import { IoIosLogIn } from "react-icons/io";

const NavBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = async () => {
    try {
      // Send request to clear the cookie
      const response = await fetch("http://localhost:8000/auth/logout");
      if (response.ok) {
        // Clear cookie on successful logout
        document.cookie = "loginedUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setIsLoggedIn(false); // Update state to reflect user is logged out
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    // Check if cookie exists
    const cookieExists = document.cookie.split(';').some((item) => item.trim().startsWith('loginedUser='));
    setIsLoggedIn(cookieExists);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 20) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`navbar-container h-20 w-[400px] sm:w-full bg-slate-100 flex justify-around items-center fixed z-50 ${isCollapsed ? "top-0" : "top-10"
        }`}
      style={{ transition: "top 0.3s ease-in-out" }}
    >
      {/* Add this clikable at below tag  */}
      <div className="logo">
        <a href="#home"> <img src={Logo} alt="MindFulAi" className="w-40 h-15" /></a>
      </div>
      <div className="menus flex gap-2 items-center">
        <ul className="flex gap-12 text-xl items-center p-2 cursor-pointer">
          {/* <li>
            <Link to="/">Home</Link>
          </li> */}
          <li>
            <Link to="/community">Community</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/users">search partner</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          {isLoggedIn ? (
            <button
              className="flex items-center bg-red-400 p-2 rounded text-white cursor-pointer w-[120px]"
              onClick={handleLogout}
            >
              Logout
              <IoIosLogIn className="size-8" />
            </button>
          ) : (
            <>
              <Link to="/auth/login">
                <button className="flex items-center bg-red-400 p-2 rounded text-white cursor-pointer w-[120px]">
                  Login
                  <IoIosLogIn className="size-8" />
                </button>
              </Link>
              <Link to="/auth/register">
                <button className="flex items-center bg-red-400 p-2 rounded text-white cursor-pointer w-[120px]">
                  Register
                  <IoIosLogIn className="size-8" />
                </button>
              </Link>
            </>

          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
