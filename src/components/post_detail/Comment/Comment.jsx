import "./Comment.css";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import timeConverter from "@/utils/timeConverter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetAnyUserInfoQuery from "../../../hooks/api/useGetAnyUserInfoQuery";
import Skeleton from "../../ui/Skeleton/Skeleton";
import { useTranslation } from "react-i18next";
import translateTime from "@/utils/translateTime";
import { MdVerified } from "react-icons/md";

const Comment = ({ comment }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const { data: user, isLoading } = useGetAnyUserInfoQuery(
    comment.publisher.stringValue
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

          <Skeleton width="100%" height="1rem" borderRadius="4px" />
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
                }}
              />
            ) : (
              <AiOutlineLike
                className="post_button_icon"
                onClick={() => {
                  setDisliked(false);
                  setLiked(!liked);
                }}
              />
            )}

            <p className="likes_count">
              {liked
                ? +comment.likeCount.stringValue + 1
                : comment.likeCount.stringValue}
            </p>
          </div>

          <div className="likes">
            {disliked ? (
              <AiFillDislike
                className="post_button_icon"
                onClick={() => setDisliked(!disliked)}
              />
            ) : (
              <AiOutlineDislike
                className="post_button_icon"
                onClick={() => {
                  setLiked(false);
                  setDisliked(!disliked);
                }}
              />
            )}

            <p className="likes_count">
              {" "}
              {disliked
                ? +comment.dislikeCount.stringValue + 1
                : comment.dislikeCount.stringValue}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
