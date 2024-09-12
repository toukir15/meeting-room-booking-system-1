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
import PrimaryNavbar from "../components/shared/PrimaryNavbar";

export default function HomePage() {
  return (
    <>
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-[100]">
        <PrimaryNavbar />
      </div>

      {/* Add margin-top to avoid overlap with the fixed Navbar */}
      <div className="mt-[75px] h-[calc(100vh-75px)] md:h-[690px] lg:h-[735px] flex flex-col">
        <Hero />
      </div>

      {/* Service Advertisement Section */}
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

      {/* Featured rooms */}
      <FeturedRooms />

      {/* Why choose us */}
      <WhyChooesUs />

      {/* Step */}
      <Step />

      {/* Testimonial */}
      <Testmonial />
    </>
  );
}
