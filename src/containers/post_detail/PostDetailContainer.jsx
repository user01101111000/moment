import "./PostDetailContainer.css";
import CurrentPost from "../..//components/post_detail/CurrentPost/CurrentPost";
import Comments from "../..//components/post_detail/Comments/Comments";
import { motion } from "framer-motion";

const PostDetailContainer = ({ post, comments }) => {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="post_detail"
    >
      <CurrentPost post={post} commentsLength={comments.length} />

      <h1 className="reply_label">Replies</h1>
      <Comments comments={comments} />
    </motion.article>
  );
};

export default PostDetailContainer;
