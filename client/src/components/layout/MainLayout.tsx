import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <Outlet />
      {/* <div>This is footer</div> */}
    </div>
  );
}
