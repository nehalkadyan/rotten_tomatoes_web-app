import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal, logoutUser } from "../redux/user/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  const { currentUser } = useSelector((state) => state.user);
  const [profileDropdown, setProfileDropdown] = useState(false); // State for profile dropdown

  const toggleProfileDropdown = () => {
    setProfileDropdown(!profileDropdown); // Toggle profile dropdown
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle mobile menu
  };

  return (
    <nav>
      <div className="md:p-3 p-2 bg-red-600 flex items-center justify-around">
        <Link to="/">
          <img
            onClick={() => setIsOpen(false)} // Close menu on logo click
            src="https://www.rottentomatoes.com/assets/pizza-pie/images/rtlogo.9b892cff3fd.png"
            alt="logo"
            className="w-24 sm:w-28 md:w-36 lg:w-52"
          />
        </Link>

        <div className="hidden md:block">
          <ul className="flex menu_items tracking-wide items-center gap-6 font-semibold text-white">
            <Link to="/movies">
              <li>MOVIES</li>
            </Link>
            <Link to="/shows">
              <li>TV SHOWS</li>
            </Link>
            <Link to="/watchlist">
              <li>WATCHLIST</li>
            </Link>
            {currentUser ? (
              <>
                <li
                  onClick={toggleProfileDropdown}
                  className="cursor-pointer relative"
                >
                  {currentUser.email}
                  <button
                    onClick={() => dispatch(logoutUser())} // Logout user
                    className={`${
                      profileDropdown
                        ? "block absolute bg-white rounded-lg shadow-md text-red-900 py-3 px-6 z-50 mt-3"
                        : "hidden"
                    }`}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li
                className="cursor-pointer"
                onClick={() => dispatch(toggleModal())} // Show login/signup modal
              >
                Login/Signup
              </li>
            )}
          </ul>
        </div>

        <div
          onClick={toggleMenu}
          className="md:hidden text-2xl transition-all duration-300 text-white"
        >
          {isOpen ? <IoMdClose /> : <RxHamburgerMenu />}{" "}
          {/* Mobile menu toggle */}
        </div>
      </div>
      <div
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } text-center relative w-full transition-all duration-300`}
      >
        <div className="md:hidden w-full z-10 absolute ">
          <ul className="flex p-3 bg-red-600 flex-col menu_items tracking-wide justify-center items-center gap-4 font-semibold text-white">
            <Link onClick={toggleMenu} to="/movies">
              <li>MOVIES</li>
            </Link>
            <Link onClick={toggleMenu} to="/shows">
              <li>TV SHOWS</li>
            </Link>
            <Link onClick={toggleMenu} to="/watchlist">
              <li>WATCHLIST</li>
            </Link>
            {currentUser ? (
              <>
                <li
                  onClick={toggleProfileDropdown}
                  className="cursor-pointer relative"
                >
                  {currentUser.email}
                  <button
                    onClick={() => dispatch(logoutUser())} // Logout user
                    className={`${
                      profileDropdown
                        ? "block absolute bg-white rounded-lg shadow-md text-red-900 py-3 px-6 z-50 mt-3"
                        : "hidden"
                    }`}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li
                className="cursor-pointer"
                onClick={() => dispatch(toggleModal())} // Show login/signup modal
              >
                Login/Signup
              </li>
            )}
          </ul>
        </div>
      </div>
      <Modal /> {/* Include the Modal component */}
    </nav>
  );
};

export default Navbar;
