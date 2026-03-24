import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Admin from "./Admin";

/** Admin sahifani himoyalash — login qilmagan bo'lsa /admin/login ga yo'naltirish */
export default function AdminGuard() {
  const location = useLocation();

  if (!isAuthenticated()) {
    return (
      <Navigate to="/sputnik/admin/login" state={{ from: location }} replace />
    );
  }

  return <Admin />;
}
