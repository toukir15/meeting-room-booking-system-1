import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import avatar from "/avatar.webp";
import logo from "/icon.png";

export default function Navbar() {
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
    <div className="flex justify-between items-center w-full" ref={navbarRef}>
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
          <div className="rounded bg-white w-40 text-black absolute -left-[104px] mt-2">
            <ul>
              <li className="border-b py-3 px-6 hover:bg-gray-100 rounded">
                <Link to={"/book-room/my-bookings"}>My Bookings</Link>
              </li>
              <li className="py-3 px-6 hover:bg-gray-100 rounded">
                <Link to={""}>Logout</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
