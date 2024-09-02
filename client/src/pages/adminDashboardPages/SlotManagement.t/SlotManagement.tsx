/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import "./SlotManagement.css";
import {
  useDeleteSlotMutation,
  useGetSlotsQuery,
} from "../../../redux/features/slotManagement/slotManagementApi";
import Notiflix from "notiflix";
import { useAppDispatch } from "../../../redux/hook";
import { setSlot } from "../../../redux/features/slotManagement/slotManagementSlice";

interface DataType {
  _id: string;
  key: string;
  roomName: string; // Ensure this is correctly named
  roomNo: number;
  date: string;
  isBooked: boolean;
  startTime: string;
  endTime: string;
}

export default function SlotManagement() {
  const navigate = useNavigate();
  const { data: slotData } = useGetSlotsQuery(undefined);
  const [deleteSlot] = useDeleteSlotMutation();
  const dispatch = useAppDispatch();

  const handleDelete = async (id: string) => {
    Notiflix.Confirm.show(
      "Delete Confirmation",
      "Are you sure you want to delete this?",
      "Delete",
      "Cancel",
      function () {
        deleteSlot(id);
      },
      function () {
        console.log("Canceled");
      },
      {
        borderRadius: "8px",
        titleColor: "#d33",
      }
    );
  };

  const handleUpdate = (id: string) => {
    const findSlot = slotData?.data.find(
      (slot: { _id: string }) => slot._id == id
    );
    dispatch(setSlot(findSlot));
    navigate("/admin/dashboard/slot-management/update-slot");
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Room Name",
      dataIndex: "roomName",
      key: "roomName",
    },
    {
      title: "Room No",
      dataIndex: "roomNo",
      key: "roomNo",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Booked Status",
      dataIndex: "isBooked",
      key: "isBooked",
      render: (isBooked: boolean) => {
        const tagColor = isBooked ? "volcano" : "green";
        const tagLabel = isBooked ? "Booked" : "Available";
        return (
          <Tag color={tagColor} key={tagLabel}>
            {tagLabel.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="bg-green-500 hover:bg-green-600 transition duration-150 py-1 px-3 rounded text-white"
            onClick={() => handleUpdate(record._id)}
          >
            Update
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 transition duration-150 py-1 px-3 rounded text-white"
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div className="px-32 ">
      <div className="flex justify-end">
        <button
          onClick={() =>
            navigate("/admin/dashboard/slot-management/create-slot")
          }
          className="bg-rose-500 hover:bg-rose-600 transition duration-200 text-white py-2 px-6 rounded mb-6 mt-20"
        >
          Create Slot
        </button>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={slotData?.data.map((item: { _id: any }) => ({
            ...item,
            key: item._id,
          }))}
          pagination={{ pageSize: 10 }}
          className="custom-table-header"
        />
      </div>
    </div>
  );
}
