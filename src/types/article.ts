import { IArticle } from './interfaces';

export interface ArticleState {
  article: IArticle;
  loading: boolean;
  error: null | string;
}

export enum ArticleActionTypes {
  FETCH_ARTICLE = 'FETCH_ARTICLE',
  FETCH_ARTICLE_SUCCESS = 'FETCH_ARTICLE_SUCCESS',
  FETCH_ARTICLE_ERROR = 'FETCH_ARTICLE_ERROR',
}

interface FetchArticleAction {
  type: ArticleActionTypes.FETCH_ARTICLE;
}
interface FetchArticleSuccessAction {
  type: ArticleActionTypes.FETCH_ARTICLE_SUCCESS;
  payload: IArticle;
}
interface FetchArticleErrorAction {
  type: ArticleActionTypes.FETCH_ARTICLE_ERROR;
  payload: string;
}

export type ArticleActions = FetchArticleAction | FetchArticleSuccessAction | FetchArticleErrorAction;
