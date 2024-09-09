import { IoTimerOutline } from "react-icons/io5";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// import required modules
import { GoShieldCheck } from "react-icons/go";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import FeturedRooms from "../components/home/FeturedRooms";
import WhyChooesUs from "../components/home/WhyChooesUs";
import Step from "../components/home/Step";
import Testmonial from "../components/home/Testmonial";
import Hero from "../components/home/Hero";
import Navbar from "../components/shared/PrimaryNavbar";

export default function HomePage() {
  return (
    <>
      <div className="h-[835px] md:h-[775px] lg:h-[808px] flex flex-col">
        <Navbar />
        <Hero />
      </div>

      {/* Service Advertisement Section: */}
      <div className="bg-[#f3f6fc] py-8 px-4 sm:px-8 md:px-16 lg:px-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        <div className="w-fit flex flex-col justify-center items-center text-center">
          <IoTimerOutline className="text-4xl text-[#62717A]" />
          <p className="mt-5 uppercase font-medium text-[#62717A] text-sm sm:text-base">
            Real-Time Availability
          </p>
        </div>
        <div className="w-fit flex flex-col justify-center items-center text-center">
          <GoShieldCheck className="text-4xl text-[#62717A]" />
          <p className="mt-5 uppercase font-medium text-[#62717A] text-sm sm:text-base">
            Instant Booking Confirmation
          </p>
        </div>
        <div className="w-fit flex flex-col justify-center items-center text-center">
          <RiCalendarScheduleLine className="text-4xl text-[#62717A]" />
          <p className="mt-5 uppercase font-medium text-[#62717A] text-sm sm:text-base">
            Flexible Scheduling
          </p>
        </div>
        <div className="w-fit flex flex-col justify-center items-center text-center">
          <BiSupport className="text-4xl text-[#62717A]" />
          <p className="mt-5 uppercase font-medium text-[#62717A] text-sm sm:text-base">
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
