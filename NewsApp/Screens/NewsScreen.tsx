import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator
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
  const [refreshing, setRefreshing] = useState(true);
  const [news, addNews] = useState<NewsModel[]>();
  const [inputText, onChangeText] = useState("");

  // for updating data

  // for retriving data
  useEffect(() => {
    // if is loading in first time to get data once and to refresh if pull to refresh
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
    <View style={style.mainScreenView}>
      <TextInput
        style={style.inputText}
        onChangeText={onChangeText}
        placeholder="Search News..."
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
