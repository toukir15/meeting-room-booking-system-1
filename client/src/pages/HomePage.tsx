import Navbar from "../components/home/Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoTimerOutline } from "react-icons/io5";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// import required modules
import { Navigation, Autoplay } from "swiper/modules"; // Import the Autoplay module
import { banner1, banner2, banner3, banner4, banner5, banner6 } from "..";
import { GoShieldCheck } from "react-icons/go";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import FeturedRooms from "../components/home/FeturedRooms";
import WhyChooesUs from "../components/home/WhyChooesUs";
import Step from "../components/home/Step";
import Testmonial from "../components/home/Testmonial";

export default function HomePage() {
  return (
    <>
      <div className="h-[700px] flex flex-col">
        <div className="absolute w-full px-28 top-6 z-50 text-white">
          <Navbar />
        </div>
        <div className="flex-1">
          {/* banner section  */}
          <div className=" relative">
            {/* Set to full height */}
            <Swiper
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              speed={3000}
              navigation={true}
              modules={[Navigation, Autoplay]}
              className="mySwiper h-[700px]"
            >
              <SwiperSlide>
                <div className="overlay-container h-full">
                  <img
                    src={banner1}
                    alt="Banner 1"
                    className="object-cover h-screen w-full"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="overlay-container h-full">
                  <img
                    src={banner2}
                    alt="Banner 2"
                    className="object-cover h-screen w-full"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="overlay-container h-full">
                  <img
                    src={banner3}
                    alt="Banner 3"
                    className="object-cover h-screen w-full"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="overlay-container h-full">
                  <img
                    src={banner4}
                    alt="Banner 4"
                    className="object-cover h-screen w-full"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="overlay-container h-full">
                  <img
                    src={banner5}
                    alt="Banner 5"
                    className="object-cover h-screen w-full"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="overlay-container h-full">
                  <img
                    src={banner6}
                    alt="Banner 6"
                    className="object-cover h-screen w-full"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
            <div className="absolute top-1/2 -translate-y-8 right-1/2 z-50  text-white font-medium translate-x-1/2">
              <h1 className="text-5xl mb-8 text-center">
                Book Your Ideal Meeting Room with Ease.
              </h1>
              <h2 className="text-xl text-center">
                Efficient, hassle-free room booking for all your meeting needs.
              </h2>
              <div className="mt-10 flex justify-center">
                <button className="bg-white hover:bg-[#d3d3d3] transition duration-200 text-black py-3 rounded-full px-10">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
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
