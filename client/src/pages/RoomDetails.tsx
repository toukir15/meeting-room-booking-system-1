import { CgMenuGridO } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import SecondaryNavbar from "../components/shared/SecondaryNavbar";
import { useEffect } from "react";

export default function RoomDetails() {
  const room = useAppSelector((state) => state.room.room);
  const images = room?.images as string[];
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="h-screen">
      <SecondaryNavbar />
      <div className=" container mx-auto justify-center mt-20  flex items-center">
        <div>
          {images.length == 1 && (
            <div>
              <img src={images[0]} className="w-[600px] h-[500px]" alt="" />
            </div>
          )}

          {images.length == 2 && (
            <div className="flex gap-3">
              <img
                className="h-[448px] w-[550px] object-cover"
                src={images[0]}
                alt=""
              />
              <img
                className="h-[448px] w-[550px] object-cover"
                src={images[1]}
                alt=""
              />
            </div>
          )}
          {images.length == 3 && (
            <div className="flex gap-2">
              {/* Main Image */}
              <img
                className="h-[448px] w-[550px] object-cover"
                src={images[0]}
                alt=""
              />

              {/* First Column of Images */}
              <div className="flex flex-col gap-2">
                <img
                  className="h-[220px] w-[350px] object-cover"
                  src={images[1]}
                  alt=""
                />
                <img
                  className="h-[220px] w-[350px] object-cover"
                  src={images[2]}
                  alt=""
                />
              </div>
            </div>
          )}

          {images.length == 4 && (
            <div className="flex gap-2">
              {/* Main Image */}
              <img
                className="h-[448px] w-[550px] object-cover"
                src={images[0]}
                alt=""
              />

              {/* First Column of Images */}
              <div className="flex flex-col gap-2">
                <img
                  className="h-[220px] w-[350px] object-cover"
                  src={images[1]}
                  alt=""
                />
                <img
                  className="h-[220px] w-[350px] object-cover"
                  src={images[2]}
                  alt=""
                />
              </div>

              <img
                className="h-[448px] w-[550px] object-cover"
                src={images[3]}
                alt=""
              />
            </div>
          )}

          {images.length >= 5 && (
            <div className="flex gap-2">
              {/* Main Image */}
              <img
                className="h-[448px] w-[550px] object-cover"
                src={images[0]}
                alt=""
              />

              {/* First Column of Images */}
              <div className="flex flex-col gap-2">
                <img
                  className="h-[220px] w-[350px] object-cover"
                  src={images[1]}
                  alt=""
                />
                <img
                  className="h-[220px] w-[350px] object-cover"
                  src={images[2]}
                  alt=""
                />
              </div>

              {/* Second Column of Images and Button */}
              <div className="flex flex-col gap-2 relative">
                <img
                  className="h-[220px] w-[350px] object-cover"
                  src={images[3]}
                  alt=""
                />
                <img
                  className="h-[220px] w-[350px] object-cover"
                  src={images[4]}
                  alt=""
                />
                <button className="w-fit flex items-center gap-2 absolute bottom-6 right-6 bg-white px-4 py-2 rounded hover:bg-[#EBEBEB] transition duration-200">
                  <CgMenuGridO />
                  <span>Show all photos</span>
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-between my-6">
            <h2 className=" text-3xl font-medium">{room?.roomName}</h2>
            <button
              onClick={() => navigate("/book-room")}
              className="bg-rose-500 px-8 py-2 rounded  text-white font-medium"
            >
              Book Now
            </button>
          </div>
          <div className="flex gap-5">
            <p>
              <span className="text-gray-800">Price Per Slot:</span>{" "}
              <span className="font-medium">$49</span> .
            </p>
            <p>
              <span className="text-gray-800">Capacity:</span>{" "}
              <span className="font-medium">{room?.capacity}</span> .
            </p>
            <p>
              <span className="text-gray-800">Room No:</span>{" "}
              <span className="font-medium">40</span> .
            </p>
            <p>
              <span className="text-gray-800">Floor No:</span>{" "}
              <span className="font-medium">{room?.floorNo}</span> .
            </p>
          </div>
          <p className="mt-2">
            <span className="text-gray-800">Amenities:</span>{" "}
            <span>
              {room?.amenities.map((amenite, index) => {
                return (
                  <span className="font-medium">
                    {amenite} {room.amenities.length - 1 !== index && ","}{" "}
                  </span>
                );
              })}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
