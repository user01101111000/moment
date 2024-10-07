import { string } from "yup";
import { getAxiosCommentsInstance, getAxiosInstance } from "../axios_instance";
import { v4 } from "uuid";

async function postComment({ postID, comment, latestCommentCount }) {
  const uuid = v4().replace(/-/g, "");

  const commenData = {
    fields: {
      id: {
        stringValue: uuid + "",
      },
      postID: {
        stringValue: postID,
      },
      content: {
        stringValue: comment.content,
      },
      likeCount: {
        stringValue: "0",
      },
      dislikeCount: {
        stringValue: "0",
      },
      time: {
        stringValue: new Date().getTime() + "",
      },
      publisher: {
        stringValue: comment.id,
      },
    },
  };

  const commentCountData = {
    fields: {
      commentCount: {
        stringValue: latestCommentCount + 1 + "",
      },
    },
  };

  await getAxiosCommentsInstance(postID).patch("/" + uuid, commenData);

  await getAxiosInstance().patch("/" + postID, commentCountData, {
    params: {
      "updateMask.fieldPaths": "commentCount",
    },
  });
}

export default postComment;
