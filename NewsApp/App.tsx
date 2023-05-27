import { StatusBar } from "expo-status-bar";
import { LangugeContextProvider } from "./store/Language-context";
import { useContext } from "react";
import { AppScreen } from "./Screens/AppScreen";
import { ThemingContextProvider } from "./store/Theming-context";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <LangugeContextProvider>
        <ThemingContextProvider>
          <AppScreen />
        </ThemingContextProvider>
      </LangugeContextProvider>
    </>
  );
}
