import "./ProfilePost.css";
import useGetOnePostQuery from "../../../../hooks/api/useGetOnePostQuery";
import LoadingImageComponent from "../../../ui/LoadingImageComponent/LoadingImageComponent";
import { MdVerified } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import DeletePostWindow from "../../DeletePostWindow/DeletePostWindow";
import Skeleton from "../../../ui/Skeleton/Skeleton";
import AddPostWindow from "../../../../components/home/AddPostWindow/AddPostWindow";
import { useTranslation } from "react-i18next";
import useEditPostMutation from "../../../../hooks/api/useEditPostMutation";

const ProfilePost = ({ postID, user, trueUser }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showEditWindow, setShowEditWindow] = useState(false);
  const [showDeleteWindow, setShowDeleteWindow] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const { data, isLoading } = useGetOnePostQuery(postID);

  const { mutateAsync: editPostMutate } = useEditPostMutation(postID);

  const editPost = async (values) => {
    const data = {
      content: values.content,
      postID,
      edited: "Edited",
    };

    await editPostMutate(data);
  };

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

      {trueUser && (
        <div className="profile_post_buttons">
          <div
            className="profile_post_buttons_link profile_post_button"
            onClick={(e) => {
              e.stopPropagation();
              setShowEditWindow(true);
            }}
          >
            <MdEdit className="profile_post_buttons_link_icon" />
          </div>

          <div
            className="profile_post_buttons_delete profile_post_button"
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteWindow(true);
            }}
          >
            <MdDelete className="profile_post_buttons_link_icon profile_post_buttons_link_icon_trash" />
          </div>
        </div>
      )}

      <AnimatePresence>
        {showDeleteWindow && (
          <DeletePostWindow
            setShowDeleteWindow={setShowDeleteWindow}
            postID={postID}
            user={user}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEditWindow && (
          <AddPostWindow
            setAdd={setShowEditWindow}
            callback={editPost}
            content={t("postShareBox.edit")}
            buttonName={t("postShareBox.editButton")}
            currentText={data?.fields?.content?.stringValue}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePost;
