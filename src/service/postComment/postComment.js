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
        mapValue: {
          fields: {
            avatar: { stringValue: comment.avatar },
            email: { stringValue: comment.email },
            id: { stringValue: comment.id },
            username: { stringValue: comment.username },
            firstName: { stringValue: comment.firstName },
            lastName: { stringValue: comment.lastName },
            gender: { stringValue: comment.gender },
          },
        },
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
