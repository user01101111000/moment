import AddPostBox from "./AddPostBox/AddPostBox";
import "./AddPostWindow.css";
import { motion } from "framer-motion";

const AddPostWindow = ({
  setAdd,
  callback,
  content,
  buttonName,
  currentText,
}) => {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="add_post_window"
      onClick={(e) => e.stopPropagation()}
    >
      <AddPostBox
        setAdd={setAdd}
        callback={callback}
        content={content}
        buttonName={buttonName}
        currentText={currentText}
      />
    </motion.article>
  );
};

export default AddPostWindow;
