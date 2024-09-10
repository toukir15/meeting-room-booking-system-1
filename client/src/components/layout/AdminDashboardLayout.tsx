import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu, Drawer } from "antd";
import { useState } from "react";
import Sider from "antd/es/layout/Sider";
import { MenuOutlined } from "@ant-design/icons";
import logo from "/icon.png";
import { CloseOutlined } from "@ant-design/icons";

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
  {
    key: "4",
    label: "User Management",
    icon: "icon-user-management",
    path: "/admin/dashboard/user-management",
  },
];

// Convert JSON data to Menu items
const menuItems = sidebarItems.map((item) => ({
  key: item.key,
  label: <a href={item.path}>{item.label}</a>,
}));

export default function AdminDashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleTitleClick = () => {
    navigate("/"); // Navigate to the home page
  };

  // Determine which menu item should be active based on the current location
  const activeKey = sidebarItems.find((item) =>
    location.pathname.includes(item.path)
  )?.key;

  // Toggle drawer for mobile view
  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sider for desktop */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg" // Collapse at large screens (1024px)
        width={250}
        collapsedWidth={80} // Width of the collapsed sider
        style={{
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1,
          backgroundColor: "#001529",
        }}
        className="sider-desktop"
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
            <img className="w-8" src={logo} alt="MeetEase logo" />
            {!collapsed && <span> MeetEase</span>}
          </button>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeKey as string]}
          style={{ color: "white", marginTop: "28px" }}
          items={menuItems.map((item) => ({
            ...item,
            style: {
              backgroundColor: activeKey === item.key ? "#F54361" : "inherit",
              color: activeKey === item.key ? "#fff" : "inherit",
            },
          }))}
        />
      </Sider>

      <Drawer
        title={
          <div
            onClick={handleTitleClick}
            style={{ color: "white", cursor: "pointer" }}
          >
            MeetEase
          </div>
        }
        placement="left"
        closable={true}
        onClose={toggleDrawer}
        visible={drawerVisible}
        bodyStyle={{ padding: 0 }}
        width={250}
        className="sider-mobile text-white"
        style={{ backgroundColor: "#001529" }}
        headerStyle={{ backgroundColor: "#001529" }}
        closeIcon={<CloseOutlined style={{ color: "white" }} />}
      >
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeKey as string]}
          style={{
            color: "white",
            marginTop: "10px",
            backgroundColor: "#001529",
          }}
          items={menuItems.map((item) => ({
            ...item,
            style: {
              backgroundColor: activeKey === item.key ? "#F54361" : "#001529",
              color: activeKey === item.key ? "#fff" : "inherit",
            },
          }))}
        />
      </Drawer>

      <div
        className="bg-gray-50"
        style={{
          marginLeft: collapsed ? 0 : 250, // Adjust based on collapse state
          width: "100%",
        }}
      >
        <div className="bg-[#001529] h-[70px] px-4 md:h-[100px] flex">
          {/* Hamburger menu for mobile */}

          <button
            onClick={toggleDrawer}
            className="mobile-menu-button text-white block lg:hidden"
          >
            <MenuOutlined size={32} />
          </button>

          <div className="container mx-auto flex justify-end items-center lg:px-24">
            {location.pathname == "/admin/dashboard/room-management" && (
              <button
                onClick={() =>
                  navigate("/admin/dashboard/room-management/create-room")
                }
                className="bg-rose-500 hover:bg-rose-600 transition duration-200 h-fit text-white py-1.5 lg:py-2 px-6 rounded "
              >
                Create Room
              </button>
            )}
            {location.pathname == "/admin/dashboard/slot-management" && (
              <button
                onClick={() =>
                  navigate("/admin/dashboard/slot-management/create-slot")
                }
                className="bg-rose-500 hover:bg-rose-600 transition duration-200 h-fit text-white py-1.5 lg:py-2 px-6 rounded "
              >
                Create Slot
              </button>
            )}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
