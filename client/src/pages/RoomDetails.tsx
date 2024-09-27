import { CgMenuGridO } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import SecondaryNavbar from "../components/shared/SecondaryNavbar";
import { useEffect } from "react";

import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// If you want you can use SCSS instead of css
import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

export default function RoomDetails() {
  const room = useAppSelector((state) => state.room.room);
  const images = room?.images as string[];
  const navigate = useNavigate();

  const onInit = () => {
    console.log("lightGallery has been initialized");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 w-full z-[100]">
        <SecondaryNavbar />
      </div>
      <div className=" container mx-auto min-h-[calc(100vh-75px)] md:h-auto justify-center mt-10 py-16 md:mt-0 md:py-0 lg:py-20 lg:mt-12  flex items-center ">
        <div className="hidden lg:block md:px-8 lg:px-8 xl:px-0">
          {images.length == 1 && (
            <LightGallery
              elementClassNames="flex gap-3"
              onInit={onInit}
              speed={500}
              plugins={[lgThumbnail, lgZoom]}
            >
              <a href={images[0]}>
                <img
                  className="h-[500px] w-[800px] object-cover object-center"
                  alt="img1"
                  src={images[0]}
                />
              </a>
            </LightGallery>
          )}

          {images.length == 2 && (
            <LightGallery
              elementClassNames="flex gap-2"
              onInit={onInit}
              speed={500}
              plugins={[lgThumbnail, lgZoom]}
            >
              {images.map((image, index) => {
                const imageClass = [
                  "h-[448px] w-[600px] object-cover",
                  "h-[448px] w-[600px] object-cover",
                ];
                return (
                  <a href={images[index]}>
                    <img
                      className={`${imageClass[index]}`}
                      src={image}
                      alt={`Image${index + 1}`}
                    />
                  </a>
                );
              })}
            </LightGallery>
          )}
          {images.length === 3 && (
            <LightGallery
              elementClassNames="flex gap-2"
              onInit={onInit}
              speed={500}
              plugins={[lgThumbnail, lgZoom]}
            >
              {images.map((image, index) => {
                const imageClass = [
                  "h-[448px] w-[700px] object-cover",
                  "h-[448px] w-[350px] object-cover",
                  "h-[448px] w-[350px] object-cover",
                ];
                return (
                  <a href={images[index]}>
                    <img
                      className={`${imageClass[index]}`}
                      src={image}
                      alt={`Image${index + 1}`}
                    />
                  </a>
                );
              })}
            </LightGallery>
          )}

          {images.length >= 4 && (
            <LightGallery
              elementClassNames="flex gap-2 relative"
              onInit={onInit}
              speed={500}
              plugins={[lgThumbnail, lgZoom]}
            >
              {images.slice(0, 4).map((image, index) => {
                const imageClass = [
                  "h-[448px] w-[500px] object-cover",
                  "h-[448px] w-[350px] object-cover",
                  "h-[448px] w-[350px] object-cover",
                  "h-[448px] w-[500px] object-cover",
                ];
                return (
                  <a href={images[index]}>
                    <img
                      className={`${imageClass[index]}`}
                      src={image}
                      alt={`Image${index + 1}`}
                    />
                  </a>
                );
              })}
              {images.length > 4 && (
                <div className="w-full md:hidden xl:block absolute bottom-0 right-0 ">
                  <button className="w-fit flex items-center gap-2 absolute bottom-3 right-3 bg-white px-4 py-2 rounded hover:bg-[#EBEBEB] transition duration-200">
                    <CgMenuGridO />
                    <span>Show all photos</span>
                  </button>
                </div>
              )}
            </LightGallery>
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

        {/* mobile view  */}
        <div className="px-4 block lg:hidden">
          <div>
            <img
              src={images[0]}
              className="w-[600px] h-[300px] md:h-[400px]"
              alt=""
            />
          </div>
          <h2 className=" text-2xl font-medium mt-3">{room?.roomName}</h2>
          <div className="flex flex-col gap-[2px] mt-2">
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
          <p className="">
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
          <button
            onClick={() => navigate("/book-room")}
            className="bg-rose-500 px-8 py-2 rounded w-full text-white font-medium mt-3"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
