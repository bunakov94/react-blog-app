import ActionTypes from './actionTypes';

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

export interface IArticlesState {
  articleList: IArticle[];
  currentPage: number;
  currentArticle: IArticle;
}

export interface IState {
  articles: IArticlesState;
  user: IUser;
}

export interface IUser {
  bio: string | null;
  createdAt: string;
  email: string;
  id: number;
  image: string | null;
  token: string;
  updatedAt: string;
  username: string;
}

export interface SetArticlesAction {
  type: typeof ActionTypes.SET_ARTICLES;
  payload: IArticle[];
}

export interface SetArticleAction {
  type: typeof ActionTypes.SET_CURRENT_ARTICLE;
  payload: IArticle;
}

export interface SetCurrentPageAction {
  type: typeof ActionTypes.SET_CURRENT_PAGE;
  payload: number;
}

export interface ISetUser {
  type: typeof ActionTypes.SET_USER;
  payload: IUser;
}
