import { Dispatch } from 'redux';
import { ArticleActions, ArticleActionTypes } from '../../types/article';
import blogApi from '../../helpers/BlogApi';

const fetchArticle = (slug: string) => async (dispatch: Dispatch<ArticleActions>) => {
  try {
    dispatch({ type: ArticleActionTypes.FETCH_ARTICLE });
    const response = await blogApi.getPost(slug);
    dispatch({ type: ArticleActionTypes.FETCH_ARTICLE_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: ArticleActionTypes.FETCH_ARTICLE_ERROR, payload: error.message });
  }
};

export default fetchArticle;
