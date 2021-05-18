import { Dispatch } from 'redux';
import { ArticlesAction, ArticlesActionTypes } from '../../types/articles';
import blogApi from '../../helpers/BlogApi';
import { getUserToken } from '../../helpers/localStorage';
import { IArticle } from '../../types/article';

const token = getUserToken() || '';

export const fetchArticles = (page: number) => async (dispatch: Dispatch<ArticlesAction>) => {
  try {
    dispatch({ type: ArticlesActionTypes.FETCH_ARTICLES });
    const articles = await blogApi.getArticlesPage(page, token);
    dispatch({ type: ArticlesActionTypes.FETCH_ARTICLES_SUCCESS, payload: articles });
  } catch (error) {
    dispatch({ type: ArticlesActionTypes.FETCH_ARTICLES_ERROR, payload: error.message });
  }
};

// eslint-disable-next-line consistent-return
export const favoriteArticleInList = (slug: string, articles: IArticle[], favorited: boolean) => async (
  dispatch: Dispatch<ArticlesAction>,
  // eslint-disable-next-line consistent-return
) => {
  try {
    const articleIndex = articles.findIndex((item) => item.slug === slug);
    if (articleIndex === -1) return articles;
    const newArticles = [...articles];
    newArticles[articleIndex].favorited = !favorited;
    newArticles[articleIndex].favoritesCount = favorited
      ? newArticles[articleIndex].favoritesCount - 1
      : newArticles[articleIndex].favoritesCount + 1;
    dispatch({ type: ArticlesActionTypes.FETCH_ARTICLES_SUCCESS, payload: newArticles });
  } catch (error) {
    dispatch({ type: ArticlesActionTypes.FETCH_ARTICLES_ERROR, payload: error.message });
  }
};

export const setArticlesPage = (page: number) => async (dispatch: Dispatch<ArticlesAction>) => {
  dispatch({ type: ArticlesActionTypes.SET_ARTICLES_PAGE, payload: page });
};
