import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Spinner from '../../blocks/Spinner';
import Error from '../../blocks/Error';
import Article from '../../layout/Article';
import fetchArticle from '../../../store/action-creators/article';
import useTypeSelector from '../../../hooks/useTypeSelector';

interface IProps {
  slug: string;
}

const SingleArticlePage: React.FC<IProps> = ({ slug }: IProps) => {
  const { article, loading, error } = useTypeSelector((state) => state.article);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticle(slug));
  }, [slug, dispatch]);

  const content = error ? <Error text={error} /> : <Article {...article} isFullArticle />;

  return <>{loading ? <Spinner /> : content}</>;
};

export default SingleArticlePage;
