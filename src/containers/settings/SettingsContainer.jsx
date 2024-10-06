import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoLanguage } from "react-icons/io5";
import "./SettingsContainer.css";

const SettingsContainer = () => {
  const { i18n, t } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

  return (
    <section className="settings_container">
      <div className="lang_setting">
        <div className="lang_label">
          <IoLanguage className="lang_icon" />
          <h1>{t("settings.language")}</h1>
        </div>
        <select
          name="lang"
          id="lang"
          value={lang}
          onChange={(e) => {
            setLang(e.target.value);
            i18n.changeLanguage(e.target.value);
          }}
          className="lang_select"
        >
          <option value="en">{t("language.english")}</option>
          <option value="az">{t("language.azerbaijani")}</option>
        </select>
      </div>
    </section>
  );
};

export default SettingsContainer;
