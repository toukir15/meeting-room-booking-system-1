import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import AboutUsPage from "../pages/AboutUsPage";
import ContactUs from "../pages/ContactUsPage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/AuthenticationPages/LoginPage";
import SignupPage from "../pages/AuthenticationPages/SignupPage";
import MeetingRoomsPage from "../pages/MeetingRoomsPage";
import RoomDetails from "../pages/RoomDetails";
import BookRoom from "../pages/BookRoom";
import AdminDashboardLayout from "../components/layout/AdminDashboardLayout";
import RoomManagement from "../pages/adminDashboardPages/roomManagement/RoomManagement";
import SlotManagement from "../pages/adminDashboardPages/SlotManagement.t/SlotManagement";
import BookingManagement from "../pages/adminDashboardPages/BookingManagement";
import AddRoom from "../pages/adminDashboardPages/roomManagement/AddRoom";
import CreateSlot from "../pages/adminDashboardPages/SlotManagement.t/CreateSlot";
import UpdateRoom from "../pages/adminDashboardPages/roomManagement/UpdateRoom";
import UpdateSlot from "../pages/adminDashboardPages/SlotManagement.t/UpdateSlot";
import AdminProtectedRoute from "../components/layout/AdminProtectedRoute";
import ProtectedRoute from "../components/layout/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "about-us",
        element: <AboutUsPage />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: "meeting-rooms",
        element: (
          <ProtectedRoute>
            <MeetingRoomsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "room-details",
        element: (
          <ProtectedRoute>
            <RoomDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "book-room",
        element: (
          <ProtectedRoute>
            <BookRoom />
          </ProtectedRoute>
        ),
      },
      {
        path: "error",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: (
      <AdminProtectedRoute>
        <AdminDashboardLayout />
      </AdminProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="room-management" />,
      },
      {
        path: "room-management",
        element: <RoomManagement />,
      },
      {
        path: "room-management/create-room",
        element: <AddRoom />,
      },
      {
        path: "room-management/update-room",
        element: <UpdateRoom />,
      },
      {
        path: "slot-management",
        element: <SlotManagement />,
      },
      {
        path: "slot-management/create-slot",
        element: <CreateSlot />,
      },
      {
        path: "slot-management/update-slot",
        element: <UpdateSlot />,
      },
      {
        path: "booking-management",
        element: <BookingManagement />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <SignupPage />,
  },
]);

export default router;
