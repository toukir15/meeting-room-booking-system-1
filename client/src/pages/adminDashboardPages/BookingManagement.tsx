/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useDeleteSlotMutation } from "../../redux/features/slotManagement/slotManagementApi";
import Notiflix from "notiflix";
import { useAppDispatch } from "../../redux/hook";
import { useGetBookingsQuery } from "../../redux/features/bookingManagement/bookingApi";

interface DataType {
  _id: string;
  key: string;
  roomName: string;
  userName: string;
  date: string;
  startTime: string;
  endTime: string;
  isConfirmed: string;
}

export default function BookingManagement() {
  const navigate = useNavigate();
  const { data: bookingData } = useGetBookingsQuery(undefined);
  const [deleteSlot] = useDeleteSlotMutation();
  const dispatch = useAppDispatch();
  console.log(bookingData);

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

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Room Name",
      dataIndex: "roomName",
      key: "roomName",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => {
        return <Tag color={"purple"}>{date}</Tag>;
      },
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (startTime: string) => {
        return <Tag color={"blue"}>{startTime}</Tag>;
      },
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (endTime: string) => {
        return <Tag color={"cyan"}>{endTime}</Tag>;
      },
    },
    {
      title: "Booking Status",
      dataIndex: "isConfirmed",
      key: "isConfirmed",
      render: (isConfirmed: string) => {
        const tagColor = isConfirmed === "confirmed" ? "volcano" : "green";
        const tagLabel =
          isConfirmed === "confirmed" ? "Confirmed" : "Unconfirmed";
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
          <button className="bg-green-500 hover:bg-green-600 transition duration-150 py-1 px-3 rounded text-white">
            Approve
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 transition duration-150 py-1 px-3 rounded text-white"
            onClick={() => handleDelete(record._id)}
          >
            Reject
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div className="px-32 mt-28">
      <div>
        <Table
          columns={columns}
          dataSource={bookingData?.data.map((item: any) => ({
            key: item._id,
            _id: item._id,
            roomName: item.room.roomName,
            userName: item.user.name,
            date: item.slot.date,
            startTime: item.slot.startTime,
            endTime: item.slot.endTime,
            isConfirmed: item.isConfirmed,
          }))}
          pagination={{ pageSize: 10 }}
          className="custom-table-header"
        />
      </div>
    </div>
  );
}
