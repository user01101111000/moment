import { getAxiosInstance } from "../axios_instance";

async function postLike({ postID, totalLikeCount, action, liker, likers }) {
  const newLikers = action
    ? likers
    : likers.filter((x) => x.mapValue?.fields?.id?.stringValue !== liker.id);

  const likeData = {
    fields: {
      likeCount: {
        stringValue: totalLikeCount + "",
      },
    },
  };

  const likersData =
    !newLikers.length && action
      ? {
          fields: {
            likers: {
              arrayValue: {
                values: [
                  ...newLikers,
                  action && {
                    mapValue: {
                      fields: {
                        avatar: { stringValue: liker.avatar },
                        email: { stringValue: liker.email },
                        id: { stringValue: liker.id },
                        username: { stringValue: liker.username },
                        firstName: { stringValue: liker.firstName },
                        lastName: { stringValue: liker.lastName },
                        gender: { stringValue: liker.gender },
                      },
                    },
                  },
                ],
              },
            },
          },
        }
      : {
          fields: {
            likers: {
              nullValue: null,
            },
          },
        };

  await getAxiosInstance().patch("/" + postID, likeData, {
    params: {
      "updateMask.fieldPaths": "likeCount",
    },
  });

  await getAxiosInstance().patch("/" + postID, likersData, {
    params: {
      "updateMask.fieldPaths": "likers",
    },
  });
}

export default postLike;
