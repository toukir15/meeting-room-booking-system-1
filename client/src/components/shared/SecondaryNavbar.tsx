import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import avatar from "/avatar.webp";
import logo from "/icon.png";

export default function SecondaryNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

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
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="shadow-sm text-[#2f3542] bg-[#f6f8fa]">
      <div
        className="flex justify-between items-center w-full  py-5  container mx-auto"
        ref={navbarRef}
      >
        <Link to={"/"} className="flex justify-between gap-4 items-center">
          <img src={logo} className="w-10" alt="" />
          <h5 className="text-xl font-medium">MeetEase</h5>
        </Link>
        <div>
          <ul className="flex gap-12">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/meeting-rooms">Meeting Rooms</Link>
            </li>
            <li>
              <Link to="/about-us">About us</Link>
            </li>
            <li>
              <Link to="/contact-us">Contact us</Link>
            </li>
          </ul>
        </div>
        <div className="relative">
          <img
            className="w-12 rounded-full bg-cover cursor-pointer h-12"
            src={avatar}
            alt="User Avatar"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="rounded bg-[#0B1221] z-50 w-40 text-white absolute flex flex-col -left-[104px] mt-2">
              <Link
                className="border-b border-gray-500 py-3 px-6 hover:bg-[#1d2537e9] rounded"
                to={"/book-room/my-bookings"}
              >
                My Bookings
              </Link>
              <Link className="py-3 px-6 hover:bg-[#1d2537e9] rounded" to={""}>
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
