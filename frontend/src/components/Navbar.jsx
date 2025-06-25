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
    localStorage.removeItem('token');
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 left-0 z-50 border-b border-gray-200">
  <div className="max-w-7xl mx-auto flex items-center justify-between p-4 relative">
    {/* Logo */}
    <div className="flex items-center space-x-2">
      <img src={logo} alt="logo" className="h-8 animate-spin-slow" />
      <span className="font-bold text-xl text-gray-800">MyApp</span>
    </div>

    {/* Burger Button */}
    <button
      className="md:hidden flex flex-col space-y-1 p-2 focus:outline-none z-50"
      onClick={() => setIsOpen(!isOpen)}
      aria-label="Toggle menu"
    >
      <span className={`block w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
      <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
      <span className={`block w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
    </button>

    {/* Menu Links */}
    <div
      className={`flex flex-col md:flex-row md:items-center md:gap-6 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent transition-all duration-500 ease-in-out shadow-md md:shadow-none ${
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 md:opacity-100 md:translate-y-0"
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
        to="profile"
        className="block px-6 py-3 text-gray-700 hover:text-blue-600 hover:underline transition duration-300"
        onClick={() => setIsOpen(false)}
      >
        {user ? user.name : "Profile"}
      </Link>

      {user ? (
        <button
          onClick={() => {
            handleLogout();
            setIsOpen(false);
          }}
          className="mx-6 my-2 md:my-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300"
        >
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          className="mx-6 my-2 md:my-0 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300"
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
