import "./HomeConatiner.css";
import PostList from "../../components/home/PostList/PostList";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const HomeContainer = ({
  posts,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    inView && hasNextPage && fetchNextPage();
  }, [inView, hasNextPage]);

  return (
    <motion.article
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      className="home"
    >
      <PostList
        posts={posts}
        refProp={ref}
        isFetchingNextPage={isFetchingNextPage}
      />
    </motion.article>
  );
};

export default HomeContainer;
