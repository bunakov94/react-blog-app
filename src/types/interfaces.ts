import ActionTypes from '../redux/actionTypes';

export interface IArticle {
  author: {
    bio: null | string;
    following: boolean;
    image: string;
    username: string;
  };

  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
}

export interface IArticleList {
  articleList: IArticle[];
  currentPage: number;
  currentArticle: IArticle | {};
}

export interface IArticleListProps {
  articleList: IArticle[];
  currentPage: number;
  setArticles: (payload: IArticle[]) => void;
  setCurrentPage: (payload: number) => void;
}

export interface IState {
  articles: IArticleList;
}
