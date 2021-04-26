import React, { FC, useState } from 'react';
import { Spin } from 'antd';
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import styles from './CreateArticle.module.scss';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import { FormTags, ShortDescription, TextArea, Title } from './CreateArticle.fields';
import style from '../Form/Form.module.scss';

interface ArticleFormProps {
  isLoading: boolean;
  error: any;
  onSubmit: any;
  article?: any;
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
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      title: article?.title || '',
      description: article?.description || '',
      body: article?.body || '',
      tagList: article.tagList || ['fsdf'],
    },
  });
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

  const submit = (submitArticle: any) => {
    const newArticle = { ...submitArticle };
    const filteredTags = [...tags.values()].filter((tag) => !!tag);
    const uniqTags = new Set([...filteredTags]);
    newArticle.tagList = [...uniqTags];
    onSubmit(newArticle);
    console.log(newArticle);
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
  article: null,
};

export default ArticleForm;
