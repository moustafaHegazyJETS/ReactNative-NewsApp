import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { ThemingContenxt } from "../store/Theming-context";
import { languageContenxt } from "../store/Language-context";

export function NewsItem({ newsObj }: NewsObject) {
  const navigationHook = useNavigation();
  const themingCtx = useContext(ThemingContenxt);
  const languageCtx = useContext(languageContenxt);
  const releaseDate = newsObj.publishedAt.slice(0, 10);

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
        <View style={styles.textContainer}>
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
          <Text
            style={[
              styles.releaseDate,
              {
                color: themingCtx.mode.itemTextcolor
              }
            ]}
          >
            {languageCtx.language.releaseDate}: {releaseDate}
          </Text>
        </View>
        <Image source={{ uri: newsObj.urlToImage }} style={styles.imageItem} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    alignContent: "space-around",
    padding: 5,
    borderRadius: 6,
    margin: 10,
    height: 160
  },
  textContainer: {
    flex: 1
  },
  textItem: {
    flex: 1,
    margin: 10,
    fontSize: 16
  },
  releaseDate: {
    fontSize: 12,
    margin: 10
  },
  imageItem: {
    width: 150,
    height: 150,
    borderRadius: 6,
    resizeMode: "cover"
  }
});
