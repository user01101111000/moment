import AddPostBox from "./AddPostBox/AddPostBox";
import "./AddPostWindow.css";
import { motion } from "framer-motion";

const AddPostWindow = ({ setAdd, callback, content, buttonName }) => {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="add_post_window"
    >
      <AddPostBox
        setAdd={setAdd}
        callback={callback}
        content={content}
        buttonName={buttonName}
      />
    </motion.article>
  );
};

export default AddPostWindow;
