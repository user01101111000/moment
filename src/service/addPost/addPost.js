import { getAxiosInstance } from "../axios_instance";
import { v4 } from "uuid";

async function addPost(post) {
  const uuid = v4().replace(/-/g, "");

  const postData = {
    fields: {
      id: {
        stringValue: uuid + "",
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
      publisher: {
        mapValue: {
          fields: {
            avatar: { stringValue: post.avatar },
            email: { stringValue: post.email },
            id: { stringValue: post.id },
            username: { stringValue: post.username },
            firstName: { stringValue: post.firstName },
            lastName: { stringValue: post.lastName },
            gender: { stringValue: post.gender },
          },
        },
      },
    },
  };

  await getAxiosInstance().patch("/" + uuid, postData);
}

export default addPost;
