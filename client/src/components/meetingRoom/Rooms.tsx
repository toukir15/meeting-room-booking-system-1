import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppDispatch } from "../../redux/hook";
import { setRoom } from "../../redux/features/room/roomSlice";
import { useNavigate } from "react-router-dom";
import { useGetRoomsQuery } from "../../redux/features/roomManagement/roomManagementApi";

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
interface RoomsProps {
  filteredRooms: TRoom[];
}

export default function Rooms({ filteredRooms }: RoomsProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: roomsData } = useGetRoomsQuery(undefined);

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
    <div className="py-20 container mx-auto">
      <div className="grid grid-cols-4 gap-10 px-20">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room: TRoom) => (
            <div
              onClick={(e) => handleRoom(e, room._id)}
              className="w-fit cursor-pointer"
              key={room._id}
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

              <h6 className="mt-2 text-xl font-medium">{room.roomName}</h6>
              <h6 className="text-gray-800">
                Capacity <span className="font-medium">{room.capacity}</span>
              </h6>
              <h6 className="mt-1 text-gray-900">
                Per slot{" "}
                <span className="font-medium">${room.pricePerSlot}</span>
              </h6>
            </div>
          ))
        ) : (
          <div className="col-span-4 text-center text-xl text-gray-500">
            No rooms match the selected filters or sort criteria.
          </div>
        )}
      </div>
    </div>
  );
}
