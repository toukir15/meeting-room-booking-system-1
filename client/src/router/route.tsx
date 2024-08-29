import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import AboutUsPage from "../pages/AboutUsPage";
import ContactUs from "../pages/ContactUsPage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/AuthenticationPages/LoginPage";
import SignupPage from "../pages/AuthenticationPages/SignupPage";
import MeetingRoomsPage from "../pages/MeetingRoomsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about-us",
        element: <AboutUsPage />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/meeting-rooms",
        element: <MeetingRoomsPage />,
      },
      {
        path: "/error",
        element: <ErrorPage />,
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
