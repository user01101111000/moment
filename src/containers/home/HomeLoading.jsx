import "./HomeLoading.css";
import "../../components/home/Post/Post.css";
import "../../components/home/PostList/PostList.css";
import "../../containers/home/HomeConatiner.css";
import { motion } from "framer-motion";
import OnePostLoading from "../../components/ui/OnePostLoading/OnePostLoading";

const HomeLoading = ({ length = 8 }) => {
  const posts = Array.from({ length }, (_, i) => <OnePostLoading key={i} hr />);

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="home"
    >
      <div className="post_list">{posts}</div>
    </motion.article>
  );
};

export default HomeLoading;
