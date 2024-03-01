import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import PropTypes from "prop-types";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/avatar-svgrepo-com.svg";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setUsername(jwtDecode(token).email);
    }
  }, []);


  // Array containing navigation items
  const navItems = [
    { id: 0, text: "About" },
    { id: 1, text: "Features" },
    { id: 2, text: "Solutions" },
    { id: 3, text: "Pricing" },
  ];

  return (
    <div className="bg-white flex justify-around items-center h-24 max-w-[1240px] mx-auto mb-20 px-4 text-black">
      {/* Logo */}
      <Link to="/" className="w-[10%]">
        <img src={Logo} alt="logo" className="w-full" />
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <li
            key={item.id}
            className="px-4 py-2  rounded-xl m-2 cursor-pointer text-bold font-medium"
          >
            <Link to="#">{item.text}</Link>
          </li>
        ))}
        {isLoggedIn ? (
          " "
        ) : (
          <li className="px-4 py-2 rounded-xl bg-[#12A3ED] m-2 cursor-pointer font-semibold text-white">
            <Link to="/login">Signin</Link>
          </li>
        )}

        {isLoggedIn ? (
          <></>
        ) : (
          <li className="px-4 py-2 rounded-xl bg-[#F0F2F5] m-2 cursor-pointer font-semibold">
            <Link to="register">Getting started</Link>
          </li>
        )}
      </ul>

      {isLoggedIn && (
        <div className="outline-none text-center w-[7%] rounded-full">
          <button
            onClick={toggleDropdown}
            type="button"
            className="inline-flex items-center justify-center w-[100%] rounded-full border border-transparent text-sm font-medium text-white focus:outline-none"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            {/* Add your user avatar or icon here */}
            <span className="w-[100%]">
              <img src={avatar} className="w-[100%]" sizes="30" />
            </span>
          </button>

          {/* Dropdown Content */}
          {isDropdownOpen && (
            <div
              className="origin-top-right absolute right-0 mt-2 w-[20%] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="py-1 " role="none">
                <p className="hover:bg-blue-gray-100">{username}</p>
                <button
                  type="button"
                  className="block px-4 py-2 text-sm w-full items-center text-center"
                  role="menuitem"
                  onClick={() => {
                    // Add logout logic here
                    localStorage.clear("token");
                    setIsLoggedIn(false);
                    navigate("/");
                    toggleDropdown();
                  }}
                >
                  <ArrowLeftEndOnRectangleIcon className="h-5 w-5 mx-auto text-blue-500" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default Navbar;
