import "./ProfileContainer.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
const ProfileContainer = ({ user, trueUser }) => {
  const { t } = useTranslation();
  return (
    <motion.section
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      className="profile_container"
    >
      <div className="profile_container_header">
        <div className="profile_container_header_title">
          <h1>{user.firstName + " " + user.lastName}</h1>
          <p>{"@" + user.username}</p>
        </div>
        <figure className="profile_avatar_fig">
          <img src={user.avatar} alt={user.username} />
        </figure>
      </div>

      {trueUser && <h1>{t("profile.editProfile")}</h1>}
    </motion.section>
  );
};

export default ProfileContainer;
