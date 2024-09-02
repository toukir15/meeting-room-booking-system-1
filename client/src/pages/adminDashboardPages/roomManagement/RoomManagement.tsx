import { Space, Table } from "antd";
import type { TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import {
  useDeleteRoomMutation,
  useGetRoomsQuery,
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
  const { data: roomData } = useGetRoomsQuery(undefined);
  const [deleteRoom] = useDeleteRoomMutation();
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
      render: (_, render) => (
        <Space size="middle">
          <button
            onClick={() => {
              handleUpdate(render._id);
            }}
            className="bg-green-500 hover:bg-green-600 transition duration-150 py-1 px-3 rounded text-white"
          >
            Update
          </button>
          <button
            onClick={() => {
              handleDelete(render._id);
            }}
            className="bg-red-500 hover:bg-red-600 transition duration-150 py-1 px-3 rounded text-white"
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
            navigate("/admin/dashboard/room-management/create-room")
          }
          className="bg-rose-500 hover:bg-rose-600 transition duration-200 text-white py-2 px-6 rounded mb-6 mt-20"
        >
          Create Room
        </button>
      </div>
      <div>
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
