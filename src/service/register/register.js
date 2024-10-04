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
      avatar: {
        stringValue:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      },
    },
  };

  await getAxiosUsersInstance().patch(`/${userID}`, userDataForDB);

  return authData;
}

export default register;
