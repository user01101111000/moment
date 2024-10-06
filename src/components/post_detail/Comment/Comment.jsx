import "./Comment.css";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import timeConverter from "@/utils/timeConverter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Comment = ({ comment }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  return (
    <div className="post">
      <figure
        className="avatar"
        onClick={() => {
          navigate(
            `/@${comment.publisher.mapValue.fields.username.stringValue}`
          );
        }}
      >
        <img
          src={comment.publisher.mapValue.fields.avatar.stringValue}
          alt={comment.publisher.mapValue.fields.username.stringValue}
        />
      </figure>
      <div className="post_main">
        <div className="name_area">
          <h3
            className="username"
            onClick={() => {
              navigate(
                `/@${comment.publisher.mapValue.fields.username.stringValue}`
              );
            }}
          >
            {comment.publisher.mapValue.fields.username.stringValue}
          </h3>
          <p className="name_divider">|</p>
          <p className="post_time">
            {timeConverter(+comment.time.stringValue)}
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
