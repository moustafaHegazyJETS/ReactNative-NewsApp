import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator
} from "react-native";
import { useEffect, useContext, useState } from "react";
import { getNews } from "../Network/http";
// import { NewsContext } from "../store/News-context";
import { NewsItem } from "../components/NewsItem";
import { languageContenxt } from "../store/Language-context";
import { ThemingContenxt } from "../store/Theming-context";

export function NewsScreen() {
  // constants
  const languageCtx = useContext(languageContenxt);
  const themingCtx = useContext(ThemingContenxt);
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
        { backgroundColor: themingCtx.mode.background }
      ]}
    >
      <TextInput
        style={[
          style.inputText,
          {
            borderColor: themingCtx.mode.boarder,
            backgroundColor: themingCtx.mode.searchBarBackground
          }
        ]}
        onChangeText={onChangeText}
        placeholder={languageCtx.language.searchNews}
      />
      {refreshing ? <ActivityIndicator /> : null}
      <FlatList
        data={news}
        renderItem={(itemData: any) => {
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
