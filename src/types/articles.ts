import { IArticle } from './interfaces';

export enum ArticlesActionTypes {
  FETCH_ARTICLES = 'FETCH_ARTICLES',
  FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS',
  FETCH_ARTICLES_ERROR = 'FETCH_ARTICLES_ERROR',
  SET_ARTICLES_PAGE = 'SET_ARTICLES_PAGE',
}

export interface ArticlesState {
  articles: IArticle[];
  page: number;
  loading: boolean;
  error: null | string;
}

interface FetchArticlesAction {
  type: ArticlesActionTypes.FETCH_ARTICLES;
}
interface FetchArticlesSuccessAction {
  type: ArticlesActionTypes.FETCH_ARTICLES_SUCCESS;
  payload: IArticle[];
}
interface FetchArticlesErrorAction {
  type: ArticlesActionTypes.FETCH_ARTICLES_ERROR;
  payload: string;
}
interface SetArticlesPageAction {
  type: ArticlesActionTypes.SET_ARTICLES_PAGE;
  payload: number;
}

export type ArticlesAction =
  | FetchArticlesAction
  | FetchArticlesSuccessAction
  | FetchArticlesErrorAction
  | SetArticlesPageAction;
