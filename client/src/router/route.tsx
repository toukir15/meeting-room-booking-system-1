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
import SlotManagement from "../pages/adminDashboardPages/SlotManagement";
import BookingManagement from "../pages/adminDashboardPages/BookingManagement";
import AddRoom from "../pages/adminDashboardPages/roomManagement/AddRoom";

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
        element: <MeetingRoomsPage />,
      },
      {
        path: "room-details",
        element: <RoomDetails />,
      },
      {
        path: "book-room",
        element: <BookRoom />,
      },
      {
        path: "error",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboardLayout />,
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
        path: "room-management/add-room",
        element: <AddRoom />,
      },
      {
        path: "slot-management",
        element: <SlotManagement />,
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
