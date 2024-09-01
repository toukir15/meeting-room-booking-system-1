import { Space, Table } from "antd";
import type { TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetRoomsQuery } from "../../../redux/features/roomManagement/roomManagementApi";

interface DataType {
  key: string;
  roomName: string;
  roomNo: string;
  floorNo: string;
  capacity: string;
  pricePerSlot: string;
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
    title: "Floor No",
    dataIndex: "floorNo",
    key: "floorNo",
  },
  {
    title: "Capacity",
    dataIndex: "capacity",
    key: "capacity",
  },
  {
    title: "Price Per Slot",
    dataIndex: "pricePerSlot",
    key: "pricePerSlot",
    render: (price) => <span>${price}</span>,
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

export default function RoomManagement() {
  const navigate = useNavigate();
  const { data: roomData } = useGetRoomsQuery(undefined);
  return (
    <div className="px-32 ">
      <div className="flex justify-end">
        <button
          onClick={() =>
            navigate("/admin/dashboard/room-management/create-room")
          }
          className="bg-rose-500 hover:bg-rose-600 transition duration-200 text-white py-2 px-6 rounded mb-6"
        >
          Create Room
        </button>
      </div>
      <div className="mt-20">
        <Table
          columns={columns}
          dataSource={roomData?.data}
          pagination={{ pageSize: 10 }}
          className="custom-table-header"
        />
      </div>
    </div>
  );
}
