import "./Login.css";
import { useFormik } from "formik";
import LoadingImageComponent from "../../ui/LoadingImageComponent/LoadingImageComponent";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { loginSchema } from "../../../utils/schema";
import { motion } from "framer-motion";
import useLoginMutation from "../../../hooks/api/useLoginMutation";
import { toast, Bounce } from "react-toastify";
import { useTranslation } from "react-i18next";
import LanguageSelect from "../../settings/LanguageSelect/LanguageSelect";

const Login = ({ setShowLogin }) => {
  const { t } = useTranslation();

  const {
    values,
    handleChange,
    handleBlur,
    touched,
    handleSubmit,
    errors,
    resetForm,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema: loginSchema,
  });
  
  const { mutateAsync } = useLoginMutation(resetForm);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(values) {
    try {
      await mutateAsync(values);
    } catch (e) {
      toast.error(t("login.notFoundAccount"), {
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
      resetForm();
      console.log(e.message);
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="login_box"
    >
      <div className="auth_header">
        <h1 className="login_label">{t("login.loginLabel")}</h1>
        <div className="auth_header_lang_area">
          <LanguageSelect auth={true} />
        </div>
      </div>
      <form className="login_form" onSubmit={handleSubmit}>
        <div className="input_box">
          <label htmlFor="email">{t("login.emailLabel")}</label>
          <input
            type="email"
            name="email"
            placeholder={t("login.emailLabel")}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />

          {errors.email && touched.email && (
            <p className="login_error">{errors.email}</p>
          )}
        </div>

        <div className="input_box">
          <label htmlFor="password">{t("login.passwordLabel")}</label>
          <div className="custom_input_box">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder={t("login.passwordLabel")}
              onChange={handleChange}
              onBlur={handleBlur}
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

          {errors.password && touched.password && (
            <p className="login_error">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className={isSubmitting ? "submitting" : ""}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <LoadingImageComponent size={"1rem"} />
          ) : (
            t("login.loginButton")
          )}
        </button>

        <h1 className="register_link_text" onClick={() => setShowLogin(false)}>
          {t("login.loginFooterText")} <span>{t("login.registerNow")}</span>
        </h1>
      </form>
    </motion.article>
  );
};

export default Login;
