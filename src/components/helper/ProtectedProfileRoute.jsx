import { useParams } from "react-router-dom";
import NotFound from "../../pages/not_found/page";

const ProtectedProfileRoute = ({ children }) => {
  const { username } = useParams();

  if (!username.startsWith("@")) return <NotFound />;

  return children;
};

export default ProtectedProfileRoute;
