import { Link } from "react-router-dom";
import avatar from "../../../public/avatar.webp";
import { useEffect, useRef } from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import logo from "../../../public/icon.png";

export default function Navbar() {
  const avatarRef = useRef<HTMLImageElement>(null); // Ref for the avatar image
  const tooltipContentRef = useRef<HTMLDivElement>(null); // Ref for the tooltip content

  useEffect(() => {
    if (avatarRef.current && tooltipContentRef.current) {
      tippy(avatarRef.current, {
        content: tooltipContentRef.current,
        trigger: "click",
        interactive: true,
        placement: "bottom",
        hideOnClick: true,
      });
    }
  }, []);
  return (
    <div className="flex justify-between items-center w-full ">
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
      <div>
        <img
          className="w-12 rounded-full bg-cover cursor-pointer h-12"
          src={avatar}
          alt="User Avatar"
          ref={avatarRef}
        />
        <div
          ref={tooltipContentRef}
          className="tooltip-content  rounded bg-white w-40 text-black"
        >
          <ul className="">
            <li className="border-b  py-3 px-6 hover:bg-gray-100">
              <Link to={""}>My Bookings</Link>
            </li>
            <li className="py-3 px-6 hover:bg-gray-100">
              <Link to={""}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
