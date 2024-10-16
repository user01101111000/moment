import { getAxiosCommentsInstance } from "../axios_instance";

async function postCommentLike({
  postID,
  commentID,
  commentLikeCount,
  likers,
  action,
  liker,
}) {
  const newLikers = action
    ? [...likers, { stringValue: liker }]
    : likers.filter((x) => x?.stringValue !== liker);

  const likedData = {
    fields: {
      likers: {
        arrayValue: {
          values: newLikers,
        },
      },
    },
  };

  const likeData = {
    fields: {
      likeCount: {
        stringValue: commentLikeCount + "",
      },
    },
  };

  await getAxiosCommentsInstance(postID).patch(`/${commentID}`, likeData, {
    params: {
      "updateMask.fieldPaths": "likeCount",
    },
  });

  await getAxiosCommentsInstance(postID).patch(`/${commentID}`, likedData, {
    params: {
      "updateMask.fieldPaths": "likers",
    },
  });
}

export default postCommentLike;
