import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";
import path from "../utils/path";

const PublicRoute = ({
  redirectPath = path.DASHBOARD,
}: {
  redirectPath?: string;
}) => {
  const { token } = useAuthStore();

  if (token) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
