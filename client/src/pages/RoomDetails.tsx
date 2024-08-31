import Navbar from "../components/meetingRooms/Navbar";
import room2 from "../../public/images/room/room2.webp";
import { CgMenuGridO } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

export default function RoomDetails() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="py-20 container mx-auto h-screen flex items-center">
        <div className="">
          <div className="flex gap-2">
            <img src={room2} alt="" />
            <div className="flex flex-col gap-2">
              <img src={room2} alt="" />
              <img src={room2} alt="" />
            </div>
            <div className="flex flex-col gap-2 relative">
              <img src={room2} alt="" />
              <img src={room2} alt="" />
              <button className="w-fit flex  items-center gap-2 absolute bottom-6 right-6 bg-white px-4 py-2 rounded hover:bg-[#EBEBEB] transition duration-200">
                <span>
                  <CgMenuGridO />
                </span>
                <span>Show all photos</span>
              </button>
            </div>
          </div>
          <div className="flex justify-between my-6">
            <h2 className=" text-3xl font-medium">SAIL AWAY VILLA</h2>
            <button
              onClick={() => navigate("/book-room")}
              className="bg-rose-500 px-8 py-2 rounded  text-white font-medium"
            >
              Book Now
            </button>
          </div>
          <div className="flex gap-5">
            <p>Price Per Slot: $49 .</p>
            <p>Capacity: 40 .</p>
            <p>Room No: 40 .</p>
            <p>Floor No: 4 .</p>
          </div>
          <p className="mt-2">Amenities: good, well</p>
        </div>
      </div>
    </div>
  );
}
