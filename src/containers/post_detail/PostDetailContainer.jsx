import "./PostDetailContainer.css";
import Comments from "../..//components/post_detail/Comments/Comments";
import { motion, AnimatePresence } from "framer-motion";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Post from "../../components/home/Post/Post";
import { useState } from "react";
import AddPostWindow from "../../components/home/AddPostWindow/AddPostWindow";
import useAddCommentMutation from "../../hooks/api/useAddCommentMutation";
import { useSelector } from "react-redux";

const PostDetailContainer = ({ post, comments }) => {
  const { userInfo } = useSelector((state) => state.userInfo);
  const navigate = useNavigate();
  const [add, setAdd] = useState(false);

  const { mutateAsync } = useAddCommentMutation(post.id.stringValue);

  async function postComment(values) {
    const commentData = {
      ...userInfo,
      content: values.content,
    };

    await mutateAsync({
      postID: post.id.stringValue,
      comment: commentData,
      latestCommentCount: comments.length,
    });
  }

  return (
    <motion.article
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="post_detail"
    >
      <AnimatePresence>
        {add && (
          <AddPostWindow
            setAdd={setAdd}
            content={"Comment"}
            callback={postComment}
            buttonName={"Reply"}
          />
        )}
      </AnimatePresence>

      <div className="post_detail_header">
        <IoArrowBack
          className="post_detail_back_icon"
          onClick={() => navigate("/")}
        />
      </div>
      {/* <CurrentPost post={post} commentsLength={comments.length} /> */}

      <Post
        post={post}
        commentsLength={comments.length}
        setAdd={setAdd}
        isDetail={true}
      />

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
