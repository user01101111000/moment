import { getAxiosInstance } from "../axios_instance";
import { v4 } from "uuid";

async function addPost(post) {
  const uuid = v4().replace(/-/g, "");

  const postData = {
    fields: {
      id: {
        stringValue: uuid + "",
      },
      username: {
        stringValue: post.username,
      },
      content: {
        stringValue: post.content,
      },
      likeCount: {
        stringValue: "0",
      },
      commentCount: {
        stringValue: "0",
      },
      time: {
        stringValue: new Date().getTime() + "",
      },
    },
  };

  await getAxiosInstance().patch("/" + uuid, postData);
}

export default addPost;
