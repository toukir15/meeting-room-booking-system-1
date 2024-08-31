import { Space, Table } from "antd";
import type { TableProps } from "antd";
import { useNavigate } from "react-router-dom";

interface DataType {
  key: string;
  roomName: string;
  roomNo: number;
  date: string;
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

const data: DataType[] = [
  {
    key: "1",
    roomNo: 4,
    date: "04/04/2021",
    startTime: "9:00",
    endTime: "10:00",
    roomName: "John Browndsfffffffffffffffffff",
  },
  {
    key: "2",
    roomNo: 4,
    date: "04/04/2021",
    startTime: "9:00",
    endTime: "10:00",
    roomName: "Jim Green",
  },
  {
    key: "3",
    roomNo: 4,
    date: "04/04/2021",
    startTime: "9:00",
    endTime: "10:00",
    roomName: "Joe Black",
  },
  {
    key: "4",
    roomNo: 4,
    date: "04/04/2021",
    startTime: "9:00",
    endTime: "10:00",
    roomName: "John Browndsfffffffffffffffffff",
  },
  {
    key: "5",
    roomNo: 4,
    date: "04/04/2021",
    startTime: "9:00",
    endTime: "10:00",
    roomName: "Jim Green",
  },
  {
    key: "6",
    roomNo: 4,
    date: "04/04/2021",
    startTime: "9:00",
    endTime: "10:00",
    roomName: "Joe Black",
  },
  {
    key: "7",
    roomNo: 4,
    date: "04/04/2021",
    startTime: "9:00",
    endTime: "10:00",
    roomName: "John Browndsfffffffffffffffffff",
  },
  {
    key: "8",
    roomNo: 4,
    date: "04/04/2021",
    startTime: "9:00",
    endTime: "10:00",
    roomName: "Jim Green",
  },
  {
    key: "9",
    roomNo: 4,
    date: "04/04/2021",
    startTime: "9:00",
    endTime: "10:00",
    roomName: "Joe Black",
  },
  {
    key: "10",
    roomNo: 4,
    date: "04/04/2021",
    startTime: "9:00",
    endTime: "10:00",
    roomName: "Joe Black",
  },
  {
    key: "11",
    roomNo: 4,
    date: "04/04/2021",
    startTime: "9:00",
    endTime: "10:00",
    roomName: "Joe Black",
  },
];
export default function SlotManagement() {
  const navigate = useNavigate();
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
          dataSource={data}
          pagination={{ pageSize: 10 }}
          className="custom-table-header"
        />
      </div>
    </div>
  );
}
