import "../../home/Post/Post.css";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { PiTelegramLogo } from "react-icons/pi";
import timeConverter from "@/utils/timeConverter";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetAnyUserInfoQuery from "../../../hooks/api/useGetAnyUserInfoQuery";
import Skeleton from "../../ui/Skeleton/Skeleton";
import { useTranslation } from "react-i18next";
import translateTime from "@/utils/translateTime";
import { MdVerified } from "react-icons/md";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { FaLink } from "react-icons/fa";
import { throttle } from "lodash";
import useAddCommentLikeMutation from "../../../hooks/api/useAddCommentLikeMutation";
import OnePostLoading from "../../ui/OnePostLoading/OnePostLoading";

const Comment = ({ comment }) => {
  const menuRef = useRef(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const likeSituation = comment?.likers?.arrayValue?.values?.some(
    (x) => x.stringValue == comment.publisher.stringValue
  );

  const [likeCount, setLikeCount] = useState(comment.likeCount.stringValue);
  const [liked, setLiked] = useState(Boolean(likeSituation));
  const { ref, inView } = useInView();
  const [showShareMenu, setShowShareMenu] = useState(false);
  const likers = comment?.likers?.arrayValue?.values ?? [];

  const { mutateAsync: commentLike } = useAddCommentLikeMutation(
    comment.postID.stringValue
  );

  const throttledLike = useCallback(
    throttle(async ({ action, commentLikeCount }) => {
      await commentLike({
        postID: comment.postID.stringValue,
        commentID: comment.id.stringValue,
        commentLikeCount: commentLikeCount,
        likers: likers,
        action: action,
        liker: comment.publisher.stringValue,
      });
    }, 5000),
    []
  );

  useEffect(() => {
    if (!inView) {
      setShowShareMenu(false);
    }
  }, [inView]);

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

  const { data: user, isLoading } = useGetAnyUserInfoQuery(
    comment.publisher.stringValue
  );
  if (isLoading) return <OnePostLoading hr />;

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

          {user.verified.stringValue == "true" && <MdVerified />}

          <p className="name_divider">|</p>
          <p className="post_time">
            {translateTime(timeConverter(+comment.time.stringValue), t).join(
              " "
            )}
          </p>
        </div>
        <p className="post_content">{comment.content.stringValue}</p>

        <div className="post_buttons">
          <div className="likes">
            {liked ? (
              <AiFillLike
                className="post_button_icon"
                onClick={() => {
                  setLiked(!liked);
                  setLikeCount(+likeCount - 1);
                  throttledLike({
                    action: false,
                    commentLikeCount: +likeCount - 1,
                  });
                }}
              />
            ) : (
              <AiOutlineLike
                className="post_button_icon"
                onClick={() => {
                  setLiked(!liked);
                  setLikeCount(+likeCount + 1);
                  throttledLike({
                    action: true,
                    commentLikeCount: +likeCount + 1,
                  });
                }}
              />
            )}
            <p className="likes_count">{likeCount}</p>
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
                    navigator.clipboard.writeText(window.location.href);
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

export default Comment;
