import "./Post.css";
import { useState, useCallback, useEffect, useRef } from "react";
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
import { useInView } from "react-intersection-observer";
import OnePostLoading from "../../ui/OnePostLoading/OnePostLoading";

const Post = ({ post, isDetail = false, setAdd = () => {} }) => {
  const menuRef = useRef(null);
  const { t } = useTranslation();
  const [showImage, setShowImage] = useState(false);
  const { ref, inView } = useInView();
  const { userInfo } = useSelector((state) => state.userInfo);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const { mutateAsync: postLike } = useAddPostLikeMutation(post.id.stringValue);
  const navigate = useNavigate();

  const likeSituation = post?.likers?.arrayValue?.values?.some(
    (x) => x.stringValue == userInfo.id
  );

  const [liked, setLiked] = useState(Boolean(likeSituation));
  const [likeCount, setLikeCount] = useState(+post.likeCount.stringValue);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!inView) {
      setShowShareMenu(false);
    }
  }, [inView]);

  const throttledLike = useCallback(
    throttle(async ({ action, likers, likeCount }) => {
      await postLike({
        postID: post.id.stringValue,
        totalLikeCount: likeCount,
        likers: likers,
        liker: userInfo.id,
        action: action,
      });
    }, 5000),
    []
  );

  const { data: user, isLoading } = useGetAnyUserInfoQuery(
    post.publisher.stringValue
  );

  useEffect(() => {
    const img = new Image();
    img.src = user?.avatar?.stringValue;

    img.onload = () => {
      setShowImage(true);
    };
  }, [user?.avatar?.stringValue]);

  if (isLoading) return <OnePostLoading hr />;

  return (
    <div
      className="post"
      onClick={
        !isDetail &&
        ((e) => {
          e.stopPropagation();
          navigate(`/post/${post.id.stringValue}`);
        })
      }
    >
      <figure
        className="avatar"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/@${user.username.stringValue}`);
        }}
      >
        {showImage ? (
          <img
            src={user.avatar.stringValue}
            alt={user.username.stringValue}
            loading="lazy"
          />
        ) : (
          <Skeleton width="3rem" height="3rem" borderRadius="50%" />
        )}
      </figure>
      <div className="post_main">
        <div className="name_area">
          <h3
            className="username"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/@${user.username.stringValue}`);
            }}
          >
            {user.username.stringValue}
          </h3>

          {user.verified.stringValue == "true" && (
            <MdVerified className="verified_post" />
          )}
          <p className="name_divider">|</p>
          <p className="post_time" onClick={(e) => e.stopPropagation()}>
            {translateTime(timeConverter(+post.time.stringValue), t).join(" ")}
          </p>
        </div>
        <p className="post_content">{post.content.stringValue}</p>

        <div className="post_buttons">
          <div className="likes">
            {liked ? (
              <AiFillLike
                className="post_button_icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setLiked((prev) => !prev);
                  setLikeCount((prev) => prev - 1);
                  throttledLike({
                    action: false,
                    likers: post?.likers?.arrayValue?.values || [],
                    likeCount: +post.likeCount.stringValue - 1,
                  });
                }}
              />
            ) : (
              <AiOutlineLike
                className="post_button_icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setLiked((prev) => !prev);
                  setLikeCount((prev) => prev + 1);
                  throttledLike({
                    action: true,
                    likers: post?.likers?.arrayValue?.values || [],
                    likeCount: +post.likeCount.stringValue + 1,
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

          <div className="share_label" ref={ref}>
            <PiTelegramLogo
              className="post_button_icon"
              onClick={(e) => {
                e.stopPropagation();
                setShowShareMenu((prev) => !prev);
              }}
            />

            {showShareMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="share_menu"
                ref={menuRef}
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
