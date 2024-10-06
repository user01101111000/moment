import "./CommentPublishers.css";
import CommentPublisher from "./CommentPublisher/CommentPublisher";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const CommentPublishers = ({ commentPublishers, setShowCommentPublishers }) => {
  const { t } = useTranslation();

  const publisherList = commentPublishers.map((x) => (
    <CommentPublisher key={x.id.stringValue} publisher={x} />
  ));

  return (
    <motion.section
      className="comment_publishers_container"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.section
        className="comment_publishers_box"
        initial={{ opacity: 0.5, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="comment_publishers_header">
          <h1 className="comment_publishers_title">{t("post.replies")}</h1>
          <h1 onClick={() => setShowCommentPublishers(false)}>x</h1>
        </div>
        {publisherList}
      </motion.section>
    </motion.section>
  );
};

export default CommentPublishers;
