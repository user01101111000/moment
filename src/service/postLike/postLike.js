import { getAxiosInstance } from "../axios_instance";

async function postLike({ postID, totalLikeCount, action }) {
  // const newLikers = action
  //   ? likers
  //   : likers.filter((x) => x.mapValue?.fields?.id?.stringValue !== liker.id);

  const likeData = {
    fields: {
      likeCount: {
        stringValue: totalLikeCount + "",
      },
    },
  };

  // const unlikeDataBody = {
  //   fields: {
  //     likers: {
  //       arrayValue: {
  //         values: newLikers,
  //       },
  //     },
  //   },
  // };

  // const likeDataBody = {
  //   fields: {
  //     likers: {
  //       arrayValue: {
  //         values: [
  //           ...newLikers,
  //           {
  //             mapValue: {
  //               fields: {
  //                 avatar: { stringValue: liker.avatar },
  //                 email: { stringValue: liker.email },
  //                 id: { stringValue: liker.id },
  //                 username: { stringValue: liker.username },
  //                 firstName: { stringValue: liker.firstName },
  //                 lastName: { stringValue: liker.lastName },
  //                 gender: { stringValue: liker.gender },
  //               },
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   },
  // };

  await getAxiosInstance().patch("/" + postID, likeData, {
    params: {
      "updateMask.fieldPaths": "likeCount",
    },
  });

  // await getAxiosInstance().patch(
  //   "/" + postID,
  //   action ? likeDataBody : unlikeDataBody,
  //   {
  //     params: {
  //       "updateMask.fieldPaths": "likers",
  //     },
  //   }
  // );
}

export default postLike;
