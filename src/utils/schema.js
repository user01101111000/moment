import * as yup from "yup";

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})/;

const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const usernameRegEx = /^[a-zA-Z0-9_.]+$/;

const nameRegEx = /^[a-zA-Z]+$/;

const postSchema = yup.object().shape({
  content: yup
    .string()
    .min(2, "Content must be at least 3 characters.")
    .max(500, "Content must be at most 500 characters.")
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

const registerSchema = (usernames) => {
  return yup.object().shape({
    firstName: yup
      .string()
      .min(3, "First name must be at least 3 characters.")
      .max(15, "First name must be at most 15 characters.")
      .matches(nameRegEx, "Invalid first name.")
      .required("First name is required."),
    lastName: yup
      .string()
      .min(3, "Last name must be at least 3 characters.")
      .max(15, "Last name must be at most 15 characters.")
      .matches(nameRegEx, "Invalid last name.")
      .required("Last name is required."),
    username: yup
      .string()
      .min(3, "Username must be at least 3 characters.")
      .max(10, "Username must be at most 10 characters.")
      .matches(usernameRegEx, "Invalid username.")
      .notOneOf(usernames, "Username is already taken.")
      .required("Username is required."),
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
    gender: yup.string().required("Gender is required."),
  });
};

const editProfileSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(3, "First name must be at least 3 characters.")
    .max(15, "First name must be at most 15 characters.")
    .matches(nameRegEx, "Invalid first name.")
    .required("First name is required."),
  lastName: yup
    .string()
    .min(3, "Last name must be at least 3 characters.")
    .max(15, "Last name must be at most 15 characters.")
    .matches(nameRegEx, "Invalid last name.")
    .required("Last name is required."),
  bio: yup.string().max(100, "Bio must be at most 100 characters."),
  avatar: yup
    .mixed()
    .test("required", "File is required", (value) => value !== ""),
});

export { postSchema, loginSchema, registerSchema, editProfileSchema };
