import React, { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  roomName: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  images: FileList;
  availableQuantity: number;
};

export default function AddRoom() {
  const [fileNames, setFileNames] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleAddImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFileNames(files.map((file) => file.name));
    }
  };

  const handleAddRoom = (data: FormValues) => {
    const formData = new FormData();
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }
    formData.append("roomData", JSON.stringify(data));
  };

  return (
    <div className="min-h-[calc(100vh-110px)] pt-10 pb-20 lg:pb-0 lg:pt-0 w-full flex lg:justify-center items-center container mx-auto">
      <form
        onSubmit={handleSubmit(handleAddRoom)}
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
            Floor No
          </label>
          <input
            {...register("floorNo", { required: true })}
            className="border py-2.5 lg:w-[70%] text-black outline-none border-gray-300 px-3 rounded text-sm"
            type="number"
            placeholder="Floor no"
          />
          {errors.floorNo && (
            <span className="text-red-500 text-sm">
              Floor number is required
            </span>
          )}
        </div>

        <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
          <label className="md:w-[30%] mb-1" htmlFor="capacity">
            Capacity
          </label>
          <input
            {...register("capacity", { required: true })}
            className="border py-2.5 lg:w-[70%] text-black outline-none border-gray-300 px-3 rounded text-sm"
            type="number"
            placeholder="Capacity"
          />
          {errors.capacity && (
            <span className="text-red-500 text-sm">Capacity is required</span>
          )}
        </div>

        <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
          <label className="md:w-[30%] mb-1" htmlFor="pricePerSlot">
            Price Per Slot
          </label>
          <input
            {...register("pricePerSlot", { required: true })}
            className="border py-2.5 lg:w-[70%] text-black outline-none border-gray-300 px-3 rounded text-sm"
            type="number"
            placeholder="Price per slot"
          />
          {errors.pricePerSlot && (
            <span className="text-red-500 text-sm">
              Price per slot is required
            </span>
          )}
        </div>

        <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
          <label className="md:w-[30%] mb-1" htmlFor="addImage">
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
          <label
            htmlFor="addImage"
            className="py-2 px-5 rounded-full text-sm bg-primary cursor-pointer w-fit border border-rose-500 hover:border-rose-600 text-rose-500 hover:text-rose-600 transition duration-150"
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
          {errors.images && (
            <span className="text-red-500 text-sm">
              Image upload is required
            </span>
          )}
        </div>

        <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
          <label className="md:w-[30%] mb-1" htmlFor="availableQuantity">
            Available Quantity
          </label>
          <input
            {...register("availableQuantity", { required: true })}
            className="border py-2.5 lg:w-[70%] text-black outline-none border-gray-300 px-3 rounded text-sm"
            type="number"
            placeholder="Available quantity"
          />
          {errors.availableQuantity && (
            <span className="text-red-500 text-sm">
              Available quantity is required
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
              Add Room
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
