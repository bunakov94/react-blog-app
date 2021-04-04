import ActionTypes from './actionTypes';
import { IArticle } from '../../types/interfaces';

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
