import { getAxiosInstance, getAxiosUsersInstance } from "../axios_instance";

async function deletePost({ id, postIDs, userID }) {
  const newPostsDatas = postIDs.filter((x) => x?.stringValue !== id);

  const userPostsData = {
    fields: {
      posts: {
        arrayValue: {
          values: newPostsDatas,
        },
      },
    },
  };

  await getAxiosInstance().delete("/" + id);

  await getAxiosUsersInstance().patch("/" + userID, userPostsData, {
    params: {
      "updateMask.fieldPaths": "posts",
    },
  });

  return newPostsDatas;
}

export default deletePost;
