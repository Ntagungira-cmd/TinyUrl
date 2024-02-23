import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  //clear token from localstorage
  const handleLogOut = () => {
    localStorage.clear("token");
    navigate("/")
  };

  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 0, text: "About" },
    { id: 1, text: "Features" },
    { id: 2, text: "Solutions" },
    { id: 3, text: "Pricing" },
  ];

  return (
    <div className="bg-white flex justify-around items-center h-24 max-w-[1240px] mx-auto px-4 text-black">
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
        <li className="px-4 py-2 rounded-xl bg-[#12A3ED] m-2 cursor-pointer font-semibold text-white">
          <Link to="/login">Signin</Link>
        </li>
        {isLoggedIn ? (
          <button
            className="px-4 py-2 rounded-xl bg-red-300 m-2 cursor-pointer font-semibold text-white"
            onClick={handleLogOut}
          >
            logout
          </button>
        ) : (
          <li className="px-4 py-2 rounded-xl bg-[#F0F2F5] m-2 cursor-pointer font-semibold">
            <Link to="register">Getting started</Link>
          </li>
        )}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {/* Mobile Logo */}
        <h1 className="w-full text-3xl font-bold text-[#000] m-4">TinyUrl</h1>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 border-b rounded-xl hover:bg-[#fff] duration-300 hover:text-black cursor-pointer border-gray-600"
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default Navbar;
