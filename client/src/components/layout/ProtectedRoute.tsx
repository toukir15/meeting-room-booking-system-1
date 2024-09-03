import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hook";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const user = useAppSelector((state) => state.auth.user);
  if (!user) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
}
