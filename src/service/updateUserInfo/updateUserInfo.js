import { isObject } from "formik";
import {
  getAxiosUsersInstance,
  getAxiosStorageInstance,
} from "../axios_instance";
import convertToFirebaseImageURL from "../../utils/generateImageURL";

async function updateUserInfo({ id, userInfo }) {
  let avatarUrl = userInfo.avatar;

  if (isObject(userInfo.avatar)) {
    const { data } = await getAxiosStorageInstance().post(
      `/avatars%2F${id}.png`,
      userInfo.avatar,
      {
        headers: {
          "Content-Type": userInfo.avatar.type,
        },
      }
    );

    avatarUrl = convertToFirebaseImageURL("avatars", id, data?.downloadTokens);
  }

  const updatedUserInfo = {
    fields: {
      firstName: {
        stringValue: userInfo.firstName + "",
      },
      lastName: {
        stringValue: userInfo.lastName + "",
      },
      bio: {
        stringValue: userInfo.bio + "",
      },
      avatar: {
        stringValue: avatarUrl + "",
      },
    },
  };

  await getAxiosUsersInstance().patch(
    "/" +
      id +
      "?updateMask.fieldPaths=firstName&updateMask.fieldPaths=lastName&updateMask.fieldPaths=bio&updateMask.fieldPaths=avatar",
    updatedUserInfo,
    {}
  );

  return {
    ...userInfo,
    avatar: avatarUrl,
  };
}

export default updateUserInfo;
