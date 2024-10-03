import "./PostDetailContainer.css";
import CurrentPost from "../..//components/post_detail/CurrentPost/CurrentPost";
import Comments from "../..//components/post_detail/Comments/Comments";
import { motion } from "framer-motion";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const PostDetailContainer = ({ post, comments }) => {
  const navigate = useNavigate();

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="post_detail"
    >
      <div className="post_detail_header">
        <IoArrowBack
          className="post_detail_back_icon"
          onClick={() => navigate("/")}
        />
      </div>
      <CurrentPost post={post} commentsLength={comments.length} />

      <div className="reply_label_area">
        <h1 className="reply_label">
          Likes ·{" "}
          <span className="reply_count">{post.likeCount.stringValue}</span>
        </h1>
        <h1 className="reply_label">
          Replies ·{" "}
          <span className="reply_count">
            {comments.length ? comments.length : "No replies yet"}
          </span>
        </h1>
      </div>
      <Comments comments={comments} />
    </motion.article>
  );
};

export default PostDetailContainer;
