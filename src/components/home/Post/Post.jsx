import { useState, useCallback } from "react";
import "./Post.css";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import timeConverter from "../../../utils/timeConverter";
import { PiTelegramLogo } from "react-icons/pi";
import { throttle } from "lodash";
import { useNavigate } from "react-router-dom";
import useAddPostLikeMutation from "../../../hooks/api/useAddPostLikeMutation";

const Post = ({ post }) => {
  const { mutateAsync } = useAddPostLikeMutation();
  const navigate = useNavigate();
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
      <div className="avatar"></div>
      <div className="post_main">
        <div className="name_area">
          <h3 className="username">{post.username.stringValue}</h3>
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

          <PiTelegramLogo className="post_button_icon" />
        </div>
      </div>
    </div>
  );
};

export default Post;
