import { FaCheck } from "react-icons/fa6";
import selectRoom from "/public/images/step/selectRoom.png";
import timetable from "/public/images/step/timetable.png";
import confirm from "/public/images/step/confirm.png";
export default function Step() {
  return (
    <section className="mb-40 container mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">How it's Work?</h1>
      <div className="mt-20  flex items-center justify-between relative">
        <div className="absolute top-4 left-0 right-0 border-t border-gray-300"></div>

        <div className="relative flex flex-col items-center text-center bg-white z-10">
          <div className="w-8 h-8 bg-black text-white rounded-full flex justify-center items-center">
            <FaCheck />
          </div>
          <h6 className="text-2xl mt-4">Step 1</h6>
          <img src={selectRoom} className="w-20 my-4" alt="Select Room" />
          <p>Select a room</p>
        </div>

        <div className="relative flex flex-col items-center text-center bg-white z-10">
          <div className="w-8 h-8 bg-black text-white rounded-full flex justify-center items-center">
            <FaCheck />
          </div>
          <h6 className="text-2xl mt-4">Step 2</h6>
          <img src={timetable} className="w-20 my-4" alt="Choose Date & Time" />
          <p>Choose Date & Time</p>
        </div>

        <div className="relative flex flex-col items-center text-center bg-white z-10">
          <div className="w-8 h-8 bg-black text-white rounded-full flex justify-center items-center">
            <FaCheck />
          </div>
          <h6 className="text-2xl mt-4">Step 3</h6>
          <img src={confirm} className="w-20 my-4" alt="Confirm Booking" />
          <p>Confirm Booking</p>
        </div>
      </div>
    </section>
  );
}
