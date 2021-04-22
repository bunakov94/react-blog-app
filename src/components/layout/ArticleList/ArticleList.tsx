import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Pagination } from 'antd';
import ArticleListItem from '../../blocks/ArticleListItem';
import style from './ArticleList.module.scss';
import Error from '../../blocks/Error';
import Spinner from '../../blocks/Spinner';
import { fetchArticles, setArticlesPage } from '../../../store/action-creators/articles';
import useTypeSelector from '../../../hooks/useTypeSelector';

const ArticleList: React.FC = () => {
  const { articles, loading, error, page } = useTypeSelector((state) => state.articles);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchArticles(page));
  }, [dispatch, page]);

  const articlesList = (
    <>
      <ul className={style.ArticleList}>
        {articles.map((article) => (
          <li key={`${article.slug} ${article.createdAt}`} className={style.article}>
            <ArticleListItem article={article} />
          </li>
        ))}
      </ul>
      <div className={style.pagination}>
        <Pagination
          current={page}
          onChange={(currentPage) => dispatch(setArticlesPage(currentPage))}
          showSizeChanger={false}
          total={500}
        />
      </div>
    </>
  );

  const content = error ? <Error text={error} /> : articlesList;

  return <>{loading ? <Spinner /> : content}</>;
};

export default ArticleList;
