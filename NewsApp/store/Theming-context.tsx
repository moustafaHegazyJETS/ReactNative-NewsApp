import { createContext, useState } from "react";
import { GlobalStyles } from "../utls/Colors";

export const ThemingContenxt = createContext({
  mode: GlobalStyles.lightColors,
  setMode: (mode: String) => {}
});

export function ThemingContextProvider({ children }) {
  const [theme, setChangedTheme] = useState(GlobalStyles.lightColors);

  function setTheme(theme: String) {
    const changedTheme =
      theme === "dark" ? GlobalStyles.darkColors : GlobalStyles.lightColors;
    setChangedTheme(changedTheme);
  }
  const value = {
    mode: theme,
    setMode: setTheme
  };
  return (
    <ThemingContenxt.Provider value={value}>
      {children}
    </ThemingContenxt.Provider>
  );
}
