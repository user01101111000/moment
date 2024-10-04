import { useState, useCallback } from "react";
import "./Post.css";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import pp from "../../../assets/images/pp.png";
import timeConverter from "../../../utils/timeConverter";
import { PiTelegramLogo } from "react-icons/pi";
import { FaLink } from "react-icons/fa6";

import { throttle } from "lodash";
import { useNavigate, useLocation } from "react-router-dom";
import useAddPostLikeMutation from "../../../hooks/api/useAddPostLikeMutation";
import { motion } from "framer-motion";

const Post = ({ post }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const { mutateAsync } = useAddPostLikeMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const [liked, setLiked] = useState(false);

  const [likeCount, setLikeCount] = useState(+post.likeCount.stringValue);

  const throttled = useCallback(
    throttle(async (action) => {
      await mutateAsync({
        postID: post.id.stringValue,
        totalLikeCount: likeCount + +action,
      });
    }, 2000),
    []
  );

  return (
    <div className="post">
      <figure
        className="avatar"
        onClick={() => {
          navigate(`/@${post.userName.stringValue}`);
        }}
      >
        <img src={pp} alt="pp" />
      </figure>
      <div className="post_main">
        <div className="name_area">
          <h3
            className="username"
            onClick={() => {
              navigate(`/@${post.userName.stringValue}`);
            }}
          >
            {post.userName.stringValue}
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
                  throttled(false);
                }}
              />
            ) : (
              <AiOutlineLike
                className="post_button_icon"
                onClick={() => {
                  setLiked((prev) => !prev);
                  setLikeCount((prev) => prev + 1);
                  throttled(true);
                }}
              />
            )}

            <p className="likes_count">{likeCount}</p>
          </div>

          <div
            className="comments"
            onClick={() => navigate(`/post/${post.id.stringValue}`)}
          >
            <FaRegComment className="post_button_icon" />
            {/* <p className="comments_count">{post.commentCount.stringValue}</p> */}
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
                      `${window.location.href}post/${post.id.stringValue}`
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
