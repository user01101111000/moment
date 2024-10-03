import "./Login.css";
import { useFormik } from "formik";
import Loading from "../../ui/Loading";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { loginSchema } from "../../../utils/schema";
import { motion } from "framer-motion";
import useLoginMutation from "../../../hooks/api/useLoginMutation";
import { toast, Bounce } from "react-toastify";

const Login = ({ setShowLogin }) => {
  const { mutateAsync } = useLoginMutation();

  const {
    values,
    handleChange,
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

  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(values) {
    try {
      await mutateAsync(values);
      resetForm();
    } catch (e) {
      toast.error("Account not found.", {
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
      <h1 className="login_label">LOGIN</h1>
      <form className="login_form" onSubmit={handleSubmit}>
        <div className="input_box">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={values.email}
          />

          {errors.email && <p className="login_error">{errors.email}</p>}
        </div>

        <div className="input_box">
          <label htmlFor="password">Password</label>
          <div className="custom_input_box">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
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

        <button
          type="submit"
          className={isSubmitting ? "submitting" : ""}
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loading size={"1rem"} /> : "Login"}
        </button>

        <h1 className="register_link_text" onClick={() => setShowLogin(false)}>
          {`Don't have an account ? `} <span>Register Now</span>
        </h1>
      </form>
    </motion.article>
  );
};

export default Login;
