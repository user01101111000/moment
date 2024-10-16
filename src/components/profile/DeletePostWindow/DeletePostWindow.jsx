import "./DeletePostWindow.css";
import { motion } from "framer-motion";
import LoadingImageComponent from "../../ui/LoadingImageComponent/LoadingImageComponent";
import useDeletePostMutation from "../../../hooks/api/useDeletePostMutation";
import { useTranslation } from "react-i18next";

const DeletePostWindow = ({ setShowDeleteWindow, postID, user }) => {
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useDeletePostMutation(postID);

  async function deleteThatPost(e) {
    e.stopPropagation();
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
      onClick={(e) => {
        e.stopPropagation();
        setShowDeleteWindow(false);
      }}
      className="delete_post_window"
    >
      <motion.article
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="delete_post_box"
      >
        <h1>{t("profile.delete1C")}</h1>
        <p>{t("profile.delete2C")}</p>

        <div className="delete_post_box_buttons">
          <button
            onClick={deleteThatPost}
            disabled={isPending}
            className={isPending ? "submitting" : ""}
          >
            {isPending ? (
              <LoadingImageComponent size={"1rem"} />
            ) : (
              t("profile.confirm")
            )}
          </button>
          {!isPending && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteWindow(false);
              }}
            >
              {t("profile.cancel")}
            </button>
          )}
        </div>
      </motion.article>
    </motion.article>
  );
};

export default DeletePostWindow;
