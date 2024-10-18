import { getAxiosInstance } from "../axios_instance";

async function editPost({ content, postID, edited }) {
  const contentData = {
    fields: {
      content: {
        stringValue: content,
      },
    },
  };

  const editedData = {
    fields: {
      edited: {
        stringValue: edited,
      },
    },
  };

  await getAxiosInstance().patch(`/${postID}`, contentData, {
    params: {
      "updateMask.fieldPaths": "content",
    },
  });

  await getAxiosInstance().patch(`/${postID}`, editedData, {
    params: {
      "updateMask.fieldPaths": "edited",
    },
  });
}

export default editPost;
