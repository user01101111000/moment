import PostList from "../../components/home/PostList/PostList";
import { motion } from "framer-motion";
import "./HomeConatiner.css";

const HomeContainer = ({ posts }) => {
  return (
    <motion.article
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      className="home"
    >
      <PostList posts={posts} />
    </motion.article>
  );
};

export default HomeContainer;
