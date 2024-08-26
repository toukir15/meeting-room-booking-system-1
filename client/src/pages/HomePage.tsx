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
import calendar from "../../public/images/whyChooes/calendar.svg";
import building from "../../public/images/whyChooes/building.svg";
import team from "../../public/images/whyChooes/team.svg";
import desking from "../../public/images/whyChooes/desking.svg";
import sprout from "../../public/images/whyChooes/sprout.svg";
import analytics from "../../public/images/whyChooes/analytics.svg";
import startup from "../../public/images/whyChooes/startup.svg";
import { GoShieldCheck } from "react-icons/go";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import FeturedRooms from "../components/home/FeturedRooms";
import {
  FaArrowUp,
  FaCheck,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa6";
import selectRoom from "../../public/images/step/selectRoom.png";
import timetable from "../../public/images/step/timetable.png";
import confirm from "../../public/images/step/confirm.png";
import customer1 from "../../public/images/testmonial/customer1.jpg";
import customer2 from "../../public/images/testmonial/customer2.jpg";
import customer3 from "../../public/images/testmonial/customer3.jpg";
import { MdKeyboardArrowRight } from "react-icons/md";
import Footer from "../components/home/Footer";

export default function HomePage() {
  return (
    <>
      <div className="h-[700px] flex flex-col">
        <div className="absolute w-full px-28 top-6 z-50 text-white">
          <Navbar />
        </div>
        <div className="flex-1">
          {/* Flex container to take remaining space */}
          {/* banner section  */}
          <div className=" relative">
            {/* Set to full height */}
            <Swiper
              autoplay={{
                delay: 3000, // Delay between slides (in ms)
                disableOnInteraction: false,
              }}
              speed={3000}
              navigation={true}
              modules={[Navigation, Autoplay]} // Include Autoplay in modules array
              className="mySwiper h-[700px]" // Ensure Swiper takes full height
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
      <section className="mb-32 bg-[#F7F9FB] py-32">
        <div className="container mx-auto">
          <div className="grid grid-cols-4 mt-20">
            <div className="w-[385px] bg-white p-8 flex justify-center items-center rounded">
              <h1 className="text-center text-4xl text-gray-800 font-bold">
                Why Chooes Us?
              </h1>
            </div>
            <div className="w-[385px] group transition duration-200 p-8 rounded">
              <img className="w-24" src={building} alt="" />
              <h5 className="text-2xl font-medium my-4">
                Optimise office space
              </h5>
              <p>
                Commit to a smaller office space (even as your team grows!) and
                save money.
              </p>
              <div className="flex justify-end">
                <button className=" group-hover:rotate-45 transition-all duration-200 relative bottom-0 rotate-90 bg-white p-6 rounded-full mt-6 text-[20px]">
                  <FaArrowUp />
                </button>
              </div>
            </div>

            <div className="w-[385px] group transition duration-200 bg-white p-8 rounded">
              <img className="w-24" src={team} alt="" />
              <h5 className="text-2xl font-medium my-4">Elevate experience</h5>
              <p>
                Boost your workplace's UX with tools that enable flexibility,
                visibility, autonomy.
              </p>
              <div className="flex justify-end">
                <button className="group-hover:rotate-45 transition-all duration-200 relative bottom-0 rotate-90 bg-[#F7F9FB] p-6 rounded-full mt-6 text-[20px]">
                  <FaArrowUp />
                </button>
              </div>
            </div>
            <div className="w-[385px] group transition duration-200  p-8 rounded">
              <img className="w-24" src={calendar} alt="" />

              <h5 className="text-2xl font-medium my-3">Power hybrid work</h5>
              <p>
                Future-proof your hybrid work model with an easy-to-use planning
                calendar.
              </p>
              <div className="flex justify-end">
                <button className="rotate-90 bg-white p-6 rounded-full mt-6 text-[20px]">
                  <FaArrowUp />
                </button>
              </div>
            </div>
            <div className="w-[385px] group transition duration-200  p-8 rounded">
              <img className="w-24" src={sprout} alt="" />
              <h5 className="text-2xl font-medium my-3">
                Create a sustainable workplace
              </h5>
              <p>
                Embrace a sustainable workplace approach by your Scope 2 & Scope
                3 emissions.
              </p>
              <div className="flex justify-end">
                <button className="rotate-90 group-hover:rotate-45 transition-all duration-200 relative bottom-0 bg-white p-6 rounded-full mt-6 text-[20px]">
                  <FaArrowUp />
                </button>
              </div>
            </div>
            <div className="w-[385px] group transition duration-200 bg-white p-8 rounded">
              <img className="w-24" src={analytics} alt="" />
              <h5 className="text-2xl font-medium my-3">
                Get real data for smart decisions
              </h5>
              <p>
                Arm yourself with workplace analytics and optimize office space
                usage.
              </p>
              <div className="flex justify-end">
                <button className="rotate-90 group-hover:rotate-45 transition-all duration-200 relative bottom-0 bg-[#F7F9FB] p-6 rounded-full mt-6 text-[20px]">
                  <FaArrowUp />
                </button>
              </div>
            </div>
            <div className="w-[385px] group transition duration-200   p-8 rounded">
              <img className="w-24" src={startup} alt="" />
              <h5 className="text-2xl font-medium my-3">
                Maximize workplace flexibility
              </h5>
              <p>
                Make hot desking and other flexible seating policies easy and
                productive.
              </p>
              <div className="flex justify-end">
                <button className="rotate-90 group-hover:rotate-45 transition-all duration-200 relative bottom-0 bg-white p-6 rounded-full mt-6 text-[20px]">
                  <FaArrowUp />
                </button>
              </div>
            </div>
            <div className="w-[385px] group transition duration-200 bg-white p-8 rounded">
              <img className="w-24" src={desking} alt="" />
              <h5 className="text-2xl font-medium my-3">
                Automate workspace booking
              </h5>
              <p>
                Forget Excel spreadsheets: reserve all office workspaces in a
                fast and efficient way.
              </p>
              <div className="flex justify-end">
                <button className="rotate-90 group-hover:rotate-45 transition-all duration-200 relative bottom-0 bg-[#F7F9FB] p-6 rounded-full mt-6 text-[20px]">
                  <FaArrowUp />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* step  */}
      <section className="mb-40 container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">How it's Work?</h1>
        <div className="mt-20  flex items-center justify-between relative">
          <div className="absolute top-4 left-0 right-0 border-t border-gray-300"></div>

          <div className="relative flex flex-col items-center text-center bg-white z-10">
            <div className="w-8 h-8 bg-black text-white rounded-full flex justify-center items-center">
              <FaCheck />
            </div>
            <h6 className="text-2xl mt-4">Step 1</h6>
            <img src={selectRoom} className="w-20 my-4" alt="Select Room" />
            <p>Select a room</p>
          </div>

          <div className="relative flex flex-col items-center text-center bg-white z-10">
            <div className="w-8 h-8 bg-black text-white rounded-full flex justify-center items-center">
              <FaCheck />
            </div>
            <h6 className="text-2xl mt-4">Step 2</h6>
            <img
              src={timetable}
              className="w-20 my-4"
              alt="Choose Date & Time"
            />
            <p>Choose Date & Time</p>
          </div>

          <div className="relative flex flex-col items-center text-center bg-white z-10">
            <div className="w-8 h-8 bg-black text-white rounded-full flex justify-center items-center">
              <FaCheck />
            </div>
            <h6 className="text-2xl mt-4">Step 3</h6>
            <img src={confirm} className="w-20 my-4" alt="Confirm Booking" />
            <p>Confirm Booking</p>
          </div>
        </div>
      </section>

      {/* testmonial  */}
      <section className="bg-[#F7F9FB] py-32 ">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-20 text-center">
            Customer Testimonials
          </h1>

          <div>
            <div>
              <div className="flex justify-between gap-10 space-x-6 mt-10">
                <div className="w-[400px]">
                  <img
                    src={customer2}
                    alt="Person working"
                    className="w-[400px] h-[400px] object-cover image1"
                  />
                  <h3 className="text-2xl font-medium mb-3">Toukir Ahmed</h3>
                  <p className="text-gray-700">
                    Access your company’s Teem desktop app to view room and desk
                    bookings, check workplace analytics, update wayfinding, or
                    welcome visitors.
                  </p>
                  <button className="mt-3 font-medium flex gap-1 text-rose-500 items-center hover:text-rose-600 transition duration-200">
                    <span>Read More</span>
                    <span className="text-[20px] relative top-[2px]">
                      <MdKeyboardArrowRight />
                    </span>
                  </button>
                </div>
                <div className="w-[400px]">
                  <img
                    src={customer1}
                    alt="Team working"
                    className="w-[400px] h-[400px] object-cover image2"
                  />
                  <h3 className="text-2xl font-medium mb-3">Tanvir Ahmed</h3>
                  <p className="text-gray-700">
                    Access your company’s Teem desktop app to view room and desk
                    bookings, check workplace analytics, update wayfinding, or
                    welcome visitors.
                  </p>
                  <button className="mt-3 font-medium flex gap-1 text-rose-500 items-center hover:text-rose-600 transition duration-200">
                    <span>Read More</span>
                    <span className="text-[20px] relative top-[2px]">
                      <MdKeyboardArrowRight />
                    </span>
                  </button>
                </div>
                <div className="w-[400px]">
                  <img
                    src={customer3}
                    alt="Discussion"
                    className="w-[400px] h-[400px] object-cover image3"
                  />
                  <h3 className="text-2xl font-medium mb-3">Ismail Masud</h3>
                  <p className="text-gray-700">
                    Access your company’s Teem desktop app to view room and desk
                    bookings, check workplace analytics, update wayfinding, or
                    welcome visitors.
                  </p>
                  <button className="mt-3 font-medium flex gap-1 text-rose-500 items-center hover:text-rose-600 transition duration-200">
                    <span>Read More</span>
                    <span className="text-[20px] relative top-[2px]">
                      <MdKeyboardArrowRight />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* footer  */}
      <Footer />
    </>
  );
}
