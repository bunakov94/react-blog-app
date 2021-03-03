import { IArticleList } from '../../types/interfaces';
import ActionTypes from '../actionTypes';

export default function articles(
  state: IArticleList = { articleList: [], currentPage: 1, currentArticle: {} },
  action: { type: string; payload: any },
) {
  switch (action.type) {
    case ActionTypes.SET_ARTICLES:
      return { ...state, articleList: [...action.payload] };
    case ActionTypes.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case ActionTypes.SET_CURRENT_ARTICLE:
      return { ...state, currentArticle: { ...action.payload } };

    default:
      return state;
  }
}
