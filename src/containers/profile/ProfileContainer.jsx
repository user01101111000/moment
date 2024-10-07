import "./ProfileContainer.css";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import EditProfileWindow from "../../components/profile/EditProfileWindow/EditProfileWindow";

const ProfileContainer = ({ user, trueUser }) => {
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
        <figure className="profile_avatar_fig">
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
    </motion.section>
  );
};

export default ProfileContainer;
