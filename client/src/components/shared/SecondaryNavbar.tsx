import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import avatar from "/avatar.webp";
import logo from "/icon.png";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { RootState } from "../../redux/store";

export default function SecondaryNavbar() {
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
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="shadow-sm text-[#2f3542] bg-[#f5f5f5]">
      <div
        className="flex justify-between items-center w-full py-5 container mx-auto font-medium px-8 xl:px-0"
        ref={navbarRef}
      >
        {/* Logo */}
        <Link to={"/"} className="flex justify-between gap-4 items-center">
          <img src={logo} className="w-10" alt="Logo" />
          <h5 className="text-xl font-medium">MeetEase</h5>
        </Link>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            className="text-gray-700 focus:outline-none"
            onClick={toggleMobileMenu}
          >
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
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/meeting-rooms" && "text-rose-500"
                }`}
                to="/meeting-rooms"
              >
                Meeting Rooms
              </Link>
            </li>
            <li>
              <Link to="/about-us">About us</Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/contact-us" && "text-rose-500"
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
                <Link to="/" onClick={toggleMobileMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/meeting-rooms"
                  className={`${
                    location.pathname === "/meeting-rooms" && "text-rose-500"
                  }`}
                  onClick={toggleMobileMenu}
                >
                  Meeting Rooms
                </Link>
              </li>
              <li>
                <Link to="/about-us" onClick={toggleMobileMenu}>
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contact-us" onClick={toggleMobileMenu}>
                  Contact us
                </Link>
              </li>
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
              {user?.role === "user" && (
                <div className="rounded bg-[#0B1221] z-50 w-40 text-white absolute flex flex-col -left-[104px] mt-[21px]">
                  <Link
                    className="border-b border-gray-500 py-3 px-6 hover:bg-[#1d2537e9] rounded"
                    to="/book-room/my-bookings"
                  >
                    My Bookings
                  </Link>
                  <button
                    className="py-3 px-6 text-start hover:bg-[#1d2537e9] rounded"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
              {user?.role === "admin" && (
                <div className="rounded bg-[#0B1221] z-50 w-40 text-white absolute flex flex-col -left-[104px] mt-[21px]">
                  <Link
                    className="border-b border-gray-500 py-3 px-6 hover:bg-[#1d2537e9] rounded"
                    to="/admin/dashboard/room-management"
                  >
                    Dashboard
                  </Link>
                  <button
                    className="py-3 px-6 text-start hover:bg-[#1d2537e9] rounded"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
