import {
  getAxiosAuthRegisterInstance,
  getAxiosUsersInstance,
} from "../axios_instance";

async function register(userInfo) {
  const userData = {
    email: userInfo.email,
    password: userInfo.password,
    displayName: userInfo.username,
    returnSecureToken: true,
  };

  const { data: authData } = await getAxiosAuthRegisterInstance().post(
    "",
    userData
  );

  const userID = authData.localId;

  const userDataForDB = {
    fields: {
      firstName: {
        stringValue: userInfo.firstName,
      },
      lastName: {
        stringValue: userInfo.lastName,
      },
      username: {
        stringValue: userInfo.username,
      },
      email: {
        stringValue: userInfo.email,
      },
      id: {
        stringValue: userID,
      },
      bio: {
        stringValue: "",
      },
      verified: {
        stringValue: "false",
      },
      gender: {
        stringValue: userInfo.gender,
      },
      avatar: {
        stringValue:
          "https://firebasestorage.googleapis.com/v0/b/test-26a3b.appspot.com/o/common%2Fpp.webp?alt=media&token=e5029d8e-439c-4de7-8b0e-2f3da589122b",
      },
      posts: {
        arrayValue: {
          values: [],
        },
      },
    },
  };

  await getAxiosUsersInstance().patch(`/${userID}`, userDataForDB);

  return authData;
}

export default register;
