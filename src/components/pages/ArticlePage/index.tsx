import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Spinner from '../../blocks/Spinner';
import Errors from '../../blocks/Errors/Errors';
import Article from '../../blocks/Article';
import fetchArticle from '../../../store/action-creators/article';
import useTypeSelector from '../../../hooks/useTypeSelector';

interface SingleArticlePageProps {
  slug: string;
}

const ArticlePage: FC<SingleArticlePageProps> = ({ slug }: SingleArticlePageProps) => {
  const { article, loading, error } = useTypeSelector((state) => state.article);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticle(slug));
  }, [slug, dispatch]);

  const content = error ? <Errors text={error} /> : <Article {...article} isFullArticle />;

  return <>{loading ? <Spinner /> : content}</>;
};

export default ArticlePage;
