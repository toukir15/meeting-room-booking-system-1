import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hook";
import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({
  children,
}: {
  children: ReactNode;
}) {
  const user = useAppSelector((state) => state.auth.user);
  if (user?.role !== "admin") {
    return <Navigate to={"/login"} replace />;
  }
  return children;
}
