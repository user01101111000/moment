import { useEffect, useState } from "react";
import "./LanguageSelect.css";
import Select from "react-select";
import { useTranslation } from "react-i18next";

const LanguageSelect = () => {
  const { t, i18n } = useTranslation();

  const [selectedOption, setSelectedOption] = useState({
    value: i18n.language,
    label: t(`language.${i18n.language}`),
  });

  useEffect(() => {
    i18n.changeLanguage(selectedOption.value);
  }, [selectedOption.value]);

  const options = [
    { value: "en", label: t("language.english") },
    { value: "az", label: t("language.azerbaijani") },
  ];

  return (
    <div>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        styles={{
          control: (base) => ({
            ...base,
            fontFamily: "Geist",
            fontSize: "1rem",
            fontWeight: "600",
            backgroundColor: "#181818",
            color: "#fff",
            border: "0.5px solid rgba(255, 255, 255, 0.2)",
            cursor: "pointer",
            "&:hover": {
              borderColor: "rgba(255, 255, 255, 0.2)",
            },
            "&:focus": {
              borderColor: "rgba(255, 255, 255, 0.2)",
            },
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "#181818",
            color: "#fff",
            border: "0.5px solid rgba(255, 255, 255, 0.2)",
            fontFamily: "Geist",
            fontSize: "1rem",
            fontWeight: "600",
          }),
          option: (base) => ({
            ...base,
            backgroundColor: "#181818",
            color: "white",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
          }),
          singleValue: (base) => ({
            ...base,
            color: "white",
          }),
        }}
      />
    </div>
  );
};

export default LanguageSelect;
