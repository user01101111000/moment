import ProfileContainer from "../../containers/profile/ProfileContainer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useGetUsersQuery from "../../hooks/api/useGetUsersQuery";
import SimpleLoadingPage from "../../components/ui/SimpleLoadingPage/SimpleLoadingPage";
import NotFound from "../not_found/page";

const Profile = () => {
  const { username } = useParams();
  const { userInfo } = useSelector((state) => state.userInfo);

  const urlName = username.split("@")[1];

  const trueUser = urlName == userInfo.username;

  const { data, isLoading } = useGetUsersQuery(!trueUser);

  if (isLoading) return <SimpleLoadingPage />;

  const findedUser = data
    ?.map((x) => x?.fields)
    .find((x) => x?.username?.stringValue == urlName);

  if (!trueUser && !findedUser) return <NotFound />;

  const findedUserNew = {
    firstName: findedUser?.firstName?.stringValue,
    lastName: findedUser?.lastName?.stringValue,
    username: findedUser?.username?.stringValue,
    email: findedUser?.email?.stringValue,
    id: findedUser?.id?.stringValue,
    gender: findedUser?.gender?.stringValue,
    avatar: findedUser?.avatar?.stringValue,
    bio: findedUser?.bio?.stringValue,
    verified: findedUser?.verified?.stringValue,
    posts: findedUser?.posts?.arrayValue?.values,
  };

  return (
    <ProfileContainer
      user={trueUser ? userInfo : findedUserNew}
      trueUser={trueUser}
    />
  );
};

export default Profile;
