import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import blogApi from '../../../helpers/BlogApi';
import * as actions from '../../../redux/actions/articles';
import { IArticle, IState } from '../../../types/interfaces';
import ArticleListItem from '../../blocks/ArticleListItem';
import style from './ArticleList.module.scss';
import Error from '../../blocks/Error';
import Spinner from '../../blocks/Spinner';

interface IArticleListProps {
  articleList: IArticle[];
  currentPage: number;
  setArticles: (payload: IArticle[]) => void;
  setCurrentPage: (payload: number) => void;
}

const ArticleList = ({ setArticles, setCurrentPage, articleList, currentPage }: IArticleListProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setArticles(await blogApi.getPostsPage(currentPage));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }, [setArticles, currentPage]);

  const articles = (
    <>
      <ul className={style.ArticleList}>
        {articleList.map((article: IArticle) => (
          <li key={`${article.slug} ${article.createdAt}`} className={style.article}>
            <ArticleListItem article={article} />
          </li>
        ))}
      </ul>
      <div className={style.pagination}>
        <Pagination
          current={currentPage}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
          total={500}
        />
      </div>
    </>
  );

  const content = isError ? <Error /> : articles;

  return <>{isLoading ? <Spinner /> : content}</>;
};

const mapStateToProps = (state: IState) => ({
  articleList: state.articles.articleList,
  currentPage: state.articles.currentPage,
});

export default connect(mapStateToProps, actions)(ArticleList);
