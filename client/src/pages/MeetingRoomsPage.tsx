import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosSearch } from "react-icons/io";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetRoomsQuery } from "../redux/features/roomManagement/roomManagementApi";
import { useAppDispatch } from "../redux/hook";
import { setRoom } from "../redux/features/room/roomSlice";
import SecondaryNavbar from "../components/shared/SecondaryNavbar";
import filter from "../../public/filter.png";
import sort from "../../public/sorting.png";
import "./MeetingRoomPage.css";

// Define filter options for capacity and price
const capacityOptions = [
  { label: "1-4 people", value: "1-4" },
  { label: "5-10 people", value: "5-10" },
  { label: "11-20 people", value: "11-20" },
];

const priceOptions = [
  { label: "$0-$50", value: "0-50" },
  { label: "$51-$100", value: "51-100" },
  { label: "$101-$200", value: "101-200" },
];

const sortOptions = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

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

type Option = {
  label: string;
  value: string;
};

export default function MeetingRoomsPage() {
  const { data: roomsData } = useGetRoomsQuery(undefined);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [filteredRooms, setFilteredRooms] = useState<TRoom[]>([]);
  const [showClearButton, setShowClearButton] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Define the filter logic
  const filterRooms = () => {
    if (roomsData?.data) {
      let filtered = roomsData.data;

      if (selectedCapacity) {
        const [minCapacity, maxCapacity] = selectedCapacity
          .split("-")
          .map(Number);
        filtered = filtered.filter(
          (room) =>
            Number(room.capacity) >= minCapacity &&
            Number(room.capacity) <= maxCapacity
        );
      }

      if (selectedPrice) {
        const [minPrice, maxPrice] = selectedPrice.split("-").map(Number);
        filtered = filtered.filter(
          (room) =>
            Number(room.pricePerSlot) >= minPrice &&
            Number(room.pricePerSlot) <= maxPrice
        );
      }

      if (selectedSort === "price-asc") {
        filtered = filtered.sort(
          (a, b) => Number(a.pricePerSlot) - Number(b.pricePerSlot)
        );
      } else if (selectedSort === "price-desc") {
        filtered = filtered.sort(
          (a, b) => Number(b.pricePerSlot) - Number(a.pricePerSlot)
        );
      }

      setFilteredRooms(filtered);
    }
  };

  useEffect(() => {
    filterRooms(); // Apply filters and sorting whenever selectedCapacity, selectedPrice, or selectedSort changes

    // Determine if the "Clear" button should be shown
    setShowClearButton(
      selectedCapacity !== null ||
        selectedPrice !== null ||
        selectedSort !== null
    );
  }, [selectedCapacity, selectedPrice, selectedSort, roomsData]);

  const handleToggleDropdown = (type: "filter" | "sort") => {
    if (type === "filter") {
      setIsFilterOpen(!isFilterOpen);
    } else if (type === "sort") {
      setIsSortOpen(!isSortOpen);
    }
  };

  const handleFilterSelect = (type: "capacity" | "price", value: string) => {
    if (type === "capacity") {
      setSelectedCapacity(value);
    } else if (type === "price") {
      setSelectedPrice(value);
    }
  };

  const handleSortSelect = (value: string) => {
    setSelectedSort(value);
  };

  const handleApplyFilters = () => {
    filterRooms();
    setIsFilterOpen(false); // Close filter dropdown after applying filters
  };

  const handleClearFilters = () => {
    setSelectedCapacity(null);
    setSelectedPrice(null);
    setSelectedSort(null);
    setFilteredRooms(roomsData?.data || []);
    setShowClearButton(false); // Hide clear button after clearing
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
      setIsFilterOpen(false);
    }
    if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
      setIsSortOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    <div className="h-screen">
      <SecondaryNavbar />
      <div className="py-12 bg-[#525050]">
        <div className="flex justify-center items-center flex-col container mx-auto relative">
          <div className="w-2/6">
            <div className="bg-white shadow rounded-full flex items-center">
              <input
                placeholder="Search by room name or keyword"
                className="w-full py-2 rounded-full outline-none px-5 text-black text-sm"
                type="text"
              />
              <button className="mx-2 p-2 my-1 rounded-full text-2xl text-white bg-rose-500 hover:bg-rose-600 transition duration-200">
                <IoIosSearch />
              </button>
            </div>
          </div>

          {/* Filter and Sort Dropdowns */}
          <div className="absolute right-0 flex gap-2 items-center">
            <div ref={filterRef} className="relative inline-block">
              <button
                onClick={() => handleToggleDropdown("filter")}
                className="bg-white border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <div className="flex items-center gap-2">
                  <img src={filter} alt="" />
                  <span>Filter</span>
                </div>
              </button>

              {isFilterOpen && (
                <div className="absolute mt-2 w-[300px] bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  <div className="px-4 py-2">
                    <h4 className="font-bold">Capacity</h4>
                    <ul className="space-y-2">
                      {capacityOptions.map((option) => (
                        <li
                          key={option.value}
                          className={`cursor-pointer px-2 rounded ${
                            selectedCapacity === option.value
                              ? "bg-rose-500 text-white"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() =>
                            handleFilterSelect("capacity", option.value)
                          }
                        >
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="px-4 py-2 border-t">
                    <h4 className="font-bold">Price</h4>
                    <ul className="space-y-2">
                      {priceOptions.map((option) => (
                        <li
                          key={option.value}
                          className={`cursor-pointer px-2 rounded ${
                            selectedPrice === option.value
                              ? "bg-rose-500 text-white"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() =>
                            handleFilterSelect("price", option.value)
                          }
                        >
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="px-4 py-2 border-t flex justify-between items-center">
                    <button
                      onClick={handleApplyFilters}
                      className="bg-rose-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-rose-600 transition duration-200"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div ref={sortRef} className="relative inline-block">
              <button
                onClick={() => handleToggleDropdown("sort")}
                className="bg-white border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <div className="flex items-center gap-2">
                  <img src={sort} alt="" />
                  <span>Sort</span>
                </div>
              </button>

              {isSortOpen && (
                <div className="absolute right-0 mt-2 w-[200px] bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  <div className="px-4 py-2">
                    <ul className="space-y-2">
                      {sortOptions.map((option) => (
                        <li
                          key={option.value}
                          className={`cursor-pointer px-2 rounded ${
                            selectedSort === option.value
                              ? "bg-rose-500 text-white"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => handleSortSelect(option.value)}
                        >
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {showClearButton && (
              <button
                onClick={handleClearFilters}
                className="bg-red-500 text-white px-4 py-2 rounded-md ml-2 focus:outline-none hover:bg-red-600 transition duration-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="py-20 container mx-auto">
        <div className="grid grid-cols-4 gap-10 px-20">
          {(filteredRooms.length > 0 ? filteredRooms : roomsData?.data)?.map(
            (room: TRoom) => (
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
            )
          )}
        </div>
      </div>
    </div>
  );
}
