import { useFormik } from "formik";
import "./Register.css";
import { registerSchema } from "../../../utils/schema";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loading from "../../ui/Loading";
import { toast, Bounce } from "react-toastify";
import useRegisterMutation from "../../../hooks/api/useRegisterMutation";
import { useTranslation } from "react-i18next";
import useGetUsersQuery from "../../../hooks/api/useGetUsersQuery";

const Register = ({ setShowLogin }) => {
  const { data } = useGetUsersQuery(true);
  const usernames = data?.map((x) => x?.fields?.username?.stringValue) ?? [];
  const { t } = useTranslation();
  const { mutateAsync } = useRegisterMutation();

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    resetForm,
    isSubmitting,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      gender: "male",
    },
    onSubmit,
    validationSchema: registerSchema(usernames),
  });

  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(values) {
    await mutateAsync(values);
    resetForm();
    toast.success(t("register.createdAccount"), {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    setShowLogin(true);
  }

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="register_box"
    >
      <h1 className="login_label">{t("register.registerLabel")}</h1>

      <form className="login_form" onSubmit={handleSubmit}>
        <div className="input_box_names">
          <div className="input_box">
            <label htmlFor="firstName">{t("register.firstNameLabel")}</label>

            <input
              type="text"
              name="firstName"
              placeholder={t("register.firstNameLabel")}
              onChange={handleChange}
              value={values.firstName}
            />

            {errors.firstName && (
              <p className="login_error">{errors.firstName}</p>
            )}
          </div>

          <div className="input_box">
            <label htmlFor="lastName">{t("register.lastNameLabel")}</label>
            <input
              type="text"
              name="lastName"
              placeholder={t("register.lastNameLabel")}
              onChange={handleChange}
              value={values.lastName}
            />

            {errors.lastName && (
              <p className="login_error">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="input_box">
          <label htmlFor="username">{t("register.usernameLabel")}</label>
          <input
            type="text"
            name="username"
            placeholder={t("register.usernameLabel")}
            onChange={handleChange}
            value={values.username}
          />

          {errors.username && <p className="login_error">{errors.username}</p>}
        </div>

        <div className="input_box">
          <label htmlFor="email">{t("register.emailLabel")}</label>
          <input
            type="email"
            name="email"
            placeholder={t("register.emailLabel")}
            onChange={handleChange}
            value={values.email}
          />

          {errors.email && <p className="login_error">{errors.email}</p>}
        </div>

        <div className="input_box">
          <label htmlFor="password">{t("register.passwordLabel")}</label>
          <div className="custom_input_box">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder={t("register.passwordLabel")}
              onChange={handleChange}
              value={values.password}
            />

            {showPassword ? (
              <FaEye
                className="password_icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FaEyeSlash
                className="password_icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>

          {errors.password && <p className="login_error">{errors.password}</p>}
        </div>

        <hr className="divider_register" />

        <div className="input_box_gender">
          <label className="radio_label">
            <input
              type="radio"
              value="male"
              name="gender"
              checked={values.gender == "male"}
              onChange={handleChange}
            />
            {t("register.genderMale")}
          </label>

          <label className="radio_label">
            <input
              type="radio"
              value="female"
              name="gender"
              checked={values.gender == "female"}
              onChange={handleChange}
            />
            {t("register.genderFemale")}
          </label>
        </div>

        <hr className="divider_register" />
        <button
          type="submit"
          className={isSubmitting ? "submitting" : ""}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loading size={"1rem"} />
          ) : (
            t("register.registerButton")
          )}
        </button>

        <h1 className="register_link_text" onClick={() => setShowLogin(true)}>
          {t("register.registerFooterText")}{" "}
          <span>{t("register.loginNow")}</span>
        </h1>
      </form>
    </motion.article>
  );
};

export default Register;
