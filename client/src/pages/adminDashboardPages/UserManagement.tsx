/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import Notiflix from "notiflix";
import {
  useGetUsersQuery,
  useMakeAdminMutation,
} from "../../redux/features/user/userApi";

interface DataType {
  _id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  role: string;
}

export default function UserManagement() {
  const { data: usersData, isLoading: isUsersDataLoading } =
    useGetUsersQuery(undefined);

  const [makeAdmin] = useMakeAdminMutation();

  const handleMakeAdmin = async (id: string) => {
    Notiflix.Confirm.show(
      "Approve Admin",
      "Are you sure you want to make this user admin?",
      "Confirm",
      "Cancel",
      function () {
        makeAdmin(id);
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
      title: "User Name",
      dataIndex: "name",
      key: "name    ",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: string) => {
        return <Tag color={"lime"}>{email}</Tag>;
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address: string) => {
        return <Tag color={"purple"}>{address}</Tag>;
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (phone: string) => {
        return <Tag color={"blue"}>{phone}</Tag>;
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => {
        return <Tag color={"green"}>{role}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <>
            <button
              onClick={() => handleMakeAdmin(record._id)}
              className="bg-green-500 hover:bg-green-600 transition duration-150 py-1 px-3 rounded text-white"
            >
              Make Admin
            </button>
          </>
        </Space>
      ),
    },
  ];

  return (
    <div className="px-4 lg:px-32 mt-8 lg:mt-20">
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={usersData?.data.map((item: any) => {
            return { ...item, key: item._id };
          })}
          pagination={{ pageSize: 10 }}
          className="custom-table-header"
          scroll={{ x: "max-content" }}
          loading={isUsersDataLoading}
        />
      </div>
    </div>
  );
}
