import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  useColorScheme
} from "react-native";
import { GlobalStyles } from "../utls/Colors";

export function NewsDetailsScreen({ route }) {
  const newsObj: NewsModel = route.params.selectedNewsObject;
  const releaseDate = newsObj.publishedAt.slice(0, 10);
  const theme = useColorScheme();
  const themedColors =
    theme === "dark" ? GlobalStyles.darkColors : GlobalStyles.lightColors;

  return (
    <View style={styles.mainScreenView}>
      <Image source={{ uri: newsObj.urlToImage }} style={styles.imageItem} />

      <ScrollView
        style={[
          styles.scrollView,
          {
            backgroundColor: themedColors.background
          }
        ]}
      >
        <Text
          style={[
            styles.headerText,
            {
              color: themedColors.textColor
            }
          ]}
        >
          {newsObj.title}
        </Text>
        <View style={styles.authorContainer}>
          <Text
            style={[
              styles.authorItem,
              {
                color: themedColors.textDetailsColor
              }
            ]}
          >
            Author: {newsObj.author}
          </Text>
          <Text
            style={{
              color: themedColors.textDetailsColor
            }}
          >
            Release Date: {releaseDate}
          </Text>
        </View>
        <View style={styles.articleLink}>
          <Text
            style={[
              styles.descText,
              {
                color: themedColors.textColor
              }
            ]}
          >
            {newsObj.content}
          </Text>

          <Text
            style={[styles.linkText, { color: themedColors.textLinkColor }]}
            onPress={() => Linking.openURL(newsObj.url)}
          >
            Click Here To check full Article
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainScreenView: {
    flex: 1
  },
  scrollView: {
    marginTop: -30,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  },
  headerText: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 19
  },
  imageItem: {
    width: "100%",
    height: 200,
    objectFit: "fill",
    alignSelf: "center"
  },
  authorContainer: {
    flexDirection: "column",
    margin: 10,
    justifyContent: "space-between"
  },
  authorItem: {
    marginBottom: 10
  },
  articleLink: {
    alignSelf: "center",
    marginBottom: 50
  },
  descText: {
    fontSize: 30,
    fontWeight: "bold",
    padding: 10
  },
  linkText: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center"
  }
});
