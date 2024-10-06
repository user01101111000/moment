import useAuth from "../../hooks/common/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedAuthRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) return <Navigate to={"/"} replace />;

  return children;
};

export default ProtectedAuthRoute;
