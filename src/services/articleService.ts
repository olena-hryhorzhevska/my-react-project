import axios from 'axios';
import { Article } from '../types/article';


interface ArticlesHttpResponse {
  hits: Article[];
}

export const fetchArticles = async (topic: string): Promise<Article[]> => {
  const response = await axios.get<ArticlesHttpResponse>(
    `https://hn.algolia.com/api/v1/search?query=${topic}`
  );
  return response.data.hits;
};