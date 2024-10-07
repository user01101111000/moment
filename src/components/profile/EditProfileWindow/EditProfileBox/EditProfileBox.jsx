import "./EditProfileBox.css";
import { motion } from "framer-motion";
import { isObject, useFormik } from "formik";
import Loading from "../../../ui/Loading";
import { editProfileSchema } from "../../../../utils/schema";

const EditProfileBox = ({ setShowEditProfile, user }) => {
  const {
    values,
    handleChange,
    handleSubmit,
    resetForm,
    errors,
    isSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      bio: user?.bio ?? "",
      avatar:
        user?.avatar ??
        "https://firebasestorage.googleapis.com/v0/b/moment-c8183.appspot.com/o/common%2Fpp.png?alt=media&token=4d85b22c-df4a-48d5-952f-32c6bd1406d7",
    },
    onSubmit,
    validationSchema: editProfileSchema,
  });

  function onSubmit(values) {
    setTimeout(() => {
      console.log(values);
      setShowEditProfile(false);
      resetForm();
    }, 2000);
  }

  return (
    <motion.div
      initial={{ opacity: 0.5, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="edit_profile_box"
    >
      <div className="edit_profile_box_header">
        <h1
          className="edit_profile_box_close"
          onClick={() => setShowEditProfile(false)}
        >
          x
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="edit_profile_box_form">
        <div className="edit_profile_box_form_avatar">
          <figure className="edit_profile_box_form_avatar_img">
            {isObject(values.avatar) ? (
              <img src={URL.createObjectURL(values.avatar)} alt="avatar" />
            ) : (
              <img src={values.avatar} alt="avatar" />
            )}
          </figure>

          <label className="custom_file_input" htmlFor="avatar">
            Change avatar
          </label>

          <input
            style={{ display: "none" }}
            type="file"
            name="avatar"
            id="avatar"
            onChange={(e) => {
              setFieldValue("avatar", e.target.files[0]);
            }}
          />
        </div>

        <div className="edit_profile_box_form_field">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={handleChange}
            value={values.firstName}
          />
          {errors.firstName && <p>{errors.firstName}</p>}
        </div>

        <div className="edit_profile_box_form_field">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={handleChange}
            value={values.lastName}
          />
          {errors.lastName && <p>{errors.lastName}</p>}
        </div>

        <div className="edit_profile_box_form_field">
          <label htmlFor="bio">Bio</label>
          <textarea
            name="bio"
            id="bio"
            onChange={handleChange}
            value={values.bio}
            rows={7}
          ></textarea>
          {errors.bio && <p>{errors.bio}</p>}
        </div>

        <button
          className="edit_profile_box_form_button"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loading size={"1rem"} /> : "Save"}
        </button>
      </form>
    </motion.div>
  );
};

export default EditProfileBox;
