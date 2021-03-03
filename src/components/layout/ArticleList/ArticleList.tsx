import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import blogApi from '../../../helpers/BlogApi';
import * as actions from '../../../redux/actions/articles';
import { IArticle, IState, IArticleListProps } from '../../../types/interfaces';
import Article from '../../blocks/Article';
import style from './ArticleList.module.scss';

const ArticleList = ({ setArticles, articleList, currentPage }: IArticleListProps) => {
  useEffect(() => {
    (async () => {
      setArticles(await blogApi.getPostsPage(currentPage));
    })();
  }, [setArticles, currentPage]);

  console.log(setArticles);

  return (
    <>
      <ul className={style.ArticleList}>
        {articleList.map((article: IArticle) => (
          <li key={`${article.slug} ${article.createdAt}`} className={style.article}>
            <Article article={article} />
          </li>
        ))}
      </ul>
      <div className={style.pagination}>
        <Pagination current={currentPage} onChange={() => {}} total={50} />
      </div>
    </>
  );
};

const mapStateToProps = (state: IState) => ({
  articleList: state.articles.articleList,
  currentPage: state.articles.currentPage,
});

export default connect(mapStateToProps, actions)(ArticleList);
