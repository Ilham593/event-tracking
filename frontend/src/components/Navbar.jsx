import { useState } from "react";
import logo from "../assets/react.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-md fixed w-full top-0 left-0 z-50 border-b border-gray-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 relative">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="logo" className="h-8 w-auto animate-spin-slow" />
          <span className="font-extrabold text-xl tracking-wide text-gray-800">
            MyApp
          </span>
        </div>

        {/* Burger Menu */}
        <button
          className="md:hidden flex flex-col space-y-1 p-2 focus:outline-none z-[60]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-800 transform transition duration-300 ${
              isOpen ? "rotate-45 translate-y-[6px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-800 transition duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-800 transform transition duration-300 ${
              isOpen ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          />
        </button>

        {/* Navigation Links */}
        <div
          className={`flex flex-col md:flex-row md:items-center md:gap-6 absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent transition-all duration-500 ease-in-out md:translate-y-0 md:opacity-100 ${
            isOpen
              ? "opacity-100 translate-y-0 shadow-lg"
              : "opacity-0 -translate-y-5 pointer-events-none md:pointer-events-auto md:opacity-100"
          }`}
        >
          <Link
            to="/"
            className="block px-6 py-3 text-gray-700 hover:text-blue-600 hover:underline transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/myticket"
            className="block px-6 py-3 text-gray-700 hover:text-blue-600 hover:underline transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            My Ticket
          </Link>
          <Link
            to="/profile"
            className="block px-6 py-3 text-gray-700 hover:text-blue-600 hover:underline transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            {user ? user.name : "<'_'>"}
          </Link>

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="mx-6 my-2 md:my-0 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="mx-6 my-2 md:my-0 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
