import "./ProfileContainer.css";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import EditProfileWindow from "../../components/profile/EditProfileWindow/EditProfileWindow";

const ProfileContainer = ({ user, trueUser }) => {
  const [previewAvatar, setPreviewAvatar] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const { t } = useTranslation();
  return (
    <motion.section
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      className="profile_container"
    >
      <div className="profile_container_userInfo">
        <div className="profile_container_userInfo_title">
          <h1 className="profile_container_userInfo_name">
            {user.firstName + " " + user.lastName}
          </h1>
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
          <img src={user.avatar} alt={user.username} />
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
        </div>
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
