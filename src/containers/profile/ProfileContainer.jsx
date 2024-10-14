import "./ProfileContainer.css";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import EditProfileWindow from "../../components/profile/EditProfileWindow/EditProfileWindow";
import { MdVerified } from "react-icons/md";
import ProfilePosts from "../../components/profile/ProfilePosts/ProfilePosts";
import { IoIosSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Skeleton from "../../components/ui/Skeleton/Skeleton";

const ProfileContainer = ({ user, trueUser }) => {
  const [previewAvatar, setPreviewAvatar] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const img = new Image();

    img.src = user.avatar;

    img.onload = () => {
      setShowImage(true);
    };
  }, [user.avatar]);

  return (
    <motion.section
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      className="profile_container"
    >
      <div className="profile_container_userInfo">
        <div className="profile_container_userInfo_title">
          <div className="profile_container_userInfo_name_area">
            <h1 className="profile_container_userInfo_name">
              {user.firstName + " " + user.lastName}{" "}
            </h1>
            {user.verified == "true" && (
              <MdVerified className="profile_container_userInfo_verified" />
            )}
          </div>

          <p className="profile_container_userInfo_username">
            {"@" + user.username}
          </p>
          {user?.bio && (
            <p className="profile_container_userInfo_bio">{user.bio}</p>
          )}
        </div>
        <figure
          className="profile_avatar_fig"
          onClick={() => setPreviewAvatar(!previewAvatar)}
        >
          {showImage ? (
            <img src={user.avatar} alt={user.username} loading="lazy" />
          ) : (
            <Skeleton width="6rem" height="6rem" borderRadius="50%" />
          )}
        </figure>
      </div>

      {trueUser && (
        <div className="profile_container_edit_area">
          <button
            className="profile_container_edit_area_button"
            onClick={() => setShowEditProfile(!showEditProfile)}
          >
            {t("profile.editProfile")}
          </button>

          <IoIosSettings
            className="profile_container_edit_area_setting_button"
            onClick={() => navigate("/settings")}
          />
        </div>
      )}

      <hr className="divider" />

      {user?.posts?.length ? (
        <ProfilePosts posts={user?.posts} user={user} trueUser={trueUser} />
      ) : (
        <h1 className="profile_container_no_posts">No posts yet.</h1>
      )}
      <AnimatePresence>
        {showEditProfile && (
          <EditProfileWindow
            setShowEditProfile={setShowEditProfile}
            user={user}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {previewAvatar && (
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="profile_container_avatar_preview"
          >
            <h1
              className="profile_container_avatar_preview_close"
              onClick={() => setPreviewAvatar(false)}
            >
              x
            </h1>

            <motion.figure
              initial={{ opacity: 0.5, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="profile_container_avatar_preview_fig"
            >
              <img src={user.avatar} alt={user.username} />
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default ProfileContainer;
