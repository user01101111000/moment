import { getAxiosInstance, getAxiosUsersInstance } from "../axios_instance";
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
        stringValue: post.id,
      },
      createdAt: { timestampValue: new Date().toISOString() },
    },
  };

  const newPostsDatas = [...post.oldPostsIDs, { stringValue: uuid }];

  const userPostsData = {
    fields: {
      posts: {
        arrayValue: {
          values: newPostsDatas,
        },
      },
    },
  };

  await getAxiosInstance().patch("/" + uuid, postData);

  await getAxiosUsersInstance().patch("/" + post.publisherID, userPostsData, {
    params: {
      "updateMask.fieldPaths": "posts",
    },
  });

  return newPostsDatas;
}

export default addPost;
