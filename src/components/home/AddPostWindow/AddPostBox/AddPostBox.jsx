import "./AddPostBox.css";
import { useFormik } from "formik";
import { IoCloseSharp } from "react-icons/io5";
import { postSchema } from "../../../../utils/schema";
import { motion } from "framer-motion";
import Loading from "../../../ui/Loading";

const AddPostBox = ({
  setAdd,
  callback = async () => {},
  username,
  content,
  buttonName,
}) => {
  const {
    values,
    handleChange,
    handleSubmit,
    resetForm,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues: {
      username: "",
      content: "",
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
    >
      <div className="close_icon_area">
        <h1 className="flow_title">mome</h1>
        <IoCloseSharp onClick={() => setAdd(false)} className="close_icon" />
      </div>

      <form className="add_post_form" onSubmit={handleSubmit}>
        <div className="post_input_box">
          <label htmlFor="username">{username}</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={values.username}
            placeholder={username}
          />
          {errors.username && (
            <p className="error_message_add_post">{errors.username}</p>
          )}
        </div>
        <div className="post_input_box">
          <label htmlFor="content">{content}</label>
          <textarea
            name="content"
            id="content"
            rows={7}
            value={values.content}
            onChange={handleChange}
            placeholder={content}
          ></textarea>
          {errors.content && (
            <p className={`error_message_add_post`}>{errors.content}</p>
          )}
        </div>

        <button
          type="submit"
          className={isSubmitting ? "submitting" : ""}
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loading size={"1rem"} /> : buttonName}
        </button>
      </form>
    </motion.article>
  );
};

export default AddPostBox;
