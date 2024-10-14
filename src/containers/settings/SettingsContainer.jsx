import "./SettingsContainer.css";
import { useTranslation } from "react-i18next";
import { IoLanguage } from "react-icons/io5";
import LanguageSelect from "../../components/settings/LanguageSelect/LanguageSelect";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/common/useAuth";
import { motion } from "framer-motion";
import { IoArrowBack } from "react-icons/io5";

const SettingsContainer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logout } = useAuth();

  return (
    <motion.section
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      className="settings_container"
    >
      <div className="settings_header">
        <IoArrowBack
          className="settings_back_icon"
          onClick={() => navigate(-1)}
        />
      </div>

      <div className="lang_setting">
        <div className="lang_label">
          <IoLanguage className="lang_icon" />
          <h1>{t("settings.language")}</h1>
        </div>

        <LanguageSelect />
      </div>

      <div className="logout_setting">
        <div className="logout_label">
          <RiLogoutBoxRLine className="logout_icon" />
          <h1>{t("settings.logout")}</h1>
        </div>

        <button
          className="logout_setting_button"
          onClick={() => {
            localStorage.removeItem("m_i&r");
            logout();
            navigate("/auth");
          }}
        >
          {t("settings.logoutFromAccount")}
        </button>
      </div>
    </motion.section>
  );
};

export default SettingsContainer;
