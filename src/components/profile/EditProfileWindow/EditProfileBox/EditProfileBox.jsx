import "./EditProfileBox.css";
import { motion } from "framer-motion";
import { isObject, useFormik } from "formik";
import LoadingImageComponent from "../../../ui/LoadingImageComponent/LoadingImageComponent";
import { editProfileSchema } from "../../../../utils/schema";
import useUpdateUserInfoMutation from "../../../../hooks/api/useUpdateUserInfoMutation";
import { useTranslation } from "react-i18next";

const EditProfileBox = ({ setShowEditProfile, user }) => {
  const { t } = useTranslation();
  const { mutateAsync } = useUpdateUserInfoMutation();

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

  async function onSubmit(values) {
    await mutateAsync({ id: user.id, userInfo: values });
    setShowEditProfile(false);
    resetForm();
  }

  return (
    <motion.div
      initial={{ opacity: 0.5, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="edit_profile_box"
    >
      {!isSubmitting && (
        <div className="edit_profile_box_header">
          <h1
            className="edit_profile_box_close"
            onClick={() => setShowEditProfile(false)}
          >
            x
          </h1>
        </div>
      )}

      <form onSubmit={handleSubmit} className="edit_profile_box_form">
        <div className="edit_profile_box_form_avatar">
          <figure className="edit_profile_box_form_avatar_img">
            {isObject(values.avatar) ? (
              <img src={URL.createObjectURL(values.avatar)} alt="avatar" />
            ) : (
              <img src={values.avatar} alt="avatar" />
            )}
          </figure>

          {!isSubmitting && (
            <label className="custom_file_input" htmlFor="avatar">
              {t("profile.changeAvatar")}
            </label>
          )}

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
          <label htmlFor="firstName">{t("profile.firstNameLabel")}</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={handleChange}
            value={values.firstName}
          />
          {errors.firstName && (
            <p className="edit_profile_box_error">{errors.firstName}</p>
          )}
        </div>

        <div className="edit_profile_box_form_field">
          <label htmlFor="lastName">{t("profile.lastNameLabel")}</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={handleChange}
            value={values.lastName}
          />
          {errors.lastName && (
            <p className="edit_profile_box_error">{errors.lastName}</p>
          )}
        </div>

        <div className="edit_profile_box_form_field">
          <label htmlFor="bio">{t("profile.bioLabel")}</label>
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
          className={`edit_profile_box_form_button${
            isSubmitting ? " submitting" : ""
          }`}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <LoadingImageComponent size={"1rem"} />
          ) : (
            t("profile.save")
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default EditProfileBox;
