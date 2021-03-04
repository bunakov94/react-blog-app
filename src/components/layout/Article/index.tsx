import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import style from './Article.module.scss';
import { IArticle } from '../../../types/interfaces';

interface IArticleProps extends IArticle {
  isFullArticle?: boolean;
}

const Article = ({
  title,
  favoritesCount,
  tagList,
  author,
  createdAt,
  description,
  body,
  slug,
  isFullArticle,
}: IArticleProps) => {
  const url = `articles/${slug}`;

  return (
    <div className={style.container}>
      <article className={style.article}>
        <header className={style.articleHeader}>
          <div className={style.articleInfo}>
            <div className={style.title}>
              {isFullArticle ? (
                <h2 className={style.titleDescription}>{title}</h2>
              ) : (
                <Link to={url} className={style.titleDescription}>
                  {title}
                </Link>
              )}
              <button type="button" className={style.like}>
                <span className={style.count}>{favoritesCount}</span>
              </button>
            </div>
            {tagList && !!tagList.length && (
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
        {isFullArticle && <div className={style.body}>{body}</div>}
      </article>
    </div>
  );
};

Article.defaultProps = {
  isFullArticle: false,
};

export default Article;
