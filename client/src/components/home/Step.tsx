import { FaCheck } from "react-icons/fa6";
import selectRoom from "/images/step/selectRoom.png";
import timetable from "/images/step/timetable.png";
import confirm from "/images/step/confirm.png";
import { motion } from "framer-motion";

export default function Step() {
  return (
    <section className="mb-16 md:mb-40 container mx-auto md:px-10 lg:px-0">
      <h1 className="text-3xl md:text-4xl font-bold md:mb-8 text-center">
        How it Works?
      </h1>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mt-10 md:mt-20 md:flex items-center justify-between relative px-8 md:px-0">
          {/* Horizontal line for desktop */}
          <div className="absolute hidden md:block top-4 left-0 right-0 border-t border-gray-300"></div>

          {/* Step 1 */}
          <div className="relative flex flex-col items-center text-center bg-[#F3F6FC] p-6 rounded-lg md:p-0 md:rounded-none md:bg-white z-10 mb-8 md:mb-0">
            <div className="hidden md:block">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-black text-white rounded-full flex justify-center items-center">
                <FaCheck />
              </div>
            </div>
            <h6 className="text-xl md:text-2xl mt-4 font-medium md">Step 1</h6>
            <img
              src={selectRoom}
              className="w-16 md:w-20 lg:w-20 my-4"
              alt="Select Room"
            />
            <p>Select a room</p>
          </div>

          {/* Step 2 */}
          <div className="relative flex flex-col items-center text-center bg-[#F3F6FC] p-6 rounded-lg md:p-0 md:rounded-none md:bg-white z-10 mb-8 md:mb-0">
            <div className="hidden md:block">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-black text-white rounded-full flex justify-center items-center">
                <FaCheck />
              </div>
            </div>
            <h6 className="text-xl md:text-2xl mt-4 font-medium md">Step 2</h6>
            <img
              src={timetable}
              className="w-16 md:w-20 lg:w-20 my-4"
              alt="Choose Date & Time"
            />
            <p>Choose Date & Time</p>
          </div>

          {/* Step 3 */}
          <div className="relative flex flex-col items-center text-center bg-[#F3F6FC] p-6 rounded-lg md:p-0 md:rounded-none md:bg-white z-10 mb-8 md:mb-0">
            <div className="hidden md:block">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-black text-white rounded-full flex justify-center items-center">
                <FaCheck />
              </div>
            </div>
            <h6 className="text-xl md:text-2xl mt-4 font-medium md">Step 3</h6>
            <img
              src={confirm}
              className="w-16 md:w-20 lg:w-20 my-4"
              alt="Confirm Booking"
            />
            <p>Confirm Booking</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
