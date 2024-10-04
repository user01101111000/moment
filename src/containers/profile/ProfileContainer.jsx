import "./ProfileContainer.css";
import { motion } from "framer-motion";

const ProfileContainer = ({ user, trueUser }) => {
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

      {trueUser && <h1>Edit profile</h1>}
    </motion.section>
  );
};

export default ProfileContainer;
