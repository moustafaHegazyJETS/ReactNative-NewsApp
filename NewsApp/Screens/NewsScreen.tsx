import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
  useColorScheme
} from "react-native";
import { useEffect, useContext, useState } from "react";
import { getNews } from "../Network/http";
import { NewsContext } from "../store/News-context";
import { NewsItem } from "../components/NewsItem";
import { GlobalStyles } from "../utls/Colors";
import { useTheme } from "@react-navigation/native";
import { languageContenxt } from "../store/Language-context";
import { StringsofLanguages } from "../utls/strings";

export function NewsScreen() {
  // constants
  const newsContext = useContext(NewsContext);
  const languageCtx = useContext(languageContenxt);

  const theme = useColorScheme();
  const themedColors =
    theme === "dark" ? GlobalStyles.darkColors : GlobalStyles.lightColors;

  // hooks
  const [refreshing, setRefreshing] = useState(true);
  const [news, addNews] = useState<NewsModel[]>();
  const [inputText, onChangeText] = useState("");

  useEffect(() => {
    if (refreshing) {
      fetchNews();
    }
  }, [getNews, addNews]);

  // functions
  async function fetchNews() {
    addNews([]);
    const newNews = await getNews();
    newsContext.setNews(newNews);
    addNews(newNews);
    setRefreshing(false);
  }

  function onRefresh() {
    setRefreshing(true);
    fetchNews();
  }
  // return
  return (
    <View
      style={[
        style.mainScreenView,
        { backgroundColor: themedColors.background }
      ]}
    >
      <TextInput
        style={[
          style.inputText,
          {
            borderColor: themedColors.boarder,
            backgroundColor: themedColors.searchBarBackground
          }
        ]}
        onChangeText={onChangeText}
        placeholder={languageCtx.language.searchNews}
      />
      {/* update this with refreshing and fetching data screen  */}
      {refreshing ? <ActivityIndicator /> : null}
      <FlatList
        data={news}
        renderItem={itemData => {
          if (inputText === "") {
            return <NewsItem newsObj={itemData.item} />;
          } else if (
            itemData.item.title.toLowerCase().includes(inputText.toLowerCase())
          ) {
            return <NewsItem newsObj={itemData.item} />;
          }
        }}
        keyExtractor={(item, index) => index.toString()}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
}

const style = StyleSheet.create({
  mainScreenView: {
    flex: 1
  },
  inputText: {
    height: 40,
    padding: 10,
    margin: 10,
    borderRadius: 6,
    borderWidth: 2
  }
});
