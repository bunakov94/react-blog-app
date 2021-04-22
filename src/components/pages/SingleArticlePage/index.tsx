import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Spinner from '../../blocks/Spinner';
import ErrorComponent from '../../blocks/ErrorComponent/ErrorComponent';
import Article from '../../layout/Article';
import fetchArticle from '../../../store/action-creators/article';
import useTypeSelector from '../../../hooks/useTypeSelector';

interface SingleArticlePageProps {
  slug: string;
}

const SingleArticlePage: FC<SingleArticlePageProps> = ({ slug }: SingleArticlePageProps) => {
  const { article, loading, error } = useTypeSelector((state) => state.article);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticle(slug));
  }, [slug, dispatch]);

  const content = error ? <ErrorComponent text={error} /> : <Article {...article} isFullArticle />;

  return <>{loading ? <Spinner /> : content}</>;
};

export default SingleArticlePage;
