import { createContext, useState } from "react";

export const NewsContext = createContext({
  news: [],
  setNews: (news: NewsModel[]) => {},
  getNews: (id: String) => {}
});

export function NewsContextProvider({ children }) {
  const [news, setRecievedNews] = useState<NewsModel[]>([]);

  function setNews(news: Array<NewsModel>) {
    setRecievedNews(news);
  }

  // should be revisited
  function getNews(id: String) {
    let numberId = +id;
    return news[numberId];
  }

  const value = {
    news: news,
    setNews: setNews,
    getNews: getNews
  };
  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
}
