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
}

export interface IArticleListProps extends IArticleList {
  setArticles: (payload: IArticle[]) => { type: ActionTypes.SET_ARTICLES; payload: IArticle[] };
  // setCurrentPage: (payload: number) => { type: ActionTypes.SET_CURRENT_PAGE; payload: number };
}

export interface IState {
  articles: IArticleList;
}
