import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Spin, Alert } from 'antd';
import { format } from 'date-fns';
import * as actions from '../../../redux/actions/articles';
import blogApi from '../../../helpers/BlogApi';
import style from './Article.module.scss';
import { IState } from '../../../types/interfaces';

const Article = ({ setCurrentArticle, currentArticle, slug }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { title, favoritesCount, tagList, author, createdAt, description, body } = currentArticle;

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setCurrentArticle(await blogApi.getPost(slug));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }, [slug, setCurrentArticle]);

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

  const article = (
    <div className={style.container}>
      <article className={style.article}>
        <header className={style.articleHeader}>
          <div className={style.articleInfo}>
            <div className={style.title}>
              <h2 className={style.titleDescription}>{title}</h2>
              <button type="button" className={style.like}>
                <span className={style.count}>{favoritesCount}</span>
              </button>
            </div>
            {tagList !== undefined && !!tagList.length && (
              <ul className={style.articleTags}>
                {tagList.map((tag: string) => (
                  <li className={style.tag} key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={style.author}>
            <div className={style.authorInfo}>
              <p className={style.authorName}>{author && author.username}</p>
              <p className={style.date}>{createdAt && format(new Date(createdAt), 'MMMM d, y')}</p>
            </div>
            <img className={style.authorAvatar} src={author && author.image} alt="Avatar" />
          </div>
        </header>
        <footer className={style.articleFooter}>{description}</footer>
        <div className={style.body}>{body}</div>
      </article>
    </div>
  );

  const content = isError ? error : article;

  return <>{isLoading ? spinner : content}</>;
};

const mapStateToProps = (state: IState) => ({
  currentArticle: state.articles.currentArticle,
});

export default connect(mapStateToProps, actions)(Article);
