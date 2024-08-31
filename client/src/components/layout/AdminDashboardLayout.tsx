import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";

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
          backgroundColor: "#001529", // Dark background color for the entire Sider
        }}
      >
        <div
          style={{
            color: "white",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#001529", // Match background with the Sider
          }}
        >
          <button
            onClick={() => navigate("/")}
            style={{ color: "white", background: "none", border: "none" }}
          >
            MeetEase
          </button>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeKey as string]}
          style={{ color: "white" }} // Set the default link color
          items={menuItems}
        />
      </Sider>
      <div style={{ marginLeft: 250, padding: "1rem", width: "100%" }}>
        <Outlet />
      </div>
    </div>
  );
}
