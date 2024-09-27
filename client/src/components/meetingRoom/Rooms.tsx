import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppDispatch } from "../../redux/hook";
import { setRoom } from "../../redux/features/room/roomSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Notiflix from "notiflix";
import { FaExclamation } from "react-icons/fa6"; // Example using Heroicons

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
type TQueryData = {
  search?: string;
  price?: string;
  capacity?: string;
  sort?: string;
};

interface RoomsProps {
  roomsData: TRoom[];
  isRoomsDataLoading: boolean;
  queryData: TQueryData;
}

export default function Rooms({
  roomsData,
  isRoomsDataLoading,
  queryData,
}: RoomsProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRoom = (e: React.MouseEvent<HTMLElement>, id: string) => {
    const target = e.target as HTMLElement;
    const isSwiperButton =
      target.classList.contains("swiper-button-next") ||
      target.classList.contains("swiper-button-prev");

    if (!isSwiperButton) {
      const findRoom = roomsData?.find((room: TRoom) => room._id === id);
      if (findRoom) {
        dispatch(setRoom(findRoom));
        navigate("/room-details");
      }
    }
  };

  // Show loading state
  if (isRoomsDataLoading) {
    Notiflix.Loading.dots();
    Notiflix.Loading.remove();
    return null;
  }

  // Show no data message if no filtered rooms

  if (roomsData.length === 0 && !isRoomsDataLoading) {
    return (
      <div className="h-32 flex flex-col items-center justify-center mt-20">
        <FaExclamation className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-2xl font-semibold text-gray-700">
          No rooms available
        </p>
        {(queryData.capacity ||
          queryData.price ||
          queryData.search ||
          queryData.sort) && (
          <p className="text-lg mt-2 text-gray-500">
            Please try adjusting your search or filters or come back later.
          </p>
        )}
        {!(
          queryData.capacity ||
          queryData.price ||
          queryData.search ||
          queryData
        ) && (
          <p className="text-lg mt-2 text-gray-500">
            Check back later for available rooms.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="py-16 lg:py-32 container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:px-20 justify-items-center mt-8 md:mt-12 lg:mt-0">
        {roomsData?.map((room: TRoom) => (
          <motion.div
            onClick={(e) => handleRoom(e, room._id)}
            className="w-fit cursor-pointer"
            key={room._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div>
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

              <h6 className="mt-2 text-xl font-medium">{room.roomName}</h6>
              <h6 className="text-gray-800">
                Capacity <span className="font-medium">{room.capacity}</span>
              </h6>
              <h6 className="mt-1 text-gray-900">
                Per slot{" "}
                <span className="font-medium">${room.pricePerSlot}</span>
              </h6>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
