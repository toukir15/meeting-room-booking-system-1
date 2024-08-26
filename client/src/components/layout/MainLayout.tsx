import { Outlet } from "react-router-dom";
import Footer from "../home/Footer";

export default function MainLayout() {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  );
}
