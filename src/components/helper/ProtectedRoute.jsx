import useAuth from "../../hooks/common/useAuth";
import { Navigate } from "react-router-dom";
import { decryptToken } from "../../utils/cryptoID";
import isTokenExpired from "../../utils/isTokenExpired ";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to={"/auth"} replace />;

  return children;
};

export default ProtectedRoute;
