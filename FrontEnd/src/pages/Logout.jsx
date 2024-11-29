import { useEffect } from "react";
import { useAuth } from "../store/auth";
import { Navigate } from "react-router-dom";

export const Logout = () => {
  const { LogoutUser } = useAuth();

  useEffect(() => {
    LogoutUser(); // Clear the token and perform logout
  }, [LogoutUser]);

  // Immediately redirect to the login page after logout
  return <Navigate to="/login" />;
};
