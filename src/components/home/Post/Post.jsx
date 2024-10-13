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
import { useTranslation } from "react-i18next";
import translateTime from "../../../utils/translateTime";
import useGetAnyUserInfoQuery from "../../../hooks/api/useGetAnyUserInfoQuery";
import Skeleton from "../../ui/Skeleton/Skeleton";
import { useSelector } from "react-redux";
import { MdVerified } from "react-icons/md";

const Post = ({ post, isDetail = false, setAdd = () => {} }) => {
  const { t } = useTranslation();
  const { userInfo } = useSelector((state) => state.userInfo);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const { mutateAsync: postLike } = useAddPostLikeMutation(post.id.stringValue);
  const navigate = useNavigate();

  const likeSituation = post?.likers?.arrayValue?.values?.some(
    (x) => x.stringValue == userInfo.id
  );

  const [liked, setLiked] = useState(Boolean(likeSituation));
  const [likeCount, setLikeCount] = useState(+post.likeCount.stringValue);

  const throttledLike = useCallback(
    throttle(async ({ action, likers, likeCount }) => {
      await postLike({
        postID: post.id.stringValue,
        totalLikeCount: action ? +likeCount + 1 : +likeCount - 1,
        likers: likers,
        liker: userInfo.id,
        action: action,
      });
    }, 2000),
    []
  );

  const { data: user, isLoading } = useGetAnyUserInfoQuery(
    post.publisher.stringValue
  );

  if (isLoading)
    return (
      <div className="post">
        <figure>
          <Skeleton width="100%" height="3rem" borderRadius="50%" />
        </figure>

        <div className="post_main">
          <div className="name_area">
            <Skeleton width="100%" height="1rem" borderRadius="4px" />

            <p>|</p>

            <Skeleton width="100%" height="1rem" borderRadius="4px" />
          </div>

          <Skeleton width="100%" height="3rem" borderRadius="4px" />
        </div>
      </div>
    );

  return (
    <div className="post">
      <figure
        className="avatar"
        onClick={() => {
          navigate(`/@${user.username.stringValue}`);
        }}
      >
        <img src={user.avatar.stringValue} alt={user.username.stringValue} />
      </figure>
      <div className="post_main">
        <div className="name_area">
          <h3
            className="username"
            onClick={() => {
              navigate(`/@${user.username.stringValue}`);
            }}
          >
            {user.username.stringValue}
          </h3>

          {user.verified.stringValue == "true" && (
            <MdVerified className="verified_post" />
          )}
          <p className="name_divider">|</p>
          <p className="post_time">
            {translateTime(timeConverter(+post.time.stringValue), t).join(" ")}
          </p>
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
                  throttledLike({
                    action: false,
                    likers: post?.likers?.arrayValue?.values || [],
                    likeCount: post.likeCount.stringValue,
                  });
                }}
              />
            ) : (
              <AiOutlineLike
                className="post_button_icon"
                onClick={() => {
                  setLiked((prev) => !prev);
                  setLikeCount((prev) => prev + 1);
                  throttledLike({
                    action: true,
                    likers: post?.likers?.arrayValue?.values || [],
                    likeCount: post.likeCount.stringValue,
                  });
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
                  <h1>{t("post.copyLink")}</h1>
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
