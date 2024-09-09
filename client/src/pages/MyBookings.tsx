/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Tag, Row, Col } from "antd";
import type { TableProps } from "antd";
import { useGetMyBookingsQuery } from "../redux/features/booking/bookingApi";
import SecondaryNavbar from "../components/shared/SecondaryNavbar";

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
  const { data: bookingData } = useGetMyBookingsQuery(undefined);
  console.log(bookingData);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Room Name",
      dataIndex: "roomName",
      key: "roomName",
      responsive: ["md"], // Only visible on medium screens and above
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
  ];

  return (
    <div className="h-screen">
      <div>
        <SecondaryNavbar />
        <div className="mt-20 container mx-auto px-4">
          {/* Responsive Layout for the table */}
          <Row justify="center">
            <Col xs={24} md={20} lg={24}>
              <Table
                columns={columns}
                dataSource={bookingData?.data.map((item: any) => ({
                  key: item._id,
                  _id: item._id,
                  roomName: item.room.roomName,
                  date: item.slot.date,
                  startTime: item.slot.startTime,
                  endTime: item.slot.endTime,
                  isConfirmed: item.isConfirmed,
                }))}
                pagination={{ pageSize: 10 }}
                className="custom-table-header"
                scroll={{ x: 600 }}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
