import { DatePicker, Select, TimePicker } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "./CreateSlot.css";
import { useAppSelector } from "../../../redux/hook";
import { RootState } from "../../../redux/store";
import { useUpdateSlotMutation } from "../../../redux/features/slotManagement/slotManagementApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Notiflix from "notiflix";

// Define the slotDetails interface
interface slotDetails {
  _id: string;
  roomName: string;
  roomNo: number;
  startTime: string;
  endTime: string;
}

// Define the form data structure
interface FormData {
  date: string;
}

export default function UpdateSlot() {
  dayjs.extend(customParseFormat);
  const dateFormat = "YYYY-MM-DD";
  const slot = useAppSelector(
    (state: RootState) => state.slotManagement.slot
  ) as unknown as slotDetails;
  const [updateSlot, { isLoading: isUpdateSlotLoading }] =
    useUpdateSlotMutation();
  const navigate = useNavigate();

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  // Handle form submission, only sending the date
  const handleCreateSlot: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await updateSlot({ date: data.date, id: slot._id });
      if (response.data.success) {
        toast.success("Slot update successfully", { duration: 2000 });
        navigate("/admin/dashboard/slot-management");
      }
    } catch (error) {
      console.error("Failed to update slot:", error);
    }
  };

  const selectedDate = watch("date");

  if (isUpdateSlotLoading) {
    Notiflix.Loading.dots();
  } else {
    Notiflix.Loading.remove();
  }

  return (
    <div className="min-h-[calc(100vh-110px)] pt-10 pb-20 lg:pb-0 lg:pt-0 w-full flex lg:justify-center items-center container mx-auto">
      <form
        onSubmit={handleSubmit(handleCreateSlot)}
        method="post"
        className="flex lg:w-[50%] lg:mx-auto w-full px-4 flex-col"
      >
        {/* Room Name */}
        <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
          <label className="md:w-[30%] mb-1" htmlFor="roomName">
            Room Name
          </label>
          <Select
            className="lg:w-[70%] border rounded-md border-[#B0BEC5] hover:border-[#80CBC4] transition duration-200 bg-white"
            showSearch
            placeholder="Select a room"
            disabled
            defaultValue={slot?.roomName}
            style={{
              padding: "6px",
              height: "42px",
              lineHeight: "1.25",
              borderColor: "#d9d9d9",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Room No */}
        <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
          <label className="md:w-[30%] mb-1" htmlFor="roomNo">
            Room No
          </label>
          <input
            className="border py-2.5 lg:w-[70%] text-black outline-none  px-3 rounded text-sm  transition duration-200 bg-[#F5F5F5]"
            type="number"
            defaultValue={slot?.roomNo}
            disabled
            placeholder="Room no"
          />
        </div>

        {/* Date */}
        <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
          <label className="md:w-[30%] mb-1" htmlFor="date">
            Date
          </label>
          <DatePicker
            className="py-2.5 lg:w-[70%] border-[#B0BEC5] hover:border-[#80CBC4] transition duration-200 bg-white]"
            value={selectedDate ? dayjs(selectedDate, dateFormat) : null}
            format={dateFormat}
            required
            onChange={(_date, dateString) => {
              setValue("date", dateString as string);
            }}
            disabledDate={(current) =>
              current && current < dayjs().startOf("day")
            }
          />

          {errors.date && (
            <span className="text-red-500 text-sm">Date is required</span>
          )}
        </div>

        {/* Start Time */}
        <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
          <label className="md:w-[30%] mb-1" htmlFor="startTime">
            Start Time
          </label>
          <TimePicker
            className="py-2.5 outline-none lg:w-[70%] border-[#B0BEC5] hover:border-[#80CBC4] transition duration-200 bg-[#E0F7FA]"
            format="HH:mm"
            defaultValue={
              slot?.startTime ? dayjs(slot?.startTime, "HH:mm") : null
            }
            disabled
          />
        </div>

        {/* End Time */}
        <div className="flex flex-col md:flex-row w/full md:items-center mb-2 md:mb-6">
          <label className="md:w-[30%] mb-1" htmlFor="endTime">
            End Time
          </label>
          <TimePicker
            className="py-2.5 outline-none lg:w-[70%] bg-[#E8F0FD]"
            disabled={true}
            format="HH:mm"
            defaultValue={slot?.endTime ? dayjs(slot?.endTime, "HH:mm") : null}
          />
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex flex-col md:flex-row w/full md:items-center">
          <div className="md:w-[30%] mb-1"></div>
          <div className="md:lg:w-[70%] flex gap-6">
            <button
              type="submit"
              className="w-1/2 bg-rose-500 hover:bg-rose-600 text-white transition duration-150 font-medium py-2 lg:py-3 px-4 rounded-lg"
            >
              Update Slot
            </button>
            <button
              onClick={() => {
                navigate("/admin/dashboard/slot-management");
              }}
              type="button"
              className="w-1/2 border border-rose-500 hover:border-rose-600 text-rose-500 hover:text-rose-600 py-2 lg:py-3 px-4 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
