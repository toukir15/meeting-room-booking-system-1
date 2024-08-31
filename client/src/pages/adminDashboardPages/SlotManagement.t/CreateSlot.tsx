import { DatePicker, TimePicker } from "antd";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export default function CreateSlot() {
  dayjs.extend(customParseFormat);
  const dateFormat = "YYYY-MM-DD";
  const date = new Date();
  const formattedDate = date.toISOString().split("T")[0];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="min-h-[calc(100vh-110px)] pt-10 pb-20 lg:pb-0 lg:pt-0 w-full flex lg:justify-center items-center container mx-auto">
      <form
        // onSubmit={handleSubmit(handleAddRoom)}
        method="post"
        className="flex lg:w-[50%] lg:mx-auto w-full px-4 flex-col"
      >
        <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
          <label className="md:w-[30%] mb-1" htmlFor="roomName">
            Room Name
          </label>
          <input
            {...register("roomName", { required: true })}
            className="border py-2.5 lg:w-[70%] text-black outline-none border-gray-300 px-3 rounded text-sm"
            type="text"
            placeholder="Room name"
          />
          {errors.roomName && (
            <span className="text-red-500 text-sm">Room name is required</span>
          )}
        </div>

        <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
          <label className="md:w-[30%] mb-1" htmlFor="roomNo">
            Room No
          </label>
          <input
            {...register("roomNo", { required: true })}
            className="border py-2.5 lg:w-[70%] text-black outline-none border-gray-300 px-3 rounded text-sm"
            type="number"
            placeholder="Room no"
          />
          {errors.roomNo && (
            <span className="text-red-500 text-sm">
              Room number is required
            </span>
          )}
        </div>

        <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
          <label className="md:w-[30%] mb-1" htmlFor="floorNo">
            Date
          </label>

          <DatePicker
            className="py-2 w-[70%]"
            defaultValue={dayjs(formattedDate, dateFormat)}
            minDate={dayjs(formattedDate, dateFormat)}
          />
          {errors.floorNo && (
            <span className="text-red-500 text-sm">
              Floor number is required
            </span>
          )}
        </div>

        <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
          <label className="md:w-[30%] mb-1" htmlFor="capacity">
            Start Time
          </label>
          <TimePicker
            className="py-2 outline-none w-[70%]"
            onChange={(value) => console.log(value)}
          />
          {errors.capacity && (
            <span className="text-red-500 text-sm">Capacity is required</span>
          )}
        </div>

        <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
          <label className="md:w-[30%] mb-1" htmlFor="pricePerSlot">
            End Time
          </label>
          <TimePicker
            className="py-2 outline-none w-[70%]"
            onChange={(value) => console.log(value)}
          />
          {errors.pricePerSlot && (
            <span className="text-red-500 text-sm">
              Price per slot is required
            </span>
          )}
        </div>

        <div className="flex flex-col md:flex-row w-full md:items-center">
          <div className="md:w-[30%] mb-1"></div>
          <div className="md:lg:w-[70%] flex gap-6">
            <button
              type="submit"
              className="w-1/2 bg-rose-500 hover:bg-rose-600 text-white transition duration-150 font-medium py-3 px-4 rounded-lg"
            >
              Add Slot
            </button>
            <button
              type="button"
              className="w-1/2 border border-rose-500 hover:border-rose-600 text-rose-500 hover:text-rose-600 py-3 px-4 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
