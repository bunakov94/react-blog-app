import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import style from './ArticleListItem.module.scss';

const ArticleListItem = ({ article }: any) => {
  const { title, favoritesCount, tagList, author, createdAt, description, slug } = article;
  const url = `articles/${slug}`;

  return (
    <article className={style.article}>
      <header className={style.articleHeader}>
        <div className={style.articleInfo}>
          <div className={style.title}>
            <h2 className={style.titleDescription}>
              <Link to={url}>{title}</Link>
            </h2>
            <button type="button" className={style.like}>
              <span className={style.count}>{favoritesCount}</span>
            </button>
          </div>
          {!!tagList.length && (
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
            <p className={style.authorName}>{author.username}</p>
            <p className={style.date}>{format(new Date(createdAt), 'MMMM d, y')}</p>
          </div>
          <img className={style.authorAvatar} src={author.image} alt="Avatar" />
        </div>
      </header>
      <footer className={style.articleFooter}>{description}</footer>
    </article>
  );
};

export default ArticleListItem;
