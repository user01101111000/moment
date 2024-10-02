import Skeleton from "../../components/ui/Skeleton/Skeleton";
import { motion } from "framer-motion";
import "./HomeLoading.css";

const HomeLoading = () => {
  const posts = Array.from({ length: 5 }, (_, i) => (
    <div className="loading_post" key={i}>
      <hr className="divider" />
      <div
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <Skeleton width="20%" height="1rem" borderRadius="4px" />
        <Skeleton width="80%" height="1rem" borderRadius="4px" />
      </div>

      <Skeleton width="100%" height="6rem" borderRadius="4px" />
    </div>
  ));

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="home"
    >
      <div className="flow">
        <h1 className="flow_title">MOMENT</h1>

        <div className="loading_post_list">{posts}</div>

        <p className="made_by">
          Made by{" "}
          <a href="https://github.com/user01101111000" target="_blank">
            user01101111000
          </a>
        </p>
      </div>
    </motion.article>
  );
};

export default HomeLoading;
