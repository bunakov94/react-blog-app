import { IArticlesState } from '../../types/interfaces';
import ActionTypes from '../actionTypes';

const curA = {
  author: {
    bio: 'null | string',
    following: false,
    image: 'string',
    username: 'string',
  },

  body: 'string',
  createdAt: '2021-03-04T04:52:23.081Z',
  description: 'string',
  favorited: false,
  favoritesCount: 1,
  slug: 'string',
  tagList: [],
  title: 'string',
  updatedAt: '2021-03-04T04:52:23.081Z',
};

// TODO: Payload
interface IAction {
  type: string;
  payload: any;
}

export default function articles(
  state: IArticlesState = { articleList: [], currentPage: 1, currentArticle: curA },
  action: IAction,
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
