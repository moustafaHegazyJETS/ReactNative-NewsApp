import { Text, Button, View, StyleSheet, FlatList, Image } from "react-native";
import { GlobalStyles } from "../utls/Colors";

export function NewsItem({ newsObj }: NewsObject) {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.textItem}>{newsObj.title}</Text>
      <Image source={{ uri: newsObj.urlToImage }} style={styles.imageItem} />
    </View>
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
    borderRadius: 6
  }
});
