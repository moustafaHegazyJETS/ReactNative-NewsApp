import { createContext, useState } from "react";
import { StringsofLanguages } from "../utls/strings";

export const languageContenxt = createContext({
  language: StringsofLanguages.en,
  setLang: (language: String) => {}
});

export function LangugeContextProvider({ children }) {
  const [lang, setChangedLang] = useState(StringsofLanguages.en);

  function setLang(lang: String) {
    console.log("inside context ****&&&&&&&&&&&&&&***********&&&&&&&");
    console.log(lang);
    const changedLang =
      lang === "en" ? StringsofLanguages.en : StringsofLanguages.es;
    setChangedLang(changedLang);
  }
  const value = {
    language: lang,
    setLang: setLang
  };
  return (
    <languageContenxt.Provider value={value}>
      {children}
    </languageContenxt.Provider>
  );
}
