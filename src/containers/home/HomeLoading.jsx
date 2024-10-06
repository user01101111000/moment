import Skeleton from "../../components/ui/Skeleton/Skeleton";
import { motion } from "framer-motion";
import "./HomeLoading.css";
import Loading from "../../components/ui/Loading";

const HomeLoading = () => {
  // const posts = Array.from({ length: 5 }, (_, i) => (
  //   <div className="loading_post" key={i}>
  //     <hr className="divider" />
  //     <div
  //       style={{
  //         display: "flex",
  //         gap: "1rem",
  //       }}
  //     >
  //       <Skeleton width="20%" height="1rem" borderRadius="4px" />
  //       <Skeleton width="80%" height="1rem" borderRadius="4px" />
  //     </div>

  //     <Skeleton width="100%" height="6rem" borderRadius="4px" />
  //   </div>
  // ));

  // return (
  //   <motion.article
  //     initial={{ opacity: 0 }}
  //     animate={{ opacity: 1 }}
  //     className="home"
  //   >
  //     <div className="loading_post_list">{posts}</div>
  //   </motion.article>
  // );

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="loading_container"
    >
      <Loading size={"1.3rem"} />
    </motion.article>
  );
};

export default HomeLoading;
