import {
  IArticlesState,
  IArticle,
  SetArticleAction,
  SetArticlesAction,
  SetCurrentPageAction,
} from '../../types/interfaces';

import ActionTypes from '../../types/actionTypes';

type TAction = SetArticlesAction | SetArticleAction | SetCurrentPageAction;

export default function articles(
  state: IArticlesState = { articleList: [], currentPage: 1, currentArticle: {} as IArticle },
  action: TAction,
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
