import "./Post.css";
import { useState, useCallback, useEffect } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import timeConverter from "../../../utils/timeConverter";
import { PiTelegramLogo } from "react-icons/pi";
import { FaLink } from "react-icons/fa6";
import { throttle } from "lodash";
import { useNavigate } from "react-router-dom";
import useAddPostLikeMutation from "../../../hooks/api/useAddPostLikeMutation";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Post = ({ post, isDetail = false, setAdd = () => {} }) => {
  const { userInfo } = useSelector((state) => state.userInfo);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const { mutateAsync: postLike } = useAddPostLikeMutation();
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(+post.likeCount.stringValue);

  const throttledLike = useCallback(
    throttle(async ({ action }) => {
      console.log(likeCount, "likeCount");
      await postLike({
        postID: post.id.stringValue,
        totalLikeCount: likeCount + +action,
        action: action,
      });
    }, 2000),
    []
  );

  return (
    <div className="post">
      <figure
        className="avatar"
        onClick={() => {
          navigate(`/@${post.publisher.mapValue.fields.username.stringValue}`);
        }}
      >
        <img
          src={post.publisher.mapValue.fields.avatar.stringValue}
          alt={post.publisher.mapValue.fields.username.stringValue}
        />
      </figure>
      <div className="post_main">
        <div className="name_area">
          <h3
            className="username"
            onClick={() => {
              navigate(
                `/@${post.publisher.mapValue.fields.username.stringValue}`
              );
            }}
          >
            {post.publisher.mapValue.fields.username.stringValue}
          </h3>
          <p className="name_divider">|</p>
          <p className="post_time">{timeConverter(+post.time.stringValue)}</p>
        </div>
        <p
          className="post_content"
          onClick={() => navigate(`/post/${post.id.stringValue}`)}
        >
          {post.content.stringValue}
        </p>

        <div className="post_buttons">
          <div className="likes">
            {liked ? (
              <AiFillLike
                className="post_button_icon"
                onClick={() => {
                  setLiked((prev) => !prev);
                  setLikeCount((prev) => prev - 1);
                  throttledLike({ action: false });
                }}
              />
            ) : (
              <AiOutlineLike
                className="post_button_icon"
                onClick={() => {
                  setLiked((prev) => !prev);
                  setLikeCount((prev) => prev + 1);
                  throttledLike({ action: true });
                }}
              />
            )}

            <p className="likes_count">{likeCount}</p>
          </div>

          <div className="comments">
            <FaRegComment
              className="post_button_icon"
              onClick={
                isDetail
                  ? () => setAdd(true)
                  : () => navigate(`/post/${post.id.stringValue}`)
              }
            />
            <p className="comments_count">{post.commentCount.stringValue}</p>
          </div>

          <div className="share_label">
            <PiTelegramLogo
              className="post_button_icon"
              onClick={() => setShowShareMenu((prev) => !prev)}
            />

            {showShareMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="share_menu"
              >
                <div
                  className="share_choice"
                  onClick={() => {
                    setShowShareMenu(false);
                    navigator.clipboard.writeText(
                      isDetail
                        ? `${window.location.href}`
                        : `${window.location.href}post/${post.id.stringValue}`
                    );
                  }}
                >
                  <h1>Copy link</h1>
                  <FaLink className="post_button_icon" />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
