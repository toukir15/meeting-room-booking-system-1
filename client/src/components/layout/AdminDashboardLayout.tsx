import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import logo from "../../../public/icon.png";

// Static JSON data
const sidebarItems = [
  {
    key: "1",
    label: "Room Management",
    icon: "icon-room-management",
    path: "/admin/dashboard/room-management",
  },
  {
    key: "2",
    label: "Slots Management",
    icon: "icon-slots-management",
    path: "/admin/dashboard/slot-management",
  },
  {
    key: "3",
    label: "Booking Management",
    icon: "icon-booking-management",
    path: "/admin/dashboard/booking-management",
  },
];

// Convert JSON data to Menu items
const menuItems = sidebarItems.map((item) => ({
  key: item.key,
  // icon: <YourIconComponent name={item.icon} />,
  label: <a href={item.path}>{item.label}</a>,
}));

export default function AdminDashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine which menu item should be active based on the current location
  const activeKey = sidebarItems.find((item) =>
    location.pathname.includes(item.path)
  )?.key;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sider
        width={250}
        style={{
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1,
          backgroundColor: "#001529",
        }}
      >
        <div
          style={{
            color: "white",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#001529",
          }}
        >
          <button
            onClick={() => navigate("/")}
            style={{ color: "white", background: "none", border: "none" }}
            className="text-2xl font-medium flex items-center gap-4"
          >
            <img className="w-8" src={logo} alt="" />
            <span> MeetEase</span>
          </button>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeKey as string]}
          style={{ color: "white", marginTop: "20px" }}
          items={menuItems.map((item) => ({
            ...item,
            style: {
              backgroundColor: activeKey === item.key ? "#F54361" : "inherit",
              color: activeKey === item.key ? "#fff" : "inherit",
            },
          }))}
        />
      </Sider>
      <div style={{ marginLeft: 250, padding: "1rem", width: "100%" }}>
        <Outlet />
      </div>
    </div>
  );
}
