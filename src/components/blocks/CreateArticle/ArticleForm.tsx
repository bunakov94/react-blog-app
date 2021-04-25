import React, { FC } from 'react';
import { Spin } from 'antd';
import styles from './CreateArticle.module.scss';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import { ShortDescription, TextArea, Title } from './CreateArticle.fields';
import style from '../Form/Form.module.scss';

interface ArticleFormProps {
  isLoading: boolean;
  error: any;
  errors: any;
  register: any;
  onSubmit: Function;
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}

const ArticleForm: FC<ArticleFormProps> = ({
  isLoading,
  error,
  errors,
  register,
  onSubmit,
  title,
  description,
  body,
  tagList,
}: ArticleFormProps) => {
  console.log(tagList);
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
      <form className={styles.container} onSubmit={() => onSubmit()}>
        <Title errors={errors} register={register} value={title} />
        <ShortDescription register={register} errors={errors} value={description} />
        <TextArea register={register} errors={errors} value={body} />

        <button className={style.submit} type="submit">
          Send
        </button>
      </form>
    </>
  );
};

ArticleForm.defaultProps = {
  tagList: [],
};

export default ArticleForm;
