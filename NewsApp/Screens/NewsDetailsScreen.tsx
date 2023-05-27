import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Linking
} from "react-native";
import { ThemingContenxt } from "../store/Theming-context";
import { languageContenxt } from "../store/Language-context";
import { useContext } from "react";

export function NewsDetailsScreen({ route }: any) {
  const themingCtx = useContext(ThemingContenxt);
  const newsObj: NewsModel = route.params.selectedNewsObject;
  const releaseDate = newsObj.publishedAt.slice(0, 10);
  const languageCtx = useContext(languageContenxt);

  return (
    <View style={styles.mainScreenView}>
      <Image source={{ uri: newsObj.urlToImage }} style={styles.imageItem} />
      <ScrollView
        style={[
          styles.scrollView,
          {
            backgroundColor: themingCtx.mode.background
          }
        ]}
      >
        <Text
          style={[
            styles.headerText,
            {
              color: themingCtx.mode.textColor
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
                color: themingCtx.mode.textDetailsColor
              }
            ]}
          >
            {languageCtx.language.author}: {newsObj.author}
          </Text>
          <Text
            style={{
              color: themingCtx.mode.textDetailsColor
            }}
          >
            {languageCtx.language.releaseDate}: {releaseDate}
          </Text>
        </View>
        <View style={styles.articleLink}>
          <Text
            style={[
              styles.descText,
              {
                color: themingCtx.mode.textColor
              }
            ]}
          >
            {newsObj.content}
          </Text>

          <Text
            style={[styles.linkText, { color: themingCtx.mode.textLinkColor }]}
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
    marginTop: 50,
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center"
  }
});
