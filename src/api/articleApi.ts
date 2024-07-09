import { Article } from "../redux/articles/articlesSlice";

let articles: Article[] = [
  { id: 1, dateCreated: '2024-07-09', title: 'First Article', content: 'This is the content of the first article', tags: ["tag1"] },
  { id: 2, dateCreated: '2024-07-10', title: 'Second Article', content: 'This is the content of the second article',  tags: ["tag1"] },
];

export const fetchArticlesApi = async () => {
  return new Promise<Article[]>((resolve) => {
    setTimeout(() => {
      resolve(articles);
    }, 100);
  });
};

export const fetchArticleDetailsApi = async (articleId: number) => {
  return new Promise<Article>((resolve) => {
    setTimeout(() => {
      let requestedArticle = articles.filter(item => articleId === item.id);
      let article = requestedArticle[0];
      resolve(article);
    }, 100);
  });
};

export const addArticleApi = async (newArticle: Article) => {
  return new Promise<Article>((resolve) => {
    setTimeout(() => {
      articles = [...articles, newArticle]; 
      resolve(newArticle);
    }, 100);
  });
};

export const editArticleApi = async (article: Article) => {
  return new Promise<Article>((resolve) => {
    setTimeout(() => {
      articles = articles.map(item => (item.id === article.id ? article : item));
      resolve(article);
    }, 100);
  });
};

export const deleteArticleApi = async (id: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      articles = articles.filter((article) => article.id !== id);
      resolve();
    }, 100);
  });
};