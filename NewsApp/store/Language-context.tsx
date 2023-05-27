import { createContext, useState } from "react";
import { StringsofLanguages } from "../utls/strings";

export const languageContenxt = createContext({
  language: StringsofLanguages.en,
  setLang: (language: String) => {}
});

export function LangugeContextProvider({ children }: any) {
  const [lang, setChangedLang] = useState(StringsofLanguages.en);

  function setLang(lang: String) {
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
