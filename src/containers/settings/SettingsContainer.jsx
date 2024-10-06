import { useTranslation } from "react-i18next";
import { IoLanguage } from "react-icons/io5";
import "./SettingsContainer.css";
import LanguageSelect from "../../components/settings/LanguageSelect/LanguageSelect";

const SettingsContainer = () => {
  const { t } = useTranslation();

  return (
    <section className="settings_container">
      <div className="lang_setting">
        <div className="lang_label">
          <IoLanguage className="lang_icon" />
          <h1>{t("settings.language")}</h1>
        </div>

        <LanguageSelect />
      </div>
    </section>
  );
};

export default SettingsContainer;
