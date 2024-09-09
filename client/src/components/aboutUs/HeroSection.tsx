import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { banner1, banner2, banner3, banner4, banner5, banner6 } from "../..";
import "./HeroSection.css";
import Navbar from "../shared/PrimaryNavbar";

const HeroSection = () => (
  <div className="h-[880px] md:h-[700px] flex flex-col">
    <Navbar />
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
          modules={[Autoplay]}
          className="mySwiper h-[835px] md:h-[725px]"
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
          <h1 className="text-3xl md:text-5xl mb-2 md:mb-8 text-center whitespace-nowrap">
            Welcome to Our World
          </h1>
          <h2 className="text-xl text-center">
            Discover our journey and what drives us
          </h2>
          <div className="mt-5 md:mt-10 flex justify-center">
            <button className="bg-white hover:bg-[#d3d3d3] transition duration-200 text-black py-3 rounded-full px-10">
              Meet Our Team
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HeroSection;
