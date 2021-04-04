import { IArticle } from '../../types/interfaces';
import { SetCurrentPageAction, SetArticlesAction, SetArticleAction } from '../types/types';
import ActionTypes from '../types/actionTypes';

export const setArticles = (payload: IArticle[]): SetArticlesAction => ({
  type: ActionTypes.SET_ARTICLES,
  payload,
});
export const setCurrentPage = (payload: number): SetCurrentPageAction => ({
  type: ActionTypes.SET_CURRENT_PAGE,
  payload,
});
export const setCurrentArticle = (payload: IArticle): SetArticleAction => ({
  type: ActionTypes.SET_CURRENT_ARTICLE,
  payload,
});
