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

const getAxiosLikesInstance = (postID) =>
  axios.create({
    baseURL: `https://firestore.googleapis.com/v1/projects/${
      import.meta.env.VITE_PROJECT_ID
    }/databases/(default)/documents/posts/${postID}/likes`,
  });

const getAxiosUsersInstance = () =>
  axios.create({
    baseURL: `https://firestore.googleapis.com/v1/projects/${
      import.meta.env.VITE_PROJECT_ID
    }/databases/(default)/documents/users`,
  });

const getAxiosAuthRegisterInstance = () =>
  axios.create({
    baseURL: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
      import.meta.env.VITE_API_KEY
    }`,
  });

const getAxiosAuthLoginInstance = () =>
  axios.create({
    baseURL: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
      import.meta.env.VITE_API_KEY
    }`,
  });

const getAxiosRefreshTokenInstance = () =>
  axios.create({
    baseURL: `https://securetoken.googleapis.com/v1/token?key=${
      import.meta.env.VITE_API_KEY
    }`,
  });

const getAxiosUserInfoInstance = () =>
  axios.create({
    baseURL: `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${
      import.meta.env.VITE_API_KEY
    }`,
  });

export {
  getAxiosInstance,
  getAxiosCommentsInstance,
  getAxiosUsersInstance,
  getAxiosAuthRegisterInstance,
  getAxiosAuthLoginInstance,
  getAxiosRefreshTokenInstance,
  getAxiosUserInfoInstance,
  getAxiosLikesInstance,
};
