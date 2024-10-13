import "./DeletePostWindow.css";
import { motion } from "framer-motion";
import Loading from "../../ui/Loading";
import useDeletePostMutation from "../../../hooks/api/useDeletePostMutation";

const DeletePostWindow = ({ setShowDeleteWindow, postID, user }) => {
  const { mutateAsync, isPending } = useDeletePostMutation(postID);

  async function deleteThatPost() {
    await mutateAsync({
      id: postID,
      postIDs: user.posts,
      userID: user.id,
    });
  }

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="delete_post_window"
    >
      <motion.article
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="delete_post_box"
      >
        <h1>Are you sure you want to delete this post?</h1>
        <p>This action cannot be undone.</p>

        <div className="delete_post_box_buttons">
          <button
            onClick={deleteThatPost}
            disabled={isPending}
            className={isPending ? "submitting" : ""}
          >
            {isPending ? <Loading size={"1rem"} /> : "Confirm"}
          </button>
          {!isPending && (
            <button onClick={() => setShowDeleteWindow(false)}>Cancel</button>
          )}
        </div>
      </motion.article>
    </motion.article>
  );
};

export default DeletePostWindow;
