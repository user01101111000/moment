import "./page.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <motion.section
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      className="notfound"
    >
      <h1>Page Not Found</h1>
      <button onClick={() => navigate("/")}>Go Home</button>
    </motion.section>
  );
};

export default NotFound;
