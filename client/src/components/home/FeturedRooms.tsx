import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "./FeturedRooms.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { useAppDispatch } from "../../redux/hook";
import { useNavigate } from "react-router-dom";
import { setRoom } from "../../redux/features/room/roomSlice";
import { motion } from "framer-motion";
import { useGetFeturedRoomsQuery } from "../../redux/features/room/roomApi";

type TRoom = {
  _id: string;
  roomName: string;
  roomNo: string;
  capacity: string;
  pricePerSlot: string;
  floorNo: string;
  amenities: string[];
  images: string[];
};

export default function FeturedRooms() {
  const { data: roomsData } = useGetFeturedRoomsQuery(undefined);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRoom = (e: React.MouseEvent<HTMLElement>, id: string) => {
    const target = e.target as HTMLElement;
    const isSwiperButton =
      target.classList.contains("swiper-button-next") ||
      target.classList.contains("swiper-button-prev");
    if (!isSwiperButton) {
      const findRoom = roomsData?.data.find((room: TRoom) => room._id === id);
      if (findRoom) {
        dispatch(setRoom(findRoom));
        navigate("/room-details");
      }
    }
  };

  return (
    <section className="my-12 md:my-16 lg:my-32 container mx-auto">
      <h1 className="text-center text-3xl md:text-4xl text-gray-800 font-bold">
        Featured Rooms
      </h1>

      <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-center items-center">
        {roomsData?.data.slice(0, 4).map((room: TRoom) => (
          <motion.div
            onClick={(e) => handleRoom(e, room._id)}
            className="w-fit cursor-pointer mx-auto" // Center the card
            key={room._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Swiper
              speed={1000}
              navigation={true}
              modules={[Navigation]}
              className="h-[320px] w-[320px]"
            >
              {room.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div>
                    <img
                      src={image}
                      alt={`Banner ${index + 1}`}
                      className="w-[320px] h-[320px] rounded-lg object-fill"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <h6 className="mt-2 text-xl font-medium text-left">
              {room.roomName}
            </h6>{" "}
            {/* Left-aligned text */}
            <h6 className="text-gray-800 text-left">
              Capacity <span className="font-medium">{room.capacity}</span>
            </h6>
            <h6 className="mt-1 text-gray-900 text-left">
              Per slot <span className="font-medium">${room.pricePerSlot}</span>
            </h6>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={() => navigate("/meeting-rooms")}
          className="bg-rose-500 hover:bg-rose-600 text-white transition duration-200 px-12 py-3 flex items-center gap-2 font-medium rounded-lg"
        >
          <span>See More</span>
          <span className="relative top-[1px]">
            <FaArrowRightLong />
          </span>
        </button>
      </div>
    </section>
  );
}
