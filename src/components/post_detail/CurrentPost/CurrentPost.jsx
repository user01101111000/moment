import timeConverter from "@/utils/timeConverter";
import "./CurrentPost.css";
import "../../home/Post/Post.css";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";
import { useState, useCallback } from "react";
import { throttle } from "lodash";
import { AnimatePresence } from "framer-motion";
import AddPostWindow from "../../home/AddPostWindow/AddPostWindow";
import useAddCommentMutation from "../../../hooks/api/useAddCommentMutation";
import useAddPostLikeMutation from "../../../hooks/api/useAddPostLikeMutation";
import { useSelector } from "react-redux";

const CurrentPost = ({ post, commentsLength }) => {
  const [add, setAdd] = useState(false);
  const { userInfo } = useSelector((state) => state.userInfo);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(+post.likeCount.stringValue);

  const { mutateAsync: addLike } = useAddPostLikeMutation();
  const { mutateAsync } = useAddCommentMutation(post.id.stringValue);

  const throttled = useCallback(
    throttle(async (action) => {
      await addLike({
        postID: post.id.stringValue,
        totalLikeCount: likeCount + +action,
      });
    }, 2000),
    []
  );

  async function postComment(values) {
    const commentData = {
      ...userInfo,
      content: values.content,
    };

    await mutateAsync({
      postID: post.id.stringValue,
      comment: commentData,
      latestCommentCount: commentsLength,
    });
  }

  return (
    <div className="post">
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
      <figure className="avatar">
        <img
          src={post.publisher.mapValue.fields.avatar.stringValue}
          alt={post.publisher.mapValue.fields.username.stringValue}
        />
      </figure>
      <div className="post_main">
        <div className="name_area">
          <h3 className="username">
            {post.publisher.mapValue.fields.username.stringValue}
          </h3>
          <p className="name_divider">|</p>
          <p className="post_time">{timeConverter(+post.time.stringValue)}</p>
        </div>
        <p className="post_content">{post.content.stringValue}</p>

        <div className="post_buttons">
          <div className="likes">
            {liked ? (
              <AiFillLike
                className="post_button_icon"
                onClick={() => {
                  setLiked(!liked);
                  setLikeCount((prev) => prev - 1);
                  throttled(false);
                }}
              />
            ) : (
              <AiOutlineLike
                className="post_button_icon"
                onClick={() => {
                  setLiked(!liked);
                  setLikeCount((prev) => prev + 1);
                  throttled(true);
                }}
              />
            )}

            <p className="likes_count">
              {" "}
              {liked
                ? +post.likeCount.stringValue + 1
                : post.likeCount.stringValue}
            </p>
          </div>

          <div className="comments">
            <FaRegComment
              className="post_button_icon"
              onClick={() => setAdd(true)}
            />
            <p className="comments_count">{commentsLength}</p>
          </div>

          <PiTelegramLogo className="post_button_icon" />
        </div>
      </div>
    </div>
  );
};

export default CurrentPost;
