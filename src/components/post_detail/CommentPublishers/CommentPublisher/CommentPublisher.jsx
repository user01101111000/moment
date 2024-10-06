import "./CommentPublisher.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CommentPublisher = ({ publisher }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="comment_publisher">
      <div className="comment_publisher_main">
        <figure className="comment_publisher_avatar">
          <img
            src={publisher.avatar.stringValue}
            alt={publisher.username.stringValue}
          />
        </figure>

        <div className="comment_publisher_info">
          <h1>
            {publisher.firstName.stringValue +
              " " +
              publisher.lastName.stringValue}
          </h1>
          <p>@{publisher.username.stringValue}</p>
        </div>
      </div>

      <div className="comment_publisher_footer">
        <button
          onClick={() => navigate(`/@${publisher.username.stringValue}`)}
          className="comment_publisher_button"
        >
          {t("post.showProfile")}
        </button>
      </div>
    </div>
  );
};

export default CommentPublisher;
