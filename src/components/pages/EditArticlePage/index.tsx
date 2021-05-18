import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Spin } from 'antd';
import styles from '../../blocks/ArticleForm/ArticleForm.module.scss';
import blogApi from '../../../helpers/BlogApi';
import { getUserToken } from '../../../helpers/localStorage';
import Errors from '../../blocks/Errors/Errors';
import useTypeSelector from '../../../hooks/useTypeSelector';
import ArticleForm from '../../blocks/ArticleForm/ArticleForm';
import { IArticle } from '../../../types/article';

interface EditArticleProps {
  slug: string;
}

const Index: FC<EditArticleProps> = ({ slug }: EditArticleProps) => {
  const { article } = useTypeSelector((state) => state.article);
  const history = useHistory();
  const token = getUserToken();
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: IArticle) => {
    try {
      if (!token) return;
      setLoading(true);
      const {
        article: { slug: Slug },
      } = await blogApi.editArticle(token, data, slug);
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

  if (error) return <Errors text={error} />;

  return <ArticleForm onSubmit={onSubmit} error={error} isLoading={isLoading} article={article} />;
};

export default Index;
