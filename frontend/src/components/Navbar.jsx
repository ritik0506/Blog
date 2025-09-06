import { useState } from "react";
import { logo } from "../assets/assets.js";
import { Link,  } from "react-router-dom";

const Navbar = () => {
  const [token,setToken]= useState('')
  // const [status,setStaus] = useState('')


  const logoutHandler = () => {
    localStorage.removeItem('token')
    setToken('')
  }
  


  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to='/'><img
            className="w-10 h-10 border-2 border-gray-600 rounded-full"
            src={logo}
            alt="Logo"
          /></Link>
         <Link to={'/'}> <h1 className="ml-3 text-xl font-bold text-gray-800">BlogApp</h1></Link>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Contact
            </a>
          </li>
          <li>
            <Link
              to="/create-post"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Create Blog
            </Link>
          </li>
        </ul>

        {/* Profile Section */}
        {/* Profile Section */}
<div className="relative group">
  <button className="flex items-center focus:outline-none">
    {/* <img
      src="https://via.placeholder.com/40"
      alt="Profile"
      className="w-10 h-10 rounded-full border-2 border-gray-600"
    /> */}
    <span className="ml-2 hidden md:block text-gray-800 font-semibold">
      {token ? "Profile":"Login"}
    </span>
  </button>

  {/* Dropdown Menu */}
  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20 opacity-0 group-hover:opacity-100 group-hover:block transition-opacity duration-200">
    <a
      href="#profile"
      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
    >
      My Blogs
    </a>
    <Link
      to="/login"
      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
    >
      Login
    </Link>
    <button onClick={logoutHandler}
      href="#logout"
      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
    >
      Logout
    </button>
  </div>
</div>



        {/* Mobile Menu Toggle */}
        <button className="md:hidden flex items-center px-3 py-2 border rounded text-gray-600 border-gray-400">
          <svg
            className="fill-current h-4 w-4"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
