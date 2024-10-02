import axios from "axios";

const getAxiosInstance = () =>
  axios.create({
    baseURL: `https://firestore.googleapis.com/v1/projects/${
      import.meta.env.VITE_PROJECT_ID
    }/databases/(default)/documents/posts`,
  });

const getAxiosCommentsInstance = (postID) =>
  axios.create({
    baseURL: `https://firestore.googleapis.com/v1/projects/${
      import.meta.env.VITE_PROJECT_ID
    }/databases/(default)/documents/posts/${postID}/comments`,
  });

export { getAxiosInstance, getAxiosCommentsInstance };
