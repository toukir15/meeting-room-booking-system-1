import { Swiper, SwiperSlide } from "swiper/react";
import { banner1, banner2, banner3, banner4, banner5, banner6 } from "../..";
import { Autoplay, Navigation } from "swiper/modules";
import styles from "./Hero.module.css"; // Import CSS module
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
          navigation={{
            nextEl: `.${styles["swiper-button-next"]}`, // Use the scoped class
            prevEl: `.${styles["swiper-button-prev"]}`, // Use the scoped class
          }}
          modules={[Navigation, Autoplay]}
          className="mySwiper h-[725px]"
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
        <div className="absolute top-1/2 -translate-y-8 right-1/2 z-50 text-white font-medium translate-x-1/2">
          <h1 className="text-5xl mb-8 text-center">
            Book Your Ideal Meeting Room with Ease.
          </h1>
          <h2 className="text-xl text-center">
            Efficient, hassle-free room booking for all your meeting needs.
          </h2>
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => navigate("/meeting-rooms")}
              className="bg-white hover:bg-[#d3d3d3] transition duration-200 text-black py-3 rounded-full px-10"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Custom Swiper buttons */}
        <div className={styles["swiper-button-next"]}></div>
        <div className={styles["swiper-button-prev"]}></div>
      </div>
    </div>
  );
}
