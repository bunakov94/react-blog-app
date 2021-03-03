import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Pagination, Spin, Alert } from 'antd';
import blogApi from '../../../helpers/BlogApi';
import * as actions from '../../../redux/actions/articles';
import { IArticle, IState, IArticleListProps } from '../../../types/interfaces';
import Article from '../../blocks/ArticleListItem';
import style from './ArticleList.module.scss';

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

  const spinner = (
    <div className={style.spin}>
      <Spin />
    </div>
  );

  const error = (
    <div className={style.error}>
      <Alert message="Error" description="Something went wrong. Try it again." type="error" showIcon />
    </div>
  );

  const articles = (
    <>
      <ul className={style.ArticleList}>
        {articleList.map((article: IArticle) => (
          <li key={`${article.slug} ${article.createdAt}`} className={style.article}>
            <Article article={article} />
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

  const content = isError ? error : articles;

  return <>{isLoading ? spinner : content}</>;
};

const mapStateToProps = (state: IState) => ({
  articleList: state.articles.articleList,
  currentPage: state.articles.currentPage,
});

export default connect(mapStateToProps, actions)(ArticleList);
