import "./ProfilePost.css";
import useGetOnePostQuery from "../../../../hooks/api/useGetOnePostQuery";
import LoadingImageComponent from "../../../ui/LoadingImageComponent/LoadingImageComponent";
import { MdVerified } from "react-icons/md";
import { LuExternalLink } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import DeletePostWindow from "../../DeletePostWindow/DeletePostWindow";
import Skeleton from "../../../ui/Skeleton/Skeleton";

const ProfilePost = ({ postID, user, trueUser }) => {
  const navigate = useNavigate();
  const [showDeleteWindow, setShowDeleteWindow] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const { data, isLoading } = useGetOnePostQuery(postID);

  useEffect(() => {
    const img = new Image();

    img.src = user?.avatar;

    img.onload = () => {
      setShowImage(true);
    };
  }, [user?.avatar]);

  if (isLoading)
    return (
      <div className="profile_post profile_post_center">
        <LoadingImageComponent size={"1.2rem"} />
      </div>
    );

  return (
    <div
      className="profile_post"
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/post/${postID}`);
      }}
    >
      <div className="profile_post_name_area">
        <figure className="profile_post_avatar">
          {showImage ? (
            <img src={user.avatar} alt={user.username} loading="lazy" />
          ) : (
            <Skeleton width="2rem" height="2rem" borderRadius="50%" />
          )}
        </figure>

        <div className="profile_post_name">
          <h1>{user.username}</h1>

          {user?.verified == "true" && (
            <MdVerified className="profile_post_verified" />
          )}
        </div>
      </div>

      <div className="profile_post_content">
        <p>{data?.fields?.content?.stringValue}</p>
      </div>

      <div className="profile_post_buttons">
        <div
          className="profile_post_buttons_link profile_post_button"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/post/${postID}`);
          }}
        >
          <LuExternalLink className="profile_post_buttons_link_icon" />
        </div>

        {trueUser && (
          <div
            className="profile_post_buttons_delete profile_post_button"
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteWindow(true);
            }}
          >
            <MdDelete className="profile_post_buttons_link_icon profile_post_buttons_link_icon_trash" />
          </div>
        )}
      </div>

      <AnimatePresence>
        {showDeleteWindow && (
          <DeletePostWindow
            setShowDeleteWindow={setShowDeleteWindow}
            postID={postID}
            user={user}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePost;
