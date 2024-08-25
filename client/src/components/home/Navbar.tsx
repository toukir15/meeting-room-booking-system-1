import { Link } from "react-router-dom";
import avatar from "../../../public/avatar.webp";
import { useEffect, useRef } from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

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
      <div className="flex justify-between gap-8">
        <h4>Logo</h4>
        <h5>Meeting Room Booking</h5>
      </div>
      <div>
        <ul className="flex gap-12">
          <li>
            <Link to="">Home</Link>
          </li>
          <li>
            <Link to="">Meeting Rooms</Link>
          </li>
          <li>
            <Link to="">About us</Link>
          </li>
          <li>
            <Link to="">Contact us</Link>
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
