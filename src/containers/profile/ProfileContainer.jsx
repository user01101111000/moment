import "./ProfileContainer.css";

const ProfileContainer = ({ user }) => {
  console.log(user);
  return (
    <section className="profile_container">
      <div className="profile_container_header">
        <div className="profile_container_header_title"></div>
        <figure className="profile_avatar_fig">
          <img src="" alt="" />
        </figure>
      </div>
    </section>
  );
};

export default ProfileContainer;
