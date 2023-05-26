import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { GlobalStyles } from "../utls/Colors";
import { useNavigation } from "@react-navigation/native";

export function NewsItem({ newsObj }: NewsObject) {
  const navigationHook = useNavigation();

  function navigateToDetailsScreen() {
    navigationHook.push("NewsDetailsScreen");
  }
  return (
    <Pressable onPress={navigateToDetailsScreen}>
      <View style={styles.mainContainer}>
        <Text style={styles.textItem}>{newsObj.title}</Text>
        <Image
          source={{ uri: newsObj.urlToImage, cache: "only-if-cached" }}
          style={styles.imageItem}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    margin: 10,
    backgroundColor: GlobalStyles.colors.primary100
  },
  textItem: {
    flex: 1,
    margin: 20,
    textAlign: "center"
  },
  imageItem: {
    width: "100%",
    height: 200,
    borderRadius: 6,
    resizeMode: "stretch"
  }
});
