import { Dispatch } from 'redux';
import { ArticlesAction, ArticlesActionTypes } from '../../types/articles';
import blogApi from '../../helpers/BlogApi';

export const fetchArticles = (page: number) => async (dispatch: Dispatch<ArticlesAction>) => {
  try {
    dispatch({ type: ArticlesActionTypes.FETCH_ARTICLES });
    const response = await blogApi.getPostsPage(page);
    dispatch({ type: ArticlesActionTypes.FETCH_ARTICLES_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: ArticlesActionTypes.FETCH_ARTICLES_ERROR, payload: error.message });
  }
};

export const setArticlesPage = (page: number) => async (dispatch: Dispatch<ArticlesAction>) => {
  dispatch({ type: ArticlesActionTypes.SET_ARTICLES_PAGE, payload: page });
};
