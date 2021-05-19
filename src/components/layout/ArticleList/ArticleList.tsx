import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Pagination } from 'antd';
import style from './ArticleList.module.scss';
import Errors from '../../blocks/Errors/Errors';
import Spinner from '../../blocks/Spinner';
import { fetchArticles, setArticlesPage } from '../../../store/action-creators/articles';
import useTypeSelector from '../../../hooks/useTypeSelector';
import Article from '../../blocks/Article';

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
            <Article {...article} />
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

  const content = error ? <Errors text={error} /> : articlesList;

  return <>{loading ? <Spinner /> : content}</>;
};

export default ArticleList;
