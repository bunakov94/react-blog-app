import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import ReactMarkdown from 'react-markdown';
import button from '../../layout/Header/Header.module.scss';
import style from './Article.module.scss';
import { ArticleActionTypes, IArticle } from '../../../types/article';
import Delete from '../PopUp/PopUp';
import blogApi from '../../../helpers/BlogApi';
import { getUserToken } from '../../../helpers/localStorage';
import useTypeSelector from '../../../hooks/useTypeSelector';
import { favoriteArticleInList } from '../../../store/action-creators/articles';

interface ArticleProps extends IArticle {
  isFullArticle?: boolean;
}

const Article: React.FC<ArticleProps> = ({
  title,
  favoritesCount,
  favorited,
  tagList,
  author,
  createdAt,
  description,
  body,
  slug,
  isFullArticle,
}: ArticleProps) => {
  const { articles } = useTypeSelector((state) => state.articles);
  const url = `articles/${slug}`;
  const editUrl = `${slug}/edit`;
  const token = getUserToken();
  const dispatch = useDispatch();
  const handleFavorite = async () => {
    if (!token) return;
    const { article } = favorited
      ? await blogApi.unfavoriteArticle(token, slug)
      : await blogApi.favoriteArticle(token, slug);
    dispatch({ type: ArticleActionTypes.FETCH_ARTICLE_SUCCESS, payload: article });
    if (!isFullArticle) {
      dispatch(favoriteArticleInList(slug, articles, favorited));
    }
  };

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
              <button
                type="button"
                className={cn(style.like, { [style.favorited]: favorited })}
                onClick={handleFavorite}
              >
                <span className={style.count}>{favoritesCount}</span>
              </button>
            </div>
            {!!tagList?.length && (
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
              <p className={style.authorName}>{author?.username}</p>
              <p className={style.date}>{createdAt && format(new Date(createdAt), 'MMMM d, y')}</p>
            </div>
            <img
              className={style.authorAvatar}
              src={
                author?.image
                  ? author.image
                  : 'data:image/jpeg;base64,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'
              }
              alt="Avatar"
            />
          </div>
        </header>
        <div className={style.descriptionBlock}>
          <div className={style.articleDescription}>{description}</div>
          {isFullArticle && (
            <div className={style.buttons}>
              <Delete slug={slug} />
              <Link to={editUrl} className={`${button.button} ${style.edit}`}>
                Edit
              </Link>
            </div>
          )}
        </div>
        {isFullArticle && <ReactMarkdown className={style.articleBody}>{body}</ReactMarkdown>}
      </article>
    </div>
  );
};

Article.defaultProps = {
  isFullArticle: false,
};

export default Article;
