import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import blogApi from '../../../helpers/BlogApi';
import { getUserToken } from '../../../helpers/localStorage';
import CreateArticleForm from '../../blocks/CreateArticleForm/CreateArticleForm';
import { ICreateArticle } from '../../../types/article';

const Index: FC = () => {
  const history = useHistory();
  const token = getUserToken();
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: ICreateArticle) => {
    try {
      if (!token) return;
      setLoading(true);
      const {
        article: { slug },
      } = await blogApi.createArticle(token, data);
      const url = `articles/${slug}`;
      setLoading(false);
      history.push(url);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return <CreateArticleForm error={error} isLoading={isLoading} onSubmit={onSubmit} />;
};

export default Index;
