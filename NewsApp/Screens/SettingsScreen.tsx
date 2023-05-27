import { Text, View, Button, StyleSheet } from "react-native";
import { useContext } from "react";
import { languageContenxt } from "../store/Language-context";
import { StringsofLanguages } from "../utls/strings";
import { ThemingContenxt } from "../store/Theming-context";

export function SettingsScreen() {
  const lang = [
    { shortform: "en", longform: "English" },
    { shortform: "es", longform: "Spanish" }
  ];

  const languageCtx = useContext(languageContenxt);
  const themingCtx = useContext(ThemingContenxt);

  return (
    <View style={styles.mainScreenView}>
      <Text style={styles.header}>{languageCtx.language.chooseLanguage}</Text>
      <View style={styles.button}>
        <Button
          title={lang[0].longform}
          onPress={() => languageCtx.setLang(lang[0].shortform)}
        />
      </View>
      <View style={styles.button}>
        <Button
          title={lang[1].longform}
          onPress={() => languageCtx.setLang(lang[1].shortform)}
        />
      </View>
      <Text style={styles.header}>{languageCtx.language.changeAppearnce}</Text>
      <View style={styles.appearanceView}>
        <Button
          title={languageCtx.language.darkMode}
          onPress={() => themingCtx.setMode("dark")}
        />
        <Button
          title={languageCtx.language.lightMode}
          onPress={() => themingCtx.setMode("light")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainScreenView: {
    flex: 1
  },
  header: {
    height: 40,
    margin: 20,
    fontSize: 30,
    alignSelf: "center"
  },
  button: {
    width: "80%",
    marginTop: 30,
    alignSelf: "center"
  },
  appearanceView: {
    flexDirection: "row",
    alignSelf: "center",
    width: "80%",
    margin: 30,
    justifyContent: "space-between"
  }
});
