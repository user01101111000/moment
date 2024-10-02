import { getAxiosCommentsInstance } from "../axios_instance";
import { v4 } from "uuid";

async function postComment({ postID, comment }) {

  const uuid = v4().replace(/-/g, "");

  const commenData = {
    fields: {
      id: {
        stringValue: uuid + "",
      },
      username: {
        stringValue: comment.username,
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
    },
  };

  await getAxiosCommentsInstance(postID).patch("/" + uuid, commenData);
}

export default postComment;
