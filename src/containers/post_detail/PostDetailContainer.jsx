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
import { useTranslation } from "react-i18next";
import CommentPublishers from "../../components/post_detail/CommentPublishers/CommentPublishers";

const PostDetailContainer = ({ post, comments, commentPublishers }) => {
  const [showCommentPublishers, setShowCommentPublishers] = useState(false);
  const [showLikers, setShowLikers] = useState(false);
  const { t } = useTranslation();
  const { userInfo } = useSelector((state) => state.userInfo);
  const navigate = useNavigate();
  const [add, setAdd] = useState(false);
  const likers = post?.likers?.arrayValue?.values?.map((x) => x?.stringValue) ?? [];
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
            content={t("commentShareBox.comment")}
            callback={postComment}
            buttonName={t("commentShareBox.reply")}
          />
        )}
      </AnimatePresence>

      <div className="post_detail_header">
        <IoArrowBack
          className="post_detail_back_icon"
          onClick={() => navigate("/")}
        />
      </div>

      <Post
        post={post}
        commentsLength={comments.length}
        setAdd={setAdd}
        isDetail={true}
      />

      <div className="reply_label_area">
        <h1
          className="reply_label"
          onClick={() => setShowLikers((prev) => !prev)}
        >
          {t("post.likes")} ·{" "}
          <span className="reply_count">{post.likeCount.stringValue}</span>
        </h1>
        <h1
          className="reply_label"
          onClick={() => setShowCommentPublishers((prev) => !prev)}
        >
          {t("post.replies")} ·{" "}
          <span className="reply_count">
            {comments.length ? comments.length : t("post.noReplies")}
          </span>
        </h1>
      </div>
      <Comments comments={comments} />

      <AnimatePresence>
        {showCommentPublishers && comments.length && (
          <CommentPublishers
            label={"post.replies"}
            commentPublishers={commentPublishers}
            setShowCommentPublishers={setShowCommentPublishers}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLikers && likers.length && (
          <CommentPublishers
            label={"post.likes"}
            commentPublishers={likers}
            setShowCommentPublishers={setShowLikers}
          />
        )}
      </AnimatePresence>
    </motion.article>
  );
};

export default PostDetailContainer;
