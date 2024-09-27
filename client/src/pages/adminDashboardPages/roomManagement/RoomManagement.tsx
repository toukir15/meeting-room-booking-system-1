/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import {
  useDeleteRoomMutation,
  useGetManagementRoomsQuery,
} from "../../../redux/features/roomManagement/roomManagementApi";
import Notiflix from "notiflix";
import { useAppDispatch } from "../../../redux/hook";
import { setRoom } from "../../../redux/features/roomManagement/roomManagementSlice";

interface DataType {
  _id: string;
  key: string;
  roomName: string;
  roomNo: string;
  floorNo: string;
  capacity: string;
  pricePerSlot: string;
}

export default function RoomManagement() {
  const navigate = useNavigate();
  const { data: roomData, isLoading: isRoomDataLoading } =
    useGetManagementRoomsQuery(undefined);
  const [deleteRoom, { isLoading: isDeleteRoomLoading }] =
    useDeleteRoomMutation();
  const dispatch = useAppDispatch();

  const handleUpdate = (id: string) => {
    const findRoom = roomData?.data.find(
      (room: { _id: string }) => room._id == id
    );
    dispatch(setRoom(findRoom));
    navigate("/admin/dashboard/room-management/update-room");
  };

  const handleDelete = (id: string) => {
    Notiflix.Confirm.show(
      "Delete Confirmation",
      "Are you sure you want to delete this?",
      "Delete",
      "Cancel",
      function () {
        deleteRoom(id);
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
      title: "Room No",
      dataIndex: "roomNo",
      key: "roomNo",
      render: (text: string) => <Tag color={"orange"}>{text}</Tag>,
    },
    {
      title: "Floor No",
      dataIndex: "floorNo",
      key: "floorNo",
      render: (text: string) => <Tag color={"magenta"}>{text}</Tag>,
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
      render: (text: string) => <Tag color={"cyan"}>{text}</Tag>,
    },
    {
      title: "Price Per Slot",
      dataIndex: "pricePerSlot",
      key: "pricePerSlot",
      render: (price: string) => <Tag color="green">${price}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, render) => (
        <Space size="middle">
          <button
            onClick={() => handleUpdate(render._id)}
            className="bg-green-500 hover:bg-green-600 transition duration-150 py-1 px-3 rounded text-white"
          >
            Update
          </button>
          <button
            onClick={() => handleDelete(render._id)}
            className="bg-red-500 hover:bg-red-600 transition duration-150 py-1 px-3 rounded text-white"
          >
            Delete
          </button>
        </Space>
      ),
    },
  ];

  if (isDeleteRoomLoading) {
    Notiflix.Loading.dots();
  } else {
    Notiflix.Loading.remove();
  }

  return (
    <div className="lg:px-32 px-4 mt-8 md:12 lg:mt-20">
      <div className="flex justify-end"></div>
      <div>
        <Table
          columns={columns}
          dataSource={roomData?.data.map((room: { _id: any }) => {
            return { ...room, key: room._id };
          })}
          pagination={{ pageSize: 10 }}
          className="custom-table-header"
          scroll={{ x: "max-content" }}
          loading={isRoomDataLoading}
        />
      </div>
    </div>
  );
}
