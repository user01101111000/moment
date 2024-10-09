import { getAxiosInstance } from "../axios_instance";

async function postLike({ postID, totalLikeCount, likers, liker, action }) {
  const newLikers = action
    ? [...likers, { stringValue: liker }]
    : likers.filter((x) => x?.stringValue !== liker);

  const likeData = {
    fields: {
      likeCount: {
        stringValue: totalLikeCount + "",
      },
    },
  };

  const likedData = {
    fields: {
      likers: {
        arrayValue: {
          values: newLikers,
        },
      },
    },
  };

  await getAxiosInstance().patch("/" + postID, likeData, {
    params: {
      "updateMask.fieldPaths": "likeCount",
    },
  });

  await getAxiosInstance().patch("/" + postID, likedData, {
    params: {
      "updateMask.fieldPaths": "likers",
    },
  });
}

export default postLike;
