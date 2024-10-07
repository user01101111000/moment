import EditProfileBox from "./EditProfileBox/EditProfileBox";
import "./EditProfileWindow.css";
import { motion } from "framer-motion";

const EditProfileWindow = ({ setShowEditProfile, user }) => {
  return (
    <motion.section
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="edit_profile_window"
    >
      <EditProfileBox setShowEditProfile={setShowEditProfile} user={user} />
    </motion.section>
  );
};

export default EditProfileWindow;
