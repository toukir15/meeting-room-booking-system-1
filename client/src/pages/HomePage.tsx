import Navbar from "../components/home/Navbar";
import { IoTimerOutline } from "react-icons/io5";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "./HomePage.css";

// import required modules
import { GoShieldCheck } from "react-icons/go";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import FeturedRooms from "../components/home/FeturedRooms";
import WhyChooesUs from "../components/home/WhyChooesUs";
import Step from "../components/home/Step";
import Testmonial from "../components/home/Testmonial";
import Hero from "../components/home/Hero";

export default function HomePage() {
  return (
    <>
      <div className="h-[700px] flex flex-col">
        <div className="absolute w-full px-28 top-6 z-50 text-white">
          <Navbar />
        </div>
        <Hero />
      </div>

      {/* Service Advertisement Section: */}
      <div className="bg-[#f3f6fc]  py-8 flex justify-between px-32">
        <div className="w-fit flex flex-col justify-center items-center">
          <IoTimerOutline className="text-4xl text-[#62717A]" />
          <p className="mt-5 uppercase font-medium text-[#62717A]">
            Real-Time Availability
          </p>
        </div>
        <div className="w-fit flex flex-col justify-center items-center">
          <GoShieldCheck className="text-4xl text-[#62717A]" />
          <p className="mt-5 uppercase font-medium text-[#62717A]">
            Instant Booking Confirmation
          </p>
        </div>
        <div className="w-fit flex flex-col justify-center items-center">
          <RiCalendarScheduleLine className="text-4xl text-[#62717A]" />
          <p className="mt-5 uppercase font-medium text-[#62717A]">
            Flexible Scheduling
          </p>
        </div>
        <div className="w-fit flex flex-col justify-center items-center">
          <BiSupport className="text-4xl text-[#62717A]" />
          <p className="mt-5 uppercase font-medium text-[#62717A]">
            24/7 Support
          </p>
        </div>
      </div>

      {/* fetured rooms  */}
      <FeturedRooms />

      {/* why choes us  */}
      <WhyChooesUs />

      {/* step  */}
      <Step />

      {/* testmonial  */}
      <Testmonial />
    </>
  );
}
