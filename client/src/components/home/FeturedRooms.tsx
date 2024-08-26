import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import room1 from "../../../public/images/room/room1.webp";
import "./FeturedRooms.css";
import { FaArrowRightLong } from "react-icons/fa6";

export default function FeturedRooms() {
  return (
    <section className="my-32 container mx-auto">
      <h1 className="text-center text-4xl text-gray-800 font-bold">
        Featured Meeting Rooms
      </h1>

      <div className="mt-16 grid grid-cols-4 gap-10 ">
        <div className="w-fit">
          <Swiper
            speed={1000}
            navigation={true}
            modules={[Navigation]} // Include Autoplay in modules array
            className="h-[320px] w-[320px]" // Ensure Swiper takes full height
          >
            <SwiperSlide>
              <div>
                <img
                  src={room1}
                  alt="Banner 1"
                  className=" w-[320px] h-[320px] rounded-lg object-fill"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <img
                  src={room1}
                  alt="Banner 2"
                  className=" w-[320px] h-[320px] rounded-lg object-fill"
                />
              </div>
            </SwiperSlide>
          </Swiper>
          <h6 className="mt-2 text-xl font-medium">Gromebridge, UK</h6>
          <h6 className="text-gray-800">
            Capacity <span className="font-medium">48</span>
          </h6>
          <h6 className="mt-1 text-gray-900">
            Per slot <span className="font-medium">$100</span>
          </h6>
        </div>
        <div className="w-fit">
          <Swiper
            speed={1000}
            navigation={true}
            modules={[Navigation]} // Include Autoplay in modules array
            className="h-[320px] w-[320px]" // Ensure Swiper takes full height
          >
            <SwiperSlide>
              <div>
                <img
                  src={room1}
                  alt="Banner 1"
                  className=" w-[320px] h-[320px] rounded-lg object-fill"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <img
                  src={room1}
                  alt="Banner 2"
                  className=" w-[320px] h-[320px] rounded-lg object-fill"
                />
              </div>
            </SwiperSlide>
          </Swiper>
          <h6 className="mt-2 text-xl font-medium">Gromebridge, UK</h6>
          <h6 className="text-gray-800">
            Capacity <span className="font-medium">48</span>
          </h6>
          <h6 className="mt-1 text-gray-900">
            Per slot <span className="font-medium">$100</span>
          </h6>
        </div>
        <div className="w-fit">
          <Swiper
            speed={1000}
            navigation={true}
            modules={[Navigation]} // Include Autoplay in modules array
            className="h-[320px] w-[320px]" // Ensure Swiper takes full height
          >
            <SwiperSlide>
              <div>
                <img
                  src={room1}
                  alt="Banner 1"
                  className=" w-[320px] h-[320px] rounded-lg object-fill"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <img
                  src={room1}
                  alt="Banner 2"
                  className=" w-[320px] h-[320px] rounded-lg object-fill"
                />
              </div>
            </SwiperSlide>
          </Swiper>
          <h6 className="mt-2 text-xl font-medium">Gromebridge, UK</h6>
          <h6 className="text-gray-800">
            Capacity <span className="font-medium">48</span>
          </h6>
          <h6 className="mt-1 text-gray-900">
            Per slot <span className="font-medium">$100</span>
          </h6>
        </div>
        <div className="w-fit">
          <Swiper
            speed={1000}
            navigation={true}
            modules={[Navigation]} // Include Autoplay in modules array
            className="h-[320px] w-[320px]" // Ensure Swiper takes full height
          >
            <SwiperSlide>
              <div>
                <img
                  src={room1}
                  alt="Banner 1"
                  className=" w-[320px] h-[320px] rounded-lg object-fill"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <img
                  src={room1}
                  alt="Banner 2"
                  className=" w-[320px] h-[320px] rounded-lg object-fill"
                />
              </div>
            </SwiperSlide>
          </Swiper>
          <h6 className="mt-2 text-xl font-medium">Gromebridge, UK</h6>
          <h6 className="text-gray-800">
            Capacity <span className="font-medium">48</span>
          </h6>
          <h6 className="mt-1 text-gray-900">
            Per slot <span className="font-medium">$100</span>
          </h6>
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <button className=" bg-rose-500 hover:bg-rose-600 text-white transition duration-200 px-12 py-3 flex items-center gap-2 font-medium  rounded-lg">
          <span>See More</span>
          <span className="relative top-[1px]">
            <FaArrowRightLong />
          </span>
        </button>
      </div>
    </section>
  );
}
