import "./CommentPublisher.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useGetAnyUserInfoQuery from "../../../../hooks/api/useGetAnyUserInfoQuery";
import Skeleton from "../../../ui/Skeleton/Skeleton";

const CommentPublisher = ({ publisher }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: user, isLoading } = useGetAnyUserInfoQuery(publisher);

  if (isLoading)
    return (
      <div className="comment_publisher">
        <div className="comment_publisher_main">
          <figure className="comment_publisher_avatar">
            <Skeleton width="100%" height="100%" borderRadius="50%" />
          </figure>

          <div className="comment_publisher_info">
            <Skeleton width="100%" height="1rem" borderRadius="4px" />
            <Skeleton width="100%" height="1rem" borderRadius="4px" />
          </div>
        </div>

        <div className="comment_publisher_footer">
          <Skeleton width="100%" height="1rem" borderRadius="4px" />
        </div>
      </div>
    );

  return (
    <div className="comment_publisher">
      <div className="comment_publisher_main">
        <figure className="comment_publisher_avatar">
          <img src={user.avatar.stringValue} alt={user.username.stringValue} />
        </figure>

        <div className="comment_publisher_info">
          <h1>
            {user.firstName.stringValue + " " + user.lastName.stringValue}
          </h1>
          <p>@{user.username.stringValue}</p>
        </div>
      </div>

      <div className="comment_publisher_footer">
        <button
          onClick={() => navigate(`/@${user.username.stringValue}`)}
          className="comment_publisher_button"
        >
          {t("post.showProfile")}
        </button>
      </div>
    </div>
  );
};

export default CommentPublisher;
