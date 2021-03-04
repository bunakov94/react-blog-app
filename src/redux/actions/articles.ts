import { IArticle } from '../../types/interfaces';
import ActionTypes from '../actionTypes';

export const setArticles = (payload: IArticle[]) => ({ type: ActionTypes.SET_ARTICLES, payload });
export const setCurrentPage = (payload: number) => ({ type: ActionTypes.SET_CURRENT_PAGE, payload });
export const setCurrentArticle = (payload: IArticle) => ({ type: ActionTypes.SET_CURRENT_ARTICLE, payload });
