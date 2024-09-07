/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker, notification, Select, TimePicker } from "antd";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useGetRoomsQuery } from "../../../redux/features/roomManagement/roomManagementApi";
import "./CreateSlot.css";
import { useCreateSlotMutation } from "../../../redux/features/slotManagement/slotManagementApi";
import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export default function CreateSlot() {
  const navigate = useNavigate();
  const [createSlot] = useCreateSlotMutation();
  dayjs.extend(customParseFormat);
  const { data: roomData } = useGetRoomsQuery(undefined);
  const dateFormat = "YYYY-MM-DD";

  interface TRoom {
    _id: string;
    roomName: string;
    roomNo: string; // Add roomNo to the TRoom interface
  }

  const options = roomData?.data.reduce(
    (acc: { value: string; label: string }[], room: TRoom) => {
      acc.push({
        value: room._id,
        label: room.roomName,
      });
      return acc;
    },
    []
  );
  interface SlotFormData {
    roomName: string;
    roomNo: string;
    date: string;
    startDate: string;
    endDate: string;
  }

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const handleCreateSlot: SubmitHandler<SlotFormData> = async (
    data: SlotFormData
  ) => {
    console.log(data);
    try {
      const result = await createSlot(data);
      if (result.data.success) {
        toast.success("Slots created successfully", {
          duration: 10000,
        });
        navigate("/admin/dashboard/slot-management");
      }
    } catch (error) {
      console.error("Error creating slot:", error);
      notification.error({
        message: "Slot Creation Failed",
        description: "There was an error creating the slot. Please try again.",
      });
    }
  };

  const handleStartTimeChange = (
    time: string | number | Date | dayjs.Dayjs | null | undefined,
    timeString: any
  ) => {
    setValue("startTime", timeString);

    const endTime = dayjs(time).add(1, "hour");
    setValue("endTime", endTime.format("HH:mm"));
  };

  const disabledTime = () => {
    return {
      disabledHours: () => [23],
      disabledMinutes: () => [
        1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19, 21, 22, 23, 24,
        26, 27, 28, 29, 31, 32, 33, 34, 36, 37, 38, 39, 41, 42, 43, 44, 46, 47,
        48, 49, 51, 52, 53, 54, 56, 57, 58, 59,
      ],
    };
  };

  const selectedStartTime = watch("startTime");

  const handleRoomNameChange = (value: string) => {
    const selectedRoom = roomData?.data.find(
      (room: TRoom) => room._id === value
    );

    if (selectedRoom) {
      setValue("roomNo", selectedRoom.roomNo);
    }
    setValue("room", value);
  };

  return (
    <div className="min-h-[calc(100vh-110px)] pt-10 pb-20 lg:pb-0 lg:pt-0 w-full flex lg:justify-center items-center container mx-auto">
      <form
        onSubmit={handleSubmit(handleCreateSlot)}
        method="post"
        className="flex lg:w-[50%] lg:mx-auto w-full px-4 flex-col"
      >
        {/* Room Name */}
        <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
          <label className="md:w-[30%] mb-1 text-gray-600" htmlFor="roomName">
            Room Name
          </label>
          <Select
            className="border py-2.5 lg:w-[70%] text-black outline-none  px-3 rounded text-sm border-gray-300 hover:border-gray-400 transition duration-200 shadow"
            showSearch
            placeholder="Select a room"
            filterOption={(input, option) => {
              const label = option?.label;
              return (
                typeof label === "string" &&
                label.toLowerCase().includes(input.toLowerCase())
              );
            }}
            options={options}
            onChange={handleRoomNameChange}
            style={{
              padding: "6px",
              height: "42px",
              lineHeight: "1.25",
              borderColor: "#d9d9d9",
              borderRadius: "4px",
            }}
          />
          {errors.roomName && (
            <span className="text-red-500 text-sm">Room name is required</span>
          )}
        </div>

        {/* Room No */}
        <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
          <label className="md:w-[30%] mb-1 text-gray-600" htmlFor="roomNo">
            Room No
          </label>
          <div className="w-[70%] flex flex-col">
            <input
              {...register("roomNo", { required: true })}
              className="border py-2.5 lg:w-[100%] text-black outline-none  px-3 rounded text-sm border-gray-300  transition duration-200 shadow"
              type="number"
              disabled
              placeholder="Room no"
            />
            {errors.roomNo && (
              <span className="text-red-500 text-sm">
                Room number is required
              </span>
            )}
          </div>
        </div>

        {/* Date */}
        <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
          <label className="md:w-[30%] mb-1 text-gray-600" htmlFor="date">
            Date
          </label>
          <Controller
            name="date"
            control={control}
            rules={{ required: "Date is required" }}
            render={({ field }) => (
              <div className="flex flex-col w-[70%]">
                <DatePicker
                  {...field}
                  className="border py-2.5 lg:w-[100%] text-black outline-none px-3 rounded text-sm border-gray-300 hover:border-gray-400 transition duration-200 shadow"
                  value={field.value ? dayjs(field.value, dateFormat) : null}
                  format={dateFormat}
                  onChange={(date, dateString) => {
                    setValue("date", dateString);
                  }}
                  disabledDate={(current) =>
                    current && current < dayjs().startOf("day")
                  }
                />
                {errors.date && (
                  <span className="text-red-500 text-sm">
                    {errors.date.message as string}
                  </span>
                )}
              </div>
            )}
          />
        </div>

        {/* Start Time */}
        <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
          <label className="md:w-[30%] mb-1 text-gray-600" htmlFor="startTime">
            Start Time
          </label>
          <Controller
            name="startTime"
            control={control}
            rules={{ required: "Start time is required" }}
            render={({ field }) => (
              <div className="flex flex-col w-[70%]">
                <TimePicker
                  {...field}
                  className="border py-2.5 lg:w-[100%] text-black outline-none px-3 rounded text-sm border-gray-300 hover:border-gray-400 transition duration-200 shadow"
                  format="HH:mm"
                  onChange={(time, timeString) => {
                    if (time && time.isValid()) {
                      handleStartTimeChange(time, timeString);
                    } else {
                      console.log("Invalid time selected");
                    }
                  }}
                  disabledTime={disabledTime}
                  value={field.value ? dayjs(field.value, "HH:mm") : null}
                />
                {errors.startTime && (
                  <span className="text-red-500 text-sm">
                    {errors.startTime.message as string}
                  </span>
                )}
              </div>
            )}
          />
        </div>

        {/* End Time */}
        <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
          <label className="md:w-[30%] mb-1 text-gray-600" htmlFor="endTime">
            End Time
          </label>
          <TimePicker
            className="py-2.5 outline-none w-[70%]"
            value={
              selectedStartTime
                ? dayjs(selectedStartTime, "HH:mm").add(1, "hour")
                : null
            }
            disabled={true}
            onChange={(time, timeString) => setValue("endTime", timeString)}
            format="HH:mm"
          />
          {errors.endTime && (
            <span className="text-red-500 text-sm">End time is required</span>
          )}
        </div>

        {/* Submit and Cancel Buttons */}
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
              onClick={() => {
                navigate("/admin/dashboard/slot-management");
              }}
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
