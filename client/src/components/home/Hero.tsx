import { Swiper, SwiperSlide } from "swiper/react";
import { banner1, banner2, banner3, banner4, banner5, banner6 } from "../..";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="flex-1">
      {/* banner section  */}
      <div className="relative">
        <Swiper
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          speed={3000}
          loop={true} // Enable looping
          slidesPerView={1} // Show one slide at a time
          modules={[Autoplay]}
          className="mySwiper h-[764px] md:h-[687px] sm:h-[500px] lg:h-[725px] xs:h-[400px]"
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

        {/* Custom text and button */}
        <div className="absolute top-1/2 transform -translate-y-1/2 right-1/2 z-50 text-white font-medium translate-x-1/2">
          <h1 className="hidden md:block text-3xl lg:text-5xl md:text-4xl sm:text-3xl xs:text-2xl md:mb-6 lg:mb-8 text-center whitespace-nowrap ">
            Book Your Ideal Meeting Room with Ease.
          </h1>
          <h1 className="block md:hidden text-3xl lg:text-5xl md:text-4xl sm:text-3xl xs:text-2xl mb-4 lg:mb-8 text-center whitespace-nowrap">
            Book Your Ideal Meeting <br /> Room with Ease.
          </h1>
          <h2 className="text-sm lg:text-xl sm:text-lg xs:text-base text-center whitespace-break-spaces">
            Efficient, hassle-free room booking for all your meeting needs.
          </h2>
          <div className="lg:mt-10 mt-6 flex justify-center">
            <button
              onClick={() => navigate("/meeting-rooms")}
              className="bg-white hover:bg-[#d3d3d3] transition duration-200 text-black py-2 lg:py-3 md:py-2 xs:py-1 rounded-full px-10 md:px-8 xs:px-6 whitespace-nowrap"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
