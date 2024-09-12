import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import avatar from "/avatar.webp";
import logo from "/icon.png";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";

export default function PrimaryNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => selectCurrentUser(state));
  const location = useLocation();

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !(
          event.target instanceof Node &&
          navbarRef.current.contains(event.target)
        )
      ) {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false); // Close mobile menu when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  console.log(isDropdownOpen);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="shadow-lg bg-white ">
      <div
        className="flex justify-between items-center w-full container mx-auto py-5 font-medium px-4 xl:px-0"
        ref={navbarRef}
      >
        {/* Logo */}
        <Link to={"/"} className="flex justify-between gap-4 items-center">
          <img src={logo} className="w-8 md:w-10" alt="Logo" />
          <h5 className="text-xl font-medium">MeetEase</h5>
        </Link>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            className="text-gray-700 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {/* Hamburger icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Links for Desktop */}
        <div className="hidden md:block">
          <ul className="flex gap-6 lg:gap-12">
            <li>
              <Link
                className={`${location.pathname == "/" && "text-rose-500"}`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname == "/meeting-rooms" && "text-rose-500"
                }`}
                to="/meeting-rooms"
              >
                Meeting Rooms
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname == "/about-us" && "text-rose-500"
                }`}
                to="/about-us"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname == "/contact-us" && "text-rose-500"
                }`}
                to="/contact-us"
              >
                Contact us
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-[72px] left-0 right-0 z-50 bg-white shadow-md p-4 md:hidden">
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  className={`${location.pathname == "/" && "text-rose-500"}`}
                  to="/"
                  onClick={toggleMobileMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    location.pathname == "/meeting-rooms" && "text-rose-500"
                  }`}
                  to="/meeting-rooms"
                  onClick={toggleMobileMenu}
                >
                  Meeting Rooms
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    location.pathname == "/about-us" && "text-rose-500"
                  }`}
                  to="/about-us"
                  onClick={toggleMobileMenu}
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    location.pathname == "/contact-us" && "text-rose-500"
                  }`}
                  to="/contact-us"
                  onClick={toggleMobileMenu}
                >
                  Contact us
                </Link>
              </li>
              {user?.role == "admin" && (
                <li>
                  <Link
                    className={`${
                      location.pathname == "/contact-us" && "text-rose-500"
                    }`}
                    to="/admin/dashboard/room-management"
                    onClick={toggleMobileMenu}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              {(user?.role == "user" || user?.role == "admin") && (
                <li>
                  <Link
                    className={`${
                      location.pathname == "/book-room/my-bookings" &&
                      "text-rose-500"
                    }`}
                    to="/book-room/my-bookings"
                    onClick={toggleMobileMenu}
                  >
                    My Bookings
                  </Link>
                </li>
              )}
              {!user && (
                <li>
                  <Link
                    className={`${
                      location.pathname == "/login" && "text-rose-500"
                    }`}
                    to="/admin/dashboard/room-management"
                    onClick={toggleMobileMenu}
                  >
                    Login
                  </Link>
                </li>
              )}
              {user && (
                <li>
                  <button
                    onClick={() => {
                      toggleMobileMenu();
                      handleLogout();
                    }}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}

        {/* User Avatar and Dropdown */}
        <div className="relative hidden md:block">
          <img
            className="w-12 rounded-full bg-cover cursor-pointer h-12"
            src={avatar}
            alt="User Avatar"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <>
              {user?.role == "user" && (
                <div className="rounded bg-white shadow-sm z-50 w-40 text-black absolute flex flex-col -left-[104px] mt-[21px]">
                  <Link
                    className="border-b border-gray-500 py-3 px-6 hover:bg-[#e3e3e3e9] rounded"
                    to={"/book-room/my-bookings"}
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="py-3 px-6 hover:bg-[#e3e3e3e9] rounded text-start"
                  >
                    Logout
                  </button>
                </div>
              )}
              {user?.role == "admin" && (
                <div className="rounded bg-white shadow-lg z-50 w-40 text-black border absolute flex flex-col -left-[104px] mt-[21px]">
                  <Link
                    className="border-b border-gray-300 py-3 px-6 hover:bg-[#e3e3e3e9] rounded"
                    to={"/book-room/my-bookings"}
                  >
                    My Bookings
                  </Link>
                  <Link
                    className="border-b border-gray-300 py-3 px-6 hover:bg-[#e3e3e3e9] rounded"
                    to={"/admin/dashboard/room-management"}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="py-3 px-6 hover:bg-[#e3e3e3e9] rounded text-start"
                  >
                    Logout
                  </button>
                </div>
              )}
              {!user && (
                <div className="rounded bg-white shadow-sm z-50 w-40 text-black absolute flex flex-col -left-[104px] mt-[21px]">
                  <Link
                    className="border-b border-gray-300 py-3 px-6 hover:bg-[#e3e3e3e9] rounded"
                    to={"/login"}
                  >
                    Login
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
