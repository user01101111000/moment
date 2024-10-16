import "./AddPostBox.css";
import { useFormik } from "formik";
import { postSchema } from "../../../../utils/schema";
import { motion } from "framer-motion";
import LoadingImageComponent from "../../../ui/LoadingImageComponent/LoadingImageComponent";
import { useTranslation } from "react-i18next";

const AddPostBox = ({
  setAdd,
  callback = async () => {},
  content,
  buttonName,
  currentText = "",
}) => {
  const { t } = useTranslation();

  const {
    values,
    handleChange,
    handleSubmit,
    resetForm,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues: {
      content: currentText,
    },
    onSubmit,
    validationSchema: postSchema,
  });

  async function onSubmit(values) {
    await callback(values);

    resetForm();
    setAdd(false);
  }

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="add_post_box"
      onClick={(e) => e.stopPropagation()}
    >
      <form className="add_post_form" onSubmit={handleSubmit}>
        <div className="post_input_box">
          <label htmlFor="content">{content}</label>
          <textarea
            name="content"
            id="content"
            rows={10}
            value={values.content}
            onChange={handleChange}
            placeholder={content}
          ></textarea>
          {errors.content && (
            <p className={`error_message_add_post`}>{errors.content}</p>
          )}
        </div>

        <div className="post_share_buttons">
          <button
            type="submit"
            className={isSubmitting ? "submitting" : ""}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <LoadingImageComponent size={"1rem"} />
            ) : (
              buttonName
            )}
          </button>

          {!isSubmitting && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setAdd(false);
              }}
              type="button"
              className="cancel_button_add_post"
            >
              {t("postShareBox.cancel")}
            </button>
          )}
        </div>
      </form>
    </motion.article>
  );
};

export default AddPostBox;
