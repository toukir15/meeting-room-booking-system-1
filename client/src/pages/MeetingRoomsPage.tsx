/* eslint-disable react-hooks/exhaustive-deps */
import { IoIosSearch } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import filter from "/filter.png";
import sort from "/sorting.png";
import "./MeetingRoomPage.css";
import Rooms from "../components/meetingRoom/Rooms";
import PrimaryNavbar from "../components/shared/PrimaryNavbar";
import { useGetRoomsQuery } from "../redux/features/room/roomApi";

const capacityOptions = [
  { label: "1-10 people", value: "1-10" },
  { label: "11-20 people", value: "11-20" },
  { label: "21-30 people", value: "21-30" },
  { label: "31-40 people", value: "31-40" },
];

const priceOptions = [
  { label: "$0-$200", value: "0-200" },
  { label: "$201-$300", value: "201-300" },
  { label: "$301-$400", value: "301-400" },
  { label: "$401-$500", value: "401-500" },
];

const sortOptions = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

export default function MeetingRoomsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [showClearButton, setShowClearButton] = useState(false);
  const queryData = {
    search: debouncedSearchQuery,
    price: selectedPrice,
    capacity: selectedCapacity,
    sort: selectedSort,
  };
  const { data: roomsData, isLoading: isRoomsDataLoading } =
    useGetRoomsQuery(queryData);

  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Handle search input with debouncing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Filter rooms based on search, capacity, price, and sort
  useEffect(() => {
    setShowClearButton(
      selectedCapacity !== null ||
        selectedPrice !== null ||
        selectedSort !== null ||
        searchQuery !== ""
    );
  }, [
    debouncedSearchQuery,
    selectedCapacity,
    selectedPrice,
    selectedSort,
    roomsData,
  ]);

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearFilters = () => {
    setSelectedCapacity(null);
    setSelectedPrice(null);
    setSelectedSort(null);
    setSearchQuery("");
    setShowClearButton(false);
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

  return (
    <div className="min-h-screen">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-[100]">
        <PrimaryNavbar />
      </div>

      <div className="md:py-12 py-6 bg-[#e7eaed] mt-[73px] lg:mt-[88px]">
        <div className="flex justify-center items-center flex-col container mx-auto relative">
          <div className="w-5/6 md:w-5/6 lg:w-2/6">
            <div className="bg-white shadow rounded-full flex items-center">
              <input
                placeholder="Search by room name or keyword"
                className="w-full py-2 rounded-full outline-none px-5 text-black text-sm"
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e)}
              />
              <button className="mx-2 p-2 my-1 rounded-full text-2xl text-white bg-rose-500 hover:bg-rose-600 transition duration-200">
                <IoIosSearch />
              </button>
            </div>
          </div>

          {/* Filter and Sort Dropdowns */}
          <div className="absolute lg:right-0 top-24 md:top-32 lg:top-0 md:right-4 right-2 ">
            <div className="flex gap-2 items-center">
              {/* Filter Button and Dropdown */}
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
                  <div className="absolute right-0 mt-2 w-[200px] bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    {/* Capacity Filter */}
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

                    {/* Price Filter */}
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
                  </div>
                )}
              </div>

              {/* Sort Button and Dropdown */}
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
                    <ul className="space-y-2 px-4 py-2">
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
                )}
              </div>

              {showClearButton && (
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={handleClearFilters}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Rooms
        roomsData={roomsData?.data}
        isRoomsDataLoading={isRoomsDataLoading}
        queryData={queryData}
      />
    </div>
  );
}
