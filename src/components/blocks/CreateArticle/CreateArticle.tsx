import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import blogApi from '../../../helpers/BlogApi';
import { getUserToken } from '../../../helpers/localStorage';
import ArticleForm from './ArticleForm';
import { ICreateArticle } from '../../../types/article';

const CreateArticle: FC = () => {
  const history = useHistory();
  const token = getUserToken();
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { register, errors, handleSubmit } = useForm({});

  const onSubmit = async (data: ICreateArticle) => {
    try {
      console.log(data);
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

  return (
    <ArticleForm
      register={register}
      errors={errors}
      error={error}
      isLoading={isLoading}
      onSubmit={handleSubmit(onSubmit)}
      title=""
      description=""
      body=""
    />
  );
};

export default CreateArticle;
