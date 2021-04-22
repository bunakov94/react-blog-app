import { ArticleActions, ArticleActionTypes, ArticleState } from '../../types/article';
import { IArticle } from '../../types/interfaces';

const initialState: ArticleState = {
  article: {} as IArticle,
  loading: false,
  error: null,
};

const articleReducer = (state = initialState, action: ArticleActions): ArticleState => {
  switch (action.type) {
    case ArticleActionTypes.FETCH_ARTICLE:
      return { ...state, loading: true };
    case ArticleActionTypes.FETCH_ARTICLE_SUCCESS:
      return { ...state, article: action.payload, loading: false };
    case ArticleActionTypes.FETCH_ARTICLE_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default articleReducer;
