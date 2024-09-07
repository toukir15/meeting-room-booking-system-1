import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateRoomMutation } from "../../../redux/features/roomManagement/roomManagementApi";
import { Select } from "antd";
import type { SelectProps } from "antd";
import "./AddRoom.css";
import { useNavigate } from "react-router-dom";

type FormValues = {
  roomName: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  availableQuantity: number;
  images: FileList;
};

export default function AddRoom() {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]); // State for selected amenities
  const [createRoom] = useCreateRoomMutation();
  const navigate = useNavigate();

  console.log(amenities);
  const options: SelectProps["options"] = [
    { value: "Wifi", label: "Wifi" },
    { value: "Projector", label: "Projector" },
  ];

  const handleChange = (value: string[]) => {
    setAmenities(value); // Update amenities state
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleAddImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setFiles(fileArray);
      setFileNames(fileArray.map((file) => file.name));
    }
  };

  const handleAddRoom = (data: FormValues) => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append(`file`, file); // Each file gets a unique indexed key
    });

    // Append other form data
    formData.append(
      "data",
      JSON.stringify({
        roomName: data.roomName,
        roomNo: data.roomNo,
        floorNo: data.floorNo,
        capacity: data.capacity,
        pricePerSlot: data.pricePerSlot,
        availableQuantity: data.availableQuantity,
        amenities: amenities, // Include the selected amenities
      })
    );

    createRoom(formData)
      .unwrap()
      .then((response) => {
        console.log(response);
        if (response.success) {
          navigate("/admin/dashboard/room-management");
        }
      })
      .catch((error) => {
        console.error("Error adding room:", error);
      });
  };

  return (
    <div className="min-h-[calc(100vh-110px)] pt-10 pb-20 lg:pb-0 lg:pt-0 w-full flex lg:justify-center items-center container mx-auto">
      <form
        onSubmit={handleSubmit(handleAddRoom)}
        method="post"
        encType="multipart/form-data" // Important for file uploads
        className="flex lg:w-[50%] lg:mx-auto w-full px-4 flex-col create-room"
      >
        {/* Form Fields */}
        <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
          <label className="md:w-[30%] mb-1 text-gray-600" htmlFor="roomName">
            Room Name
          </label>
          <div className="w-[70%] flex flex-col">
            <input
              {...register("roomName", { required: true })}
              className="border py-2.5 lg:w-[100%] text-black outline-none  px-3 rounded text-sm border-gray-300 hover:border-gray-400 transition duration-200 shadow"
              type="text"
              placeholder="Room name"
            />
            {errors.roomName && (
              <span className="text-red-500 text-sm ">
                Room name is required
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
          <label className="md:w-[30%] mb-1 text-gray-600" htmlFor="roomNo">
            Room No
          </label>

          <div className="w-[70%] flex flex-col">
            <input
              {...register("roomNo", { required: true })}
              className="border py-2.5 lg:w-[100%] text-black outline-none  px-3 rounded text-sm border-gray-300 hover:border-gray-400 transition duration-200 shadow"
              type="number"
              placeholder="Room no"
            />
            {errors.roomNo && (
              <span className="text-red-500 text-sm">
                Room number is required
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
          <label className="md:w-[30%] mb-1 text-gray-600" htmlFor="floorNo">
            Floor No
          </label>
          <div className="w-[70%] flex flex-col">
            <input
              {...register("floorNo", { required: true })}
              className="border py-2.5 lg:w-[100%] text-black outline-none  px-3 rounded text-sm border-gray-300 hover:border-gray-400 transition duration-200 shadow"
              type="number"
              placeholder="Floor no"
            />
            {errors.floorNo && (
              <span className="text-red-500 text-sm">
                Floor number is required
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
          <label className="md:w-[30%] mb-1 text-gray-600" htmlFor="capacity">
            Capacity
          </label>
          <div className="w-[70%] flex flex-col">
            <input
              {...register("capacity", { required: true })}
              className="border py-2.5 lg:w-[100%] text-black outline-none  px-3 rounded text-sm border-gray-300 hover:border-gray-400 transition duration-200 shadow"
              type="number"
              placeholder="Capacity"
            />
            {errors.capacity && (
              <span className="text-red-500 text-sm">Capacity is required</span>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
          <label
            className="md:w-[30%] mb-1 text-gray-600"
            htmlFor="pricePerSlot"
          >
            Price Per Slot
          </label>
          <div className="w-[70%] flex flex-col">
            <input
              {...register("pricePerSlot", { required: true })}
              className="border py-2.5 lg:w-[100%] text-black outline-none  px-3 rounded text-sm border-gray-300 hover:border-gray-400 transition duration-200 shadow"
              type="number"
              placeholder="Price per slot"
            />
            {errors.pricePerSlot && (
              <span className="text-red-500 text-sm">
                Price per slot is required
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
          <label className="md:w-[30%] mb-1 text-gray-600" htmlFor="amenities">
            Amenities
          </label>
          <div className="w-[70%] flex flex-col">
            <div className="w-[100%]">
              <Select
                mode="tags"
                className="border rounded border-gray-300 hover:border-gray-400 transition duration-200"
                style={{ width: "100%" }}
                placeholder="Amenities"
                onChange={handleChange}
                options={options}
              />
            </div>
            {errors.pricePerSlot && (
              <span className="text-red-500 text-sm">Amenites is required</span>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
          <label className="md:w-[30%] mb-1 text-gray-600" htmlFor="addImage">
            Add Images
          </label>
          <input
            {...register("images", { required: true })}
            onChange={handleAddImageChange}
            type="file"
            id="addImage"
            className="hidden"
            multiple
          />
          <div className="flex flex-col">
            <div className="flex items-center">
              <label
                htmlFor="addImage"
                className="py-2 px-5 rounded-full h-fit text-sm bg-white cursor-pointer w-fit border border-rose-500 hover:border-rose-600 text-rose-500 hover:text-rose-600 transition duration-150"
              >
                Upload Files
              </label>
              <div className="ml-3">
                {fileNames.length > 0 && (
                  <ul>
                    {fileNames.map((name, index) => (
                      <li key={index} className="text-sm text-gray-700">
                        {name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {errors.images && fileNames.length < 1 && (
              <span className="text-red-500 text-sm mt-2 ml-2">
                Image upload is required
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
          <label
            className="md:w-[30%] mb-1 text-gray-600"
            htmlFor="availableQuantity"
          >
            Available Quantity
          </label>
          <div className="w-[70%] flex flex-col">
            <input
              {...register("availableQuantity", { required: true })}
              className="border py-2.5 lg:w-[100%] text-black outline-none  px-3 rounded text-sm border-gray-300 hover:border-gray-400 transition duration-200 shadow"
              type="number"
              placeholder="Available quantity"
            />
            {errors.availableQuantity && (
              <span className="text-red-500 text-sm">
                Available quantity is required
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full md:items-center">
          <div className="md:w-[30%] mb-1"></div>
          <div className="md:lg:w-[70%] flex gap-6">
            <button
              type="submit"
              className="w-1/2 bg-rose-500 hover:bg-rose-600 text-white transition duration-150 font-medium py-3 px-4 rounded-lg"
            >
              Add Room
            </button>
            <button
              onClick={() => {
                navigate("/admin/dashboard/room-management");
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
