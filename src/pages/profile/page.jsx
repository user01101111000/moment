import ProfileContainer from "../../containers/profile/ProfileContainer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useGetUsersQuery from "../../hooks/api/useGetUsersQuery";
import HomeLaoding from "../../containers/home/HomeLoading";

const Profile = () => {
  const { username } = useParams();
  const { userInfo } = useSelector((state) => state.userInfo);

  const urlName = username.split("@")[1];

  const trueUser = urlName == userInfo.username;

  const { data, isLoading } = useGetUsersQuery(!trueUser);

  const findedUser = data
    ?.map((x) => x?.fields)
    .find((x) => x?.username?.stringValue == urlName);

  if (isLoading) return <HomeLaoding />;

  return <ProfileContainer user={trueUser ? userInfo : findedUser} />;
};

export default Profile;
