import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker, TimePicker } from "antd";
import room2 from "../../public/images/room/room2.webp";
import Navbar from "../components/meetingRooms/Navbar";
import { useAppSelector } from "../redux/hook";
import { useGetAvailableSlotQuery } from "../redux/features/slot/slotApi";

dayjs.extend(customParseFormat);

const dateFormat = "YYYY-MM-DD";
const timeFormat = "HH:mm";
const date = new Date();
const initialFormattedDate = date.toISOString().split("T")[0];

export default function BookRoom() {
  // states
  const user = useAppSelector((state) => state.auth.user);
  const room = useAppSelector((state) => state.room.room);

  // Manage date state
  const [selectedDate, setSelectedDate] = useState(
    dayjs(initialFormattedDate, dateFormat)
  );

  const query = { roomId: room?._id, date: selectedDate.format(dateFormat) };

  // api call
  const { data: availableSlotData } = useGetAvailableSlotQuery(query);

  const availableStartTime = availableSlotData?.data.map((data) => {
    return dayjs(data.startTime, timeFormat);
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const handleCheckout = (data) => {
    const date = getValues("date");
    const startTime = getValues("startTime");
    const endTime = getValues("endTime");
    const bookingData = {
      ...data,
      date: date ? date.format(dateFormat) : selectedDate.format(dateFormat),
      startTime: startTime ? startTime.format(timeFormat) : null,
      endTime: endTime ? endTime.format(timeFormat) : null,
    };
    console.log("Booking Data:", bookingData);
    // You can add your API call here to process the booking
  };

  const disabledTime = (current) => {
    if (!current) {
      return {};
    }

    const unavailableHours = Array.from({ length: 24 }, (_, i) => i).filter(
      (hour) =>
        !availableStartTime.some(
          (time) => time.isValid() && time.hour() === hour
        )
    );

    const unavailableMinutes = Array.from({ length: 60 }, (_, i) => i).filter(
      (minute) =>
        !availableStartTime.some(
          (time) =>
            time.isValid() &&
            time.hour() === current.hour() &&
            time.minute() === minute
        )
    );

    return {
      disabledHours: () => unavailableHours,
      disabledMinutes: () => unavailableMinutes,
    };
  };

  useEffect(() => {
    setValue("date", selectedDate); // Set the default value for date in the form
  }, [selectedDate, setValue]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-50">
        <form
          onSubmit={handleSubmit(handleCheckout)}
          className="flex container mx-auto h-[calc(100vh-80px)] justify-center items-center"
        >
          <div className="flex px-40 gap-10 w-full">
            <div className="w-1/2 border p-6 h-fit rounded-xl bg-white shadow-sm">
              <h2 className="text-3xl text-text-primary font-medium mb-6">
                Request to book
              </h2>
              <div className="flex flex-col w-full mb-4">
                <label className="text-text-secondary" htmlFor="name">
                  Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="outline-none border mt-1 p-2 rounded border-[#E8E8E8] w-full"
                  placeholder="Your name"
                  defaultValue={user?.name}
                  type="text"
                />
              </div>
              <div className="flex flex-col w-full mb-4">
                <label className="text-text-secondary" htmlFor="email">
                  Email
                </label>
                <input
                  {...register("email", { required: "Email is required" })}
                  className="outline-none border mt-1 p-2 rounded border-[#E8E8E8] w-full"
                  placeholder="Your email"
                  defaultValue={user?.email}
                  type="text"
                />
              </div>
              <div className="flex flex-col w-full mb-4">
                <label className="text-text-secondary" htmlFor="phone">
                  Phone
                </label>
                <input
                  {...register("phone", { required: "Phone is required" })}
                  className="outline-none border mt-1 p-2 rounded border-[#E8E8E8] w-full"
                  placeholder="Your phone"
                  defaultValue={user?.phone}
                  type="text"
                />
              </div>
              <div className="flex flex-col w-full mb-4">
                <label className="text-text-secondary mb-1" htmlFor="date">
                  Date
                </label>
                <DatePicker
                  className="py-2 w-full"
                  value={selectedDate}
                  format={dateFormat}
                  onChange={(value) => setSelectedDate(value)}
                />
              </div>
              <div className="flex flex-col w-full mb-4">
                <label className="text-text-secondary mb-1" htmlFor="time">
                  Start Time
                </label>
                <TimePicker
                  className="py-2 w-full"
                  format={timeFormat}
                  onChange={(value) => setValue("startTime", value)}
                  disabledTime={disabledTime}
                />
              </div>
              <div className="flex flex-col w-full mb-4">
                <label className="text-text-secondary mb-1" htmlFor="time">
                  End Time
                </label>
                <TimePicker
                  className="py-2 w-full"
                  format={timeFormat}
                  onChange={(value) => setValue("endTime", value)}
                />
              </div>
            </div>
            <div className="w-1/2 border rounded-lg p-6 h-fit bg-white shadow-sm">
              <div className="flex items-center gap-4">
                <img src={room2} className="w-40 h-28 rounded-lg" alt="" />
                <div>
                  <p className="text-lg font-medium mb-2 text-text-primary">
                    {room?.roomName}
                  </p>
                  <p className="text-text-secondary">
                    Capacity:{" "}
                    <span className="font-medium">{room?.capacity}</span>
                  </p>
                  <p className="text-text-secondary">
                    Room No: <span className="font-medium">{room?.roomNo}</span>
                  </p>
                  <p className="text-text-secondary">
                    Floor No:{" "}
                    <span className="font-medium">{room?.floorNo}</span>
                  </p>
                </div>
              </div>
              <div>
                <h4 className="mt-8 text-2xl font-medium text-text-primary">
                  Price Details
                </h4>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-text-secondary">Price Per Slot</p>
                  <p className="font-medium">${room?.pricePerSlot}</p>
                </div>
                <div className="flex justify-end">
                  <button className="bg-primary hover:bg-primary-hover transition duration-200 w-fit px-4 py-1.5 rounded text-white font-medium mt-6">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
