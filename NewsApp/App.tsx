import { StatusBar } from "expo-status-bar";
import { LangugeContextProvider } from "./store/Language-context";
import { useContext } from "react";
import { AppScreen } from "./Screens/AppScreen";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <LangugeContextProvider>
        <AppScreen />
      </LangugeContextProvider>
    </>
  );
}
