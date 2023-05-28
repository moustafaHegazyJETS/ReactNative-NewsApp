import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Text,
  ActivityIndicator
} from "react-native";
import { useEffect, useContext, useState } from "react";
import { getNews } from "../Network/http";
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
      <View style={style.inputView}>
        <Text style={style.latestNews}>{languageCtx.language.latestNews}</Text>
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
      </View>

      {refreshing ? (
        <Text style={style.refreshing}>
          {languageCtx.language.fetchingData}
        </Text>
      ) : null}

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
  inputView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginRight: 8,
    marginLeft: 8
  },
  inputText: {
    height: 30,
    padding: 5,
    width: "50%",
    borderRadius: 6,
    borderWidth: 2
  },
  latestNews: {
    height: 30,
    width: "50%",
    fontSize: 20,
    color: "white"
  },
  refreshing: {
    fontSize: 20,
    color: "white",
    marginTop: 100
  }
});
