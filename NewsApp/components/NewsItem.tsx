import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { ThemingContenxt } from "../store/Theming-context";

export function NewsItem({ newsObj }: NewsObject) {
  const navigationHook = useNavigation();
  const themingCtx = useContext(ThemingContenxt);

  // const theme = useColorScheme();
  // const themedColors =
  //   theme === "dark" ? GlobalStyles.darkColors : GlobalStyles.lightColors;

  function navigateToDetailsScreen() {
    navigationHook.navigate("NewsDetailsScreen", {
      selectedNewsObject: newsObj
    });
  }
  return (
    <Pressable onPress={navigateToDetailsScreen}>
      <View
        style={[
          styles.mainContainer,
          { backgroundColor: themingCtx.mode.itemBackground }
        ]}
      >
        <Text
          style={[
            styles.textItem,
            {
              color: themingCtx.mode.itemTextcolor
            }
          ]}
        >
          {newsObj.title}
        </Text>
        <Image source={{ uri: newsObj.urlToImage }} style={styles.imageItem} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    margin: 10
  },
  textItem: {
    flex: 1,
    margin: 20,
    textAlign: "center",
    fontSize: 20
  },
  imageItem: {
    width: "100%",
    height: 200,
    borderRadius: 6,
    resizeMode: "stretch"
  }
});
