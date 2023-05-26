import axios from "axios";

let newsAPILink =
  "https://newsapi.org/v2/everything?q=apple&from=2023-05-24&to=2023-05-24&sortBy=popularity&apiKey=0b9e22119e804506a0c7568bfa158c52";

export async function getNews() {
  const response = await axios.get(newsAPILink);
  const newsArray: Array<NewsModel> = [];

  for (const num in response.data["articles"]) {
    const newsObj: NewsModel = {
      title: response.data["articles"][num]["title"],
      author: response.data["articles"][num]["author"],
      description: response.data["articles"][num]["description"],
      url: response.data["articles"][num]["url"],
      urlToImage: response.data["articles"][num]["urlToImage"],
      publishedAt: response.data["articles"][num]["publishedAt"],
      content: response.data["articles"][num]["content"]
    };

    newsArray.push(newsObj);
  }
  return newsArray;
}
