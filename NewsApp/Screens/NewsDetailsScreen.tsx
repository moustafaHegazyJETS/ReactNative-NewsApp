import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Linking
} from "react-native";
import { GlobalStyles } from "../utls/Colors";

export function NewsDetailsScreen({ route }) {
  const newsObj: NewsModel = route.params.selectedNewsObject;
  const releaseDate = newsObj.publishedAt.slice(0, 10);

  return (
    <ScrollView style={styles.mainScreenView}>
      <Text style={styles.headerText}>{newsObj.title}</Text>
      <Image
        source={{ uri: newsObj.urlToImage, cache: "only-if-cached" }}
        style={styles.imageItem}
      />
      <View style={styles.authorContainer}>
        <Text style={styles.authorItem}>Author: {newsObj.author}</Text>
        <Text style={styles.dateItem}>Release Date: {releaseDate}</Text>
      </View>
      <View style={styles.articleLink}>
        <Text style={styles.descText}>{newsObj.content}</Text>

        <Text
          style={styles.linkText}
          onPress={() => Linking.openURL(newsObj.url)}
        >
          Click Here To check full Article
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainScreenView: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary200,
    padding: 10
  },
  headerText: {
    color: "white",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 19
  },
  imageItem: {
    width: "100%",
    height: 200,
    borderRadius: 6,
    objectFit: "fill",
    alignSelf: "center"
  },
  authorContainer: {
    flexDirection: "column",
    margin: 10,
    justifyContent: "space-between"
  },
  authorItem: {
    color: "white",
    marginBottom: 10
  },
  dateItem: {
    color: "white"
  },
  articleLink: {
    alignSelf: "center"
  },
  descText: {
    fontSize: 19,
    fontWeight: "bold",
    padding: 10,
    color: "white"
  },
  linkText: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    color: GlobalStyles.colors.primary500
  }
});
