import React, { FC, useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import styles from './CreateArticle.module.scss';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import { FormTags, ShortDescription, TextArea, Title } from './CreateArticle.fields';
import style from '../Form/Form.module.scss';
import { IArticle } from '../../../types/article';

interface ArticleFormProps {
  isLoading: boolean;
  error: string | null;
  onSubmit: Function;
  article?: IArticle;
}

const ArticleForm: FC<ArticleFormProps> = ({ isLoading, error, onSubmit, article }: ArticleFormProps) => {
  const makeTagsMap = (tagsArr: string[]) => {
    const tagsMap = new Map<string, string>();
    tagsArr.forEach((tag) => {
      tagsMap.set(nanoid(), tag);
    });
    return tagsMap;
  };

  const [tags, setTags] = useState<Map<string, string>>(makeTagsMap(article?.tagList || []));

  useEffect(() => {
    setTags(makeTagsMap(article?.tagList || []));
  }, [setTags, article?.tagList]);

  const { register, handleSubmit, errors } = useForm({});

  const addTag = () => {
    setTags((oldTags) => {
      const newTags = new Map([...oldTags]);
      newTags.set(nanoid(), '');
      return newTags;
    });
  };
  const removeTag = (key: string) => {
    setTags((oldTags) => {
      const newTags = new Map([...oldTags]);
      newTags.delete(key);
      return newTags;
    });
  };
  const editTag = (key: string, tag: string) => {
    setTags((oldTags) => {
      const newTags = new Map([...oldTags]);
      newTags.set(key, tag);
      return newTags;
    });
  };

  const submit = (submitArticle: IArticle) => {
    const newArticle = { ...submitArticle };
    const filteredTags = [...tags.values()].filter((tag) => !!tag);
    const uniqTags = new Set([...filteredTags]);
    newArticle.tagList = [...uniqTags];
    onSubmit(newArticle);
    setTags(makeTagsMap(newArticle.tagList));
  };

  if (isLoading) {
    return (
      <div className={styles.spin}>
        <Spin />
      </div>
    );
  }

  if (error) return <ErrorComponent text={error} />;

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

ArticleForm.defaultProps = {
  article: undefined,
};

export default ArticleForm;
