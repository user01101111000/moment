import "./ProfilePosts.css";
import ProfilePost from "../ProfilePosts/ProfilePost/ProfilePost";

const ProfilePosts = ({ posts, user, trueUser }) => {
  const postList = posts.map((x) => (
    <ProfilePost
      key={x.stringValue}
      postID={x.stringValue}
      user={user}
      trueUser={trueUser}
    />
  ));

  return <article className="profile_posts_container">{postList}</article>;
};

export default ProfilePosts;
