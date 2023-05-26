import {
  Text,
  Button,
  View,
  StyleSheet,
  FlatList,
  TextInput
} from "react-native";
import { useEffect, useContext, useState } from "react";
import { getNews } from "../Network/http";
import { NewsContext } from "../store/News-context";
import { NewsItem } from "../components/NewsItem";

export function NewsScreen({ navigation }) {
  // constants
  var isLoading: boolean = true;
  const newsContext = useContext(NewsContext);

  // hooks
  const [news, addNews] = useState<NewsModel[]>();
  const [inputText, onChangeText] = useState("");

  useEffect(() => {
    async function fetchNews() {
      const newNews = await getNews();
      newsContext.setNews(newNews);
      addNews(newNews);
    }
    // if is loading in first time to get data once and to refresh if pull to refresh
    if (isLoading) {
      fetchNews();
      isLoading = false;
    }
  }, [isLoading, getNews]);

  // functions
  // return
  return (
    <View style={style.mainScreenView}>
      <TextInput
        onChangeText={onChangeText}
        placeholder="Search News..."
        keyboardType="numeric"
      />
      <FlatList
        data={news}
        renderItem={itemData => {
          return <NewsItem newsObj={itemData.item} />;
        }}
      />
    </View>
  );
}

const style = StyleSheet.create({
  mainText: {
    color: "red"
  },
  mainScreenView: {
    flex: 1,
    margin: 10
  }
});
