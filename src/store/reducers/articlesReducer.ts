import { ArticlesAction, ArticlesActionTypes, ArticlesState } from '../../types/articles';

const initialState: ArticlesState = {
  articles: [],
  page: 1,
  loading: false,
  error: null,
};

const articlesReducer = (state = initialState, action: ArticlesAction): ArticlesState => {
  switch (action.type) {
    case ArticlesActionTypes.FETCH_ARTICLES:
      return { ...state, loading: true, error: null };
    case ArticlesActionTypes.FETCH_ARTICLES_SUCCESS:
      return { ...state, articles: action.payload, loading: false, error: null };
    case ArticlesActionTypes.FETCH_ARTICLES_ERROR:
      return { ...state, loading: false, error: action.payload };
    case ArticlesActionTypes.SET_ARTICLES_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};

export default articlesReducer;
