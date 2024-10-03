import { useFormik } from "formik";
import "./Register.css";
import { registerSchema } from "../../../utils/schema";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loading from "../../ui/Loading";
import { toast, Bounce } from "react-toastify";
import useRegisterMutation from "../../../hooks/api/useRegisterMutation";

const Register = ({ setShowLogin }) => {
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
    validationSchema: registerSchema,
  });

  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(values) {
    await mutateAsync(values);
    resetForm();
    toast.success("Account created.", {
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
      <h1 className="login_label">REGISTER</h1>

      <form className="login_form" onSubmit={handleSubmit}>
        <div className="input_box_names">
          <div className="input_box">
            <label htmlFor="firstName">First Name</label>

            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              value={values.firstName}
            />

            {errors.firstName && (
              <p className="login_error">{errors.firstName}</p>
            )}
          </div>

          <div className="input_box">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              value={values.lastName}
            />

            {errors.lastName && (
              <p className="login_error">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="input_box">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={values.username}
          />

          {errors.username && <p className="login_error">{errors.username}</p>}
        </div>

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
            Male
          </label>

          <label className="radio_label">
            <input
              type="radio"
              value="female"
              name="gender"
              checked={values.gender == "female"}
              onChange={handleChange}
            />
            Female
          </label>
        </div>

        <hr className="divider_register" />
        <button
          type="submit"
          className={isSubmitting ? "submitting" : ""}
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loading size={"1rem"} /> : "Register"}
        </button>

        <h1 className="register_link_text" onClick={() => setShowLogin(true)}>
          {`You have an account ? `} <span>Login Now</span>
        </h1>
      </form>
    </motion.article>
  );
};

export default Register;
