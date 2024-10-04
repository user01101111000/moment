import "./ProfileContainer.css";

const ProfileContainer = ({ user, trueUser }) => {
  return (
    <section className="profile_container">
      <div className="profile_container_header">
        <div className="profile_container_header_title">
          <h1>{user.firstName + " " + user.lastName}</h1>
          <p>{"@" + user.username}</p>
        </div>
        <figure className="profile_avatar_fig">
          <img src={user.avatar} alt={user.username} />
        </figure>
      </div>

      {trueUser && <h1>Edit profile</h1>}
    </section>
  );
};

export default ProfileContainer;
