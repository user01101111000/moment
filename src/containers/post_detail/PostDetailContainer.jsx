import "./PostDetailContainer.css";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import CurrentPost from "@/components/post_detail/CurrentPost/CurrentPost";
import Comments from "@/components/post_detail/Comments/Comments";
import { motion } from "framer-motion";

const PostDetailContainer = ({ post, comments }) => {
  const navigate = useNavigate();
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="post_detail"
    >
      <div className="detail_flow">
        <div className="flow_header">
          <IoIosArrowBack className="back_icon" onClick={() => navigate("/")} />

          <h1 className="flow_title" onClick={() => navigate("/")}>
            MOMENT
          </h1>
          <div></div>
        </div>

        <CurrentPost post={post} commentsLength={comments.length} />

        <Comments comments={comments} />

        <hr className="divider" />
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

export default PostDetailContainer;
