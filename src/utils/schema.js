import * as yup from "yup";

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})/;

const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const postSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters.")
    .required("Username is required."),
  content: yup
    .string()
    .min(2, "Content must be at least 3 characters.")
    .required("Content is required."),
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email.")
    .matches(emailRegEx, "Invalid email.")
    .required("Email is required."),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters.")
    .matches(
      passwordRegEx,
      "Password must contain at least one uppercase, one lowercase, one number and one special character."
    )
    .required("Password is required."),
});

export { postSchema, loginSchema };
