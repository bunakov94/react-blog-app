import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Spin } from 'antd';
import { useDispatch } from 'react-redux';
import styles from './CreateArticle.module.scss';
import blogApi from '../../../helpers/BlogApi';
import { getUserToken } from '../../../helpers/localStorage';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import useTypeSelector from '../../../hooks/useTypeSelector';
import fetchArticle from '../../../store/action-creators/article';
import ArticleForm from './ArticleForm';
import { IArticle } from '../../../types/article';

interface EditArticleProps {
  slug: string;
}

const EditArticle: FC<EditArticleProps> = ({ slug }: EditArticleProps) => {
  const dispatch = useDispatch();
  const { article } = useTypeSelector((state) => state.article);
  const history = useHistory();
  const token = getUserToken();
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      dispatch(fetchArticle(slug));
    })();
  }, [dispatch, slug]);

  const onSubmit = async (data: IArticle) => {
    try {
      if (!token) return;
      setLoading(true);
      const {
        article: { slug: Slug },
      } = await blogApi.createArticle(token, data);
      const url = `articles/${Slug}`;
      setLoading(false);
      history.push(`/${url}`);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.spin}>
        <Spin />
      </div>
    );
  }

  if (error) return <ErrorComponent text={error} />;

  return <ArticleForm onSubmit={onSubmit} error={error} isLoading={isLoading} article={article} />;
};

export default EditArticle;
