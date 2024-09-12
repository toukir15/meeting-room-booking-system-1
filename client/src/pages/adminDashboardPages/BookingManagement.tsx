/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import Notiflix from "notiflix";
import {
  useApproveBookingMutation,
  useGetBookingsQuery,
  useRejectBookingMutation,
} from "../../redux/features/bookingManagement/bookingApi";
import { toast } from "sonner";

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
  const { data: bookingData, isLoading: isBookingDataLoading } =
    useGetBookingsQuery(undefined);
  const [rejectBooking, { isLoading: isRejectBookingLoading }] =
    useRejectBookingMutation();
  const [approveBooking, { isLoading: isApproveBookingLoading }] =
    useApproveBookingMutation();

  const handleReject = async (id: string) => {
    Notiflix.Confirm.show(
      "Reject Confirmation",
      "Are you sure you want to reject this?",
      "Reject",
      "Cancel",
      function () {
        rejectBooking(id);
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

  const handleApprove = async (id: string) => {
    const result = await approveBooking(id);
    if (result.data.success) {
      toast.success("Successfully Approved", { duration: 2000 });
    }
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
          {record.isConfirmed !== "confirmed" && (
            <>
              <button
                onClick={() => handleApprove(record._id)}
                className="bg-green-500 hover:bg-green-600 transition duration-150 py-1 px-3 rounded text-white"
              >
                Approve
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 transition duration-150 py-1 px-3 rounded text-white"
                onClick={() => handleReject(record._id)}
              >
                Reject
              </button>
            </>
          )}
          {record.isConfirmed === "confirmed" && (
            <button
              className="bg-gray-600 transition duration-150 py-1 px-3 rounded text-white"
              disabled
            >
              Approved
            </button>
          )}
        </Space>
      ),
    },
  ];

  if (isRejectBookingLoading || isApproveBookingLoading) {
    Notiflix.Loading.dots();
  } else {
    Notiflix.Loading.remove();
  }

  return (
    <div className="px-4 lg:px-32 mt-8 lg:mt-20">
      <div className="overflow-x-auto">
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
          scroll={{ x: "max-content" }}
          loading={isBookingDataLoading}
        />
      </div>
    </div>
  );
}
