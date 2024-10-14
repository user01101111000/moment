import { useEffect, useState } from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";

const LanguageSelect = ({ auth = false }) => {
  const options = [
    { value: "en", label: auth ? "EN" : "English" },
    { value: "az", label: auth ? "AZ" : "Azerbaijani" },
  ];

  const { i18n } = useTranslation();

  const [selectedOption, setSelectedOption] = useState({
    value: ["en", "az"].includes(i18n.language) ? i18n.language : "en",
    label:
      ["en", "az"].includes(i18n.language) && i18n.language == "az"
        ? auth
          ? "AZ"
          : "Azerbaijani"
        : auth
        ? "EN"
        : "English",
  });

  useEffect(() => {
    i18n.changeLanguage(selectedOption.value);
  }, [selectedOption.value]);

  return (
    <div>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        components={{ IndicatorSeparator: () => null }}
        styles={{
          control: (base) => ({
            ...base,
            fontFamily: "Geist",
            fontSize: "0.9rem",
            boxShadow: "none",
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
            fontSize: "0.9rem",
            fontWeight: "600",
            padding: "0.3rem",
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
