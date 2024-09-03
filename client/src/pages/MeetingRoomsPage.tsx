import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "../components/meetingRooms/Navbar";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetRoomsQuery } from "../redux/features/roomManagement/roomManagementApi";
import { useAppDispatch } from "../redux/hook";
import { setRoom } from "../redux/features/room/roomSlice";

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

export default function MeetingRoomsPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const { data: roomsData } = useGetRoomsQuery(undefined);
  const disPatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFilter = () => {
    setIsFilter(true);
    setIsSort(false);
    setIsSearchOpen(false);
  };
  const handleSort = () => {
    setIsSort(true);
    setIsFilter(false);
    setIsSearchOpen(false);
  };
  const handleSearch = () => {
    setIsSearchOpen(true);
    setIsFilter(false);
    setIsSort(false);
  };

  const handleRoom = (e: React.MouseEvent<HTMLElement>, id: string) => {
    const target = e.target as HTMLElement;
    const isSwiperButton =
      target.classList.contains("swiper-button-next") ||
      target.classList.contains("swiper-button-prev");
    if (!isSwiperButton) {
      const findRoom = roomsData?.data.find((room: TRoom) => room._id == id);
      disPatch(setRoom(findRoom));
      navigate("/room-details");
    }
  };

  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex justify-center items-center flex-col pt-10 pb-20 ">
        <div>
          {/* <button
            className={`mb-2 bg-rose-500 px-4 py-1 text-white rounded-full ${
              isFilter || isSort
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            Clear
          </button> */}
        </div>
        <div className="w-2/6 border border-gray-200 shadow rounded-full flex items-center ">
          <button
            onClick={() => handleSort()}
            className={`w-1/2 ${
              isSort && "bg-[#EBEBEB]"
            } hover:bg-[#EBEBEB] transition duration-200 h-full rounded-full py-2`}
          >
            <span style={{ lineHeight: "1" }} className="font-medium">
              Sort
            </span>
            <span
              style={{ lineHeight: "1.25" }}
              className="text-gray-500 block text-sm"
            >
              By Price Per Slot
            </span>
          </button>
          <div className="h-8 w-[2px] bg-gray-300 "></div>
          <button
            onClick={() => handleFilter()}
            className={`w-1/2 ${
              isFilter && "bg-[#EBEBEB]"
            } hover:bg-[#EBEBEB] transition duration-200 h-full rounded-full py-2`}
          >
            <span style={{ lineHeight: "1.25" }} className="font-medium">
              Filter
            </span>
            <span
              style={{ lineHeight: "1.25" }}
              className="text-gray-500 text-sm block"
            >
              By Capacity, Price.
            </span>
          </button>
          <button
            onClick={() => handleSearch()}
            className="mx-2  p-2 my-1 rounded-full text-2xl text-white bg-rose-500 hover:bg-rose-600 transition duration-200 "
          >
            <IoIosSearch />
          </button>
        </div>
        {isSearchOpen && (
          <input
            className="block border rounded-full py-3 mt-2 w-1/6 px-4 text-sm outline-none shadow"
            placeholder=" Search by room name or keyword"
            type="text"
          />
        )}
      </div>

      <div className="pb-32 container mx-auto">
        <div className="grid grid-cols-4 gap-10 px-20">
          {roomsData?.data.map((room: TRoom) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
