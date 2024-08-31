import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { DatePickerProps, TimePickerProps } from "antd";
import { DatePicker, Select, TimePicker } from "antd";
import room2 from "../../public/images/room/room2.webp";
import Navbar from "../components/meetingRooms/Navbar";

const { Option } = Select;

type PickerType = "time" | "date";

const PickerWithType = ({
  type,
  onChange,
}: {
  type: PickerType;
  onChange: TimePickerProps["onChange"] | DatePickerProps["onChange"];
}) => {
  if (type === "time") return <TimePicker onChange={onChange} />;
  if (type === "date") return <DatePicker onChange={onChange} />;
  return <DatePicker picker={type} onChange={onChange} />;
};

dayjs.extend(customParseFormat);

const dateFormat = "YYYY-MM-DD";
const date = new Date();
const formattedDate = date.toISOString().split("T")[0];

export default function BookRoom() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      <Navbar />
      <div className="flex container mx-auto h-[calc(100vh-80px)] justify-center items-center ">
        <div className="flex px-40  gap-10 w-full">
          <div className="w-1/2 border p-6 h-fit rounded-xl">
            <h2 className="text-3xl text-gray-800 font-medium mb-4">
              Request to book
            </h2>
            <div className="flex flex-col w-full mb-4">
              <label className="text-gray-700" htmlFor="name">
                Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                className="outline-none border mt-1 p-2 rounded border-[#E8E8E8] w-full"
                placeholder="Your name"
                type="text"
              />
            </div>
            <div className="flex flex-col w-full mb-4">
              <label className="text-gray-700" htmlFor="name">
                Email
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                className="outline-none border mt-1 p-2 rounded border-[#E8E8E8] w-full"
                placeholder="Your name"
                type="text"
              />
            </div>
            <div className="flex flex-col w-full mb-4">
              <label className="text-gray-700" htmlFor="name">
                Number
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                className="outline-none border mt-1 p-2 rounded border-[#E8E8E8] w-full"
                placeholder="Your name"
                type="text"
              />
            </div>
            <div className="flex flex-col w-full mb-4">
              <label className="text-gray-700" htmlFor="name">
                Number
              </label>
              <DatePicker
                className="py-2"
                defaultValue={dayjs(formattedDate, dateFormat)}
                minDate={dayjs(formattedDate, dateFormat)}
              />
            </div>
            <div className="flex flex-col w-full mb-4">
              <label className="text-gray-700 mb-1" htmlFor="name">
                Select Date
              </label>
              <TimePicker
                className="py-2 outline-none"
                onChange={(value) => console.log(value)}
              />
            </div>
          </div>
          <div className="w-1/2 border rounded-lg p-6 h-fit">
            <div className="flex items-center gap-4">
              <img src={room2} className="w-40 h-28 rounded-lg" alt="" />
              <div>
                <p className="text-lg font-medium">SAIL AWAY VILLA</p>
                <p className="text-gray-600">Capacity: 40</p>
                <p className="text-gray-600">Room No: 40</p>
                <p className="text-gray-600">Floor No: 4</p>
              </div>
            </div>
            <div>
              <h4 className="mt-8 text-2xl font-medium">Price Details</h4>
              <div className="flex justify-between items-center mt-4">
                <p>Price Per Slot</p>
                <p>$88</p>
              </div>
              <div className="flex justify-end">
                <button className="bg-rose-500 w-fit px-4 py-1 rounded white text-white font-medium mt-6">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
