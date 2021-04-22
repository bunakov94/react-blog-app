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
