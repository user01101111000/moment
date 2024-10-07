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
        stringValue: "No bio yet.",
      },
      gender: {
        stringValue: userInfo.gender,
      },
      avatar: {
        stringValue:
          "https://firebasestorage.googleapis.com/v0/b/moment-c8183.appspot.com/o/common%2Fpp.png?alt=media&token=4d85b22c-df4a-48d5-952f-32c6bd1406d7",
      },
    },
  };

  await getAxiosUsersInstance().patch(`/${userID}`, userDataForDB);

  return authData;
}

export default register;
