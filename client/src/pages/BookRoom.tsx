import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker, TimePicker } from "antd";
import { useAppSelector } from "../redux/hook";
import { useGetAvailableSlotQuery } from "../redux/features/slot/slotApi";
import { useCreatePaymentSessionMutation } from "../redux/features/payment/paymentApi";
import SecondaryNavbar from "../components/shared/SecondaryNavbar";
import Notiflix from "notiflix";

dayjs.extend(customParseFormat);

const dateFormat = "YYYY-MM-DD";
const timeFormat = "HH:mm";
const date = new Date();
const initialFormattedDate = date.toISOString().split("T")[0];

type TCheckout = {
  name: string;
  email: string;
  phone: string;
  startTime: Dayjs | null;
  endTime: Dayjs | null;
  date: Dayjs;
};

export default function BookRoom() {
  // states
  const user = useAppSelector((state) => state.auth.user);
  const room = useAppSelector((state) => state.room.room);

  // Manage date state
  const [selectedDate, setSelectedDate] = useState(
    dayjs(initialFormattedDate, dateFormat)
  );
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);

  const query = { roomId: room?._id, date: selectedDate.format(dateFormat) };

  // API call to get available slots
  const { data: availableSlotData } = useGetAvailableSlotQuery(query);
  const [createPaymentSession, { isLoading: isCreatePaymentSessionLoading }] =
    useCreatePaymentSessionMutation();

  const availableStartTime: Dayjs[] =
    availableSlotData?.data.map((data: { startTime: string }) =>
      dayjs(data.startTime, timeFormat)
    ) || [];

  const { register, handleSubmit, setValue, getValues } = useForm<TCheckout>();

  const handleCheckout = async (data: TCheckout) => {
    const date = getValues("date");
    const startTime = getValues("startTime");
    const endTime = getValues("endTime");
    const bookingData = {
      ...data,
      date: date ? date.format(dateFormat) : selectedDate.format(dateFormat),
      startTime: startTime ? startTime.format(timeFormat) : null,
      endTime: endTime ? endTime.format(timeFormat) : null,
      pricePerSlot: room?.pricePerSlot,
      roomName: room?.roomName,
      room: room?._id,
      user: user?.id,
    };

    const result = await createPaymentSession({ bookingData, userData: user });
    const url = result.data?.data.url;
    if (url) {
      window.location.href = url;
    }
  };

  const disabledTime = (current: Dayjs | null) => {
    if (!current) return {};

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

  // Automatically update endTime to be one hour after startTime
  useEffect(() => {
    if (startTime) {
      const newEndTime = startTime.add(1, "hour");
      setEndTime(newEndTime);
      setValue("endTime", newEndTime);
    }
  }, [startTime, setValue]);

  useEffect(() => {
    setValue("date", selectedDate);
  }, [selectedDate, setValue]);

  useEffect(() => {
    setValue("startTime", startTime);
    setValue("endTime", endTime);
  }, [startTime, endTime, setValue]);

  if (isCreatePaymentSessionLoading) {
    Notiflix.Loading.dots();
  }
  return (
    <>
      <SecondaryNavbar />
      <div className="bg-gray-50">
        <form
          onSubmit={handleSubmit(handleCheckout)}
          className="flex container mx-auto min-h-[calc(100vh-80px)] justify-center items-center py-10 lg:py-0"
        >
          <div className="flex flex-col lg:flex-row px-4 md:px-20 lg:px-40 gap-10 w-full">
            <div className="w-full lg:w-1/2 border p-4 md:p-6 h-fit rounded-xl bg-white shadow-sm">
              <h2 className="text-2xl md:text-3xl text-text-primary font-medium mb-4 md:mb-6">
                Request to book
              </h2>
              <div className="flex flex-col w-full mb-4">
                <label className="text-text-secondary" htmlFor="name">
                  Name *
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="outline-none border mt-1 p-2 rounded border-[#E8E8E8] w-full shadow"
                  placeholder="Your name"
                  defaultValue={user?.name}
                  type="text"
                />
              </div>
              <div className="flex flex-col w-full mb-4">
                <label className="text-text-secondary" htmlFor="email">
                  Email *
                </label>
                <input
                  {...register("email", { required: "Email is required" })}
                  className="outline-none border mt-1 p-2 rounded border-[#E8E8E8] w-full shadow"
                  placeholder="Your email"
                  defaultValue={user?.email}
                  type="text"
                />
              </div>
              <div className="flex flex-col w-full mb-4">
                <label className="text-text-secondary" htmlFor="phone">
                  Phone *
                </label>
                <input
                  {...register("phone", { required: "Phone is required" })}
                  className="outline-none border mt-1 p-2 rounded border-[#E8E8E8] w-full shadow"
                  placeholder="Your phone"
                  defaultValue={user?.phone}
                  type="text"
                />
              </div>
              <div className="flex flex-col w-full mb-4">
                <label className="text-text-secondary mb-1" htmlFor="date">
                  Date *
                </label>
                <DatePicker
                  className="py-2 w-full shadow"
                  value={selectedDate}
                  format={dateFormat}
                  onChange={(value) => setSelectedDate(value)}
                  minDate={selectedDate}
                />
              </div>
              <div className="flex flex-col w-full mb-4">
                <label className="text-text-secondary mb-1" htmlFor="time">
                  Start Time *
                </label>
                <TimePicker
                  className="py-2 w-full shadow"
                  format={timeFormat}
                  value={startTime}
                  required
                  onChange={(value) => setStartTime(value)}
                  disabledTime={disabledTime}
                />
              </div>
              <div className="flex flex-col w-full mb-4">
                <label className="text-text-secondary mb-1" htmlFor="time">
                  End Time *
                </label>
                <TimePicker
                  className="py-2 w-full shadow"
                  format={timeFormat}
                  value={endTime}
                  onChange={(value) => setEndTime(value)}
                  disabled
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 border rounded-lg p-4 md:p-6 h-fit bg-white shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src={room?.images[0]}
                  className="w-24 h-20 md:w-40 md:h-28 rounded-lg"
                  alt=""
                />
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
                <h4 className="mt-6 md:mt-8 text-xl md:text-2xl font-medium text-text-primary">
                  Price Details
                </h4>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-text-secondary">Price Per Slot</p>
                  <p className="font-medium">${room?.pricePerSlot}</p>
                </div>
                <div className="flex justify-end">
                  <button className="bg-primary hover:bg-primary-hover transition duration-200 w-fit px-4 py-2 md:py-1.5 rounded text-white font-medium mt-6">
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
