import { Link } from "react-router-dom";
import logo from "/icon.png";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="footer text-gray-800 bg-[#E6EBEE] relative">
      <div className="container lg:mx-auto p-8 lg:px-12 py-8 lg:py-20">
        <div className="lg:flex justify-between">
          {/* footer first column */}
          <div>
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div>
                <img src={logo} className="w-8 h-8 relative bottom-1" alt="" />
              </div>
              <h3 className="lg:text-[28px] text-[24px] font-medium ">
                MeetEase
              </h3>
            </div>
            <p className="mt-2 lg:mt-8">
              From 2019, we've empowered 100+ fast-growing <br /> companies
              across 10+ industries with impactful solutions.
            </p>
            <div className="mt-3 lg:mt-8 flex gap-4">
              <Link to={"https://www.facebook.com/toukir.ahmed.215/"}>
                <button className="bg-white text-blue-500 p-3 text-xl rounded-full shadow-lg hover:bg-[#f0f4f8]">
                  <FaFacebookF />
                </button>
              </Link>
              <Link to={"https://github.com/toukir15"}>
                <button className="bg-white text-black p-3 text-xl rounded-full shadow-lg hover:bg-[#f0f4f8]">
                  <FaGithub />
                </button>
              </Link>
              <Link to={"https://www.linkedin.com/in/toukir15/"}>
                <button className="bg-white text-blue-600 p-3 text-xl rounded-full shadow-lg hover:bg-[#f0f4f8]">
                  <FaLinkedinIn />
                </button>
              </Link>
              <Link to={"https://x.com/toukir_ahm9211"}>
                <button className="bg-white text-black p-3 text-xl rounded-full shadow-lg hover:bg-[#f0f4f8]">
                  <FaXTwitter />
                </button>
              </Link>
            </div>
          </div>
          {/* footer second column */}
          <div className="flex flex-col mt-6 lg:mt-0 lg:gap-4 text-md lg:text-lg">
            <Link
              to={"/"}
              className="hover:text-rose-500 transition duration-200"
            >
              Home
            </Link>
            <Link
              to={"/meeting-rooms"}
              className="hover:text-rose-500 transition duration-200"
            >
              Meeting Rooms
            </Link>
            <Link
              to={"/about-us"}
              className="hover:text-rose-500 transition duration-200"
            >
              About Us
            </Link>
            <Link
              to={"/contact-us"}
              className="hover:text-rose-500 transition duration-200"
            >
              Contact Us
            </Link>
          </div>
          {/* footer third column */}
          <div className="flex flex-col mt-6 lg:mt-0 lg:gap-4 text-md lg:text-lg">
            <button className="text-start hover:text-rose-500 transition duration-200">
              Online Delivery
            </button>
            <button className="text-start hover:text-rose-500 transition duration-200">
              Refund and Return Policy
            </button>
            <button className="text-start hover:text-rose-500 transition duration-200">
              Online Delivery
            </button>
            <button className="text-start hover:text-rose-500 transition duration-200">
              Terms and Conditions
            </button>
          </div>
          {/* footer fourth column */}
          <div>
            <p className="font-medium text-start">MeetEase</p>
            <p className="mt-4">
              Head Office: 28 Kazi Nazrul Islam Ave, <br /> Navana Zohura
              Square, Dhaka 1000
            </p>
            <p className="font-medium text-start mt-4">Email:</p>
            <p className="lg:mt-4">meetease@gmail.com</p>
          </div>
        </div>
      </div>
      {/* <div className="absolute bottom-44 -left-64 hidden h-[150px] w-[900px] -rotate-45 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-800 opacity-30 blur-3xl filter dark:block lg:bottom-24 lg:-left-20 lg:h-28 lg:w-[250px] lg:-rotate-12 lg:opacity-20 xl:h-40 xl:w-[400px]"></div>
      <div className="absolute right-[28%] top-0 hidden h-[150px] w-[200px] rotate-12 rounded-3xl bg-gradient-to-l from-violet-600 to-indigo-800 opacity-20 blur-3xl filter dark:block dark:opacity-30 lg:top-44 lg:right-20 lg:h-48 lg:w-[350px] xl:h-32 xl:w-[400px]"></div> */}
    </div>
  );
}
