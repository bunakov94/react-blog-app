import { Dispatch } from 'redux';
import { ArticleActions, ArticleActionTypes } from '../../types/article';
import blogApi from '../../helpers/BlogApi';
import { getUserToken } from '../../helpers/localStorage';

const token = getUserToken() || '';

const fetchArticle = (slug: string) => async (dispatch: Dispatch<ArticleActions>) => {
  try {
    dispatch({ type: ArticleActionTypes.FETCH_ARTICLE });
    const response = await blogApi.getArticle(slug, token);
    dispatch({ type: ArticleActionTypes.FETCH_ARTICLE_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: ArticleActionTypes.FETCH_ARTICLE_ERROR, payload: error.message });
  }
};

export default fetchArticle;
