import * as yup from "yup";

const postSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  content: yup
    .string()
    .min(2, "Content must be at least 3 characters")
    .required("Content is required"),
});

export { postSchema };
