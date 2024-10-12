import "./ProfilePost.css";
import useGetOnePostQuery from "../../../../hooks/api/useGetOnePostQuery";
import Loading from "../../../ui/Loading";
import { MdVerified } from "react-icons/md";
import { LuExternalLink } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ProfilePost = ({ postID, user, trueUser }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetOnePostQuery(postID);

  if (isLoading)
    return (
      <div className="profile_post profile_post_center">
        <Loading size={"1.2rem"} />
      </div>
    );

  return (
    <div className="profile_post">
      <div className="profile_post_name_area">
        <figure className="profile_post_avatar">
          <img src={user.avatar} alt={user.username} />
        </figure>

        <div className="profile_post_name">
          <h1>{user.username}</h1>

          {user?.verified == "true" && (
            <MdVerified className="profile_post_verified" />
          )}
        </div>
      </div>

      <div className="profile_post_content">
        <p>{data?.fields?.content?.stringValue}</p>
      </div>

      <div className="profile_post_buttons">
        <div
          className="profile_post_buttons_link profile_post_button"
          onClick={() => navigate(`/post/${postID}`)}
        >
          <LuExternalLink className="profile_post_buttons_link_icon" />
        </div>

        {trueUser && (
          <div className="profile_post_buttons_delete profile_post_button">
            <MdDelete className="profile_post_buttons_link_icon profile_post_buttons_link_icon_trash" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePost;
