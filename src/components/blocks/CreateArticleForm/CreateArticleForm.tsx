import React, { FC, useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { FormTags, ShortDescription, TextArea, Title } from './CreateArticleForm.fields';
import { IArticle } from '../../../types/article';
import Errors from '../Errors/Errors';
import styles from './CreateArticleForm.module.scss';
import style from '../Form/Form.module.scss';

interface ArticleFormProps {
  isLoading: boolean;
  error: string | null;
  onSubmit: (data: IArticle) => Promise<void>;
  article?: IArticle;
}

const CreateArticleForm: FC<ArticleFormProps> = ({ isLoading, error, onSubmit, article }: ArticleFormProps) => {
  const makeTagsMap = (tagsArr: string[]) => {
    const tagsObj = {} as { [key: string]: string };
    tagsArr.forEach((tag) => {
      const id: string = nanoid();
      tagsObj[id] = tag;
    });
    return tagsObj;
  };

  const [tags, setTags] = useState(makeTagsMap(article?.tagList || []));

  useEffect(() => {
    setTags(makeTagsMap(article?.tagList || []));
  }, [setTags, article?.tagList]);

  const { register, handleSubmit, errors } = useForm({});

  const addTag = () => {
    setTags((oldTags) => ({ ...oldTags, [nanoid()]: '' }));
  };

  const removeTag = (key: string) => {
    setTags((oldTags) => {
      const newTags = { ...oldTags };
      delete newTags[key];
      return newTags;
    });
  };

  const editTag = (key: string, tag: string) => {
    setTags((oldTags) => {
      const newTags = { ...oldTags };
      newTags[key] = tag;
      return newTags;
    });
  };

  const submit = (submitArticle: IArticle) => {
    const newArticle = { ...submitArticle };
    const filteredTags = Object.values(tags).filter((tag) => !!tag);
    const uniqTags = Object.values(filteredTags);
    newArticle.tagList = [...uniqTags];
    onSubmit(newArticle).then(() => makeTagsMap(newArticle.tagList));
  };

  if (isLoading) {
    return (
      <div className={styles.spin}>
        <Spin />
      </div>
    );
  }

  if (error) return <Errors text={error} />;

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit(submit)}>
        <h1 className={styles.header}>Create new article</h1>
        <Title errors={errors} register={register} value={article?.title} />
        <ShortDescription register={register} errors={errors} value={article?.description} />
        <TextArea register={register} errors={errors} value={article?.body} />

        <FormTags tags={tags} add={addTag} remove={removeTag} edit={editTag} />

        <button className={style.submit} type="submit">
          Send
        </button>
      </form>
    </>
  );
};

CreateArticleForm.defaultProps = {
  article: undefined,
};

export default CreateArticleForm;
