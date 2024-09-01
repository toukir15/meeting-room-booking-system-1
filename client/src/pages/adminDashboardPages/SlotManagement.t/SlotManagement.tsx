import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetSlotsQuery } from "../../../redux/features/slotManagement/slotManagementApi";

interface DataType {
  key: string;
  room: string;
  roomNo: number;
  date: string;
  isBooked: boolean;
  startTime: string;
  endTime: string;
}

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
    render: () => (
      <Space size="middle">
        <button className="bg-green-500 hover:bg-green-600 transition duration-150 py-1 px-3 rounded text-white">
          Update
        </button>
        <button className="bg-red-500 hover:bg-red-600 transition duration-150 py-1 px-3 rounded text-white">
          Delete
        </button>
      </Space>
    ),
  },
];

export default function SlotManagement() {
  const navigate = useNavigate();
  const { data } = useGetSlotsQuery(undefined);
  return (
    <div className="px-32 ">
      <div className="flex justify-end">
        <button
          onClick={() =>
            navigate("/admin/dashboard/slot-management/create-slot")
          }
          className="bg-rose-500 hover:bg-rose-600 transition duration-200 text-white py-2 px-6 rounded mb-6"
        >
          Create Slot
        </button>
      </div>
      <div className="mt-20">
        <Table
          columns={columns}
          dataSource={data?.data}
          pagination={{ pageSize: 10 }}
          className="custom-table-header"
        />
      </div>
    </div>
  );
}
