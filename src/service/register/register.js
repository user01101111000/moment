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
      gender: {
        stringValue: userInfo.gender,
      },
    },
  };

  await getAxiosUsersInstance().patch(`/${userID}`, userDataForDB);

  return authData;
}

export default register;
