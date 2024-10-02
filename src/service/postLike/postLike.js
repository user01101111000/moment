import { getAxiosInstance } from "../axios_instance";

async function postLike({ postID, totalLikeCount }) {
  const likeData = {
    fields: {
      likeCount: {
        stringValue: totalLikeCount + "",
      },
    },
  };

  await getAxiosInstance().patch("/" + postID, likeData, {
    params: {
      "updateMask.fieldPaths": "likeCount",
    },
  });
}

export default postLike;
