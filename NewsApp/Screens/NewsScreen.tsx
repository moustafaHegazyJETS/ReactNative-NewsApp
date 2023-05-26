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
import { GlobalStyles } from "../utls/Colors";

export function NewsScreen({ navigation }) {
  // constants
  var isLoading: boolean = true;
  const newsContext = useContext(NewsContext);

  // hooks
  const [news, addNews] = useState<NewsModel[]>();
  const [inputText, onChangeText] = useState("");

  // for updating data

  // for retriving data
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
        style={style.inputText}
        onChangeText={onChangeText}
        placeholder="Search News..."
      />
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
  },
  inputText: {
    height: 40,
    padding: 10,
    margin: 10,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: GlobalStyles.colors.primary50
  }
});
