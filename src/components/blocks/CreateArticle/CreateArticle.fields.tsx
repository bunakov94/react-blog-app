import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { IFormElementsProps } from '../Form/interfaces';
import style from '../Form/Form.module.scss';
import styles from './CreateArticle.module.scss';

interface TitleProps extends IFormElementsProps {
  value?: string;
}
// TODO: Errors names!!!
const Title: FC<TitleProps> = ({ register, errors, value }: TitleProps) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (value) setInputValue(value);
  }, [value]);

  return (
    <>
      <label className={style.formItem}>
        Title
        <input
          type="text"
          onChange={(event) => setInputValue(event.target.value)}
          className={cn(`${style.formInput}`, { [style.error]: errors.title })}
          placeholder="Title"
          ref={register({
            required: 'Required',
          })}
          name="title"
          value={inputValue}
        />
      </label>
      {errors.title?.message && <p className={style.errorMessage}>{errors?.title?.message}</p>}
    </>
  );
};

Title.defaultProps = {
  value: '',
};

interface ShortDescriptionProps extends IFormElementsProps {
  value?: string;
}

const ShortDescription: FC<ShortDescriptionProps> = ({ register, errors, value }: ShortDescriptionProps) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (value) setInputValue(value);
  }, [value]);

  return (
    <>
      <label className={style.formItem}>
        Short description
        <input
          type="text"
          onChange={(event) => setInputValue(event.target.value)}
          className={cn(`${style.formInput}`, { [style.error]: errors.description })}
          placeholder="Short description"
          ref={register({
            required: 'Required',
          })}
          name="description"
          value={inputValue}
        />
      </label>
      {errors.description?.message && <p className={style.errorMessage}>{errors?.description?.message}</p>}
    </>
  );
};

ShortDescription.defaultProps = {
  value: '',
};

interface TextAreaProps extends IFormElementsProps {
  value?: string;
}

const TextArea: FC<TextAreaProps> = ({ register, errors, value }: TextAreaProps) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (value) setInputValue(value);
  }, [value]);

  return (
    <>
      <label className={style.formItem}>
        Text
        <textarea
          onChange={(event) => setInputValue(event.target.value)}
          className={cn(`${style.formInput}`, { [style.error]: errors.body })}
          placeholder="Text"
          ref={register({
            required: 'Required',
          })}
          name="body"
          value={inputValue}
        />
      </label>
      {errors.body?.message && <p className={style.errorMessage}>{errors?.body?.message}</p>}
    </>
  );
};

TextArea.defaultProps = {
  value: '',
};

type FormTagsProps = {
  tags: Map<string, string>;
  add: () => void;
  remove: (key: string) => void;
  edit: (key: string, tag: string) => void;
};

const FormTags = ({ tags, add, remove, edit }: FormTagsProps) => {
  const tagsNodes = [...tags.entries()].map(([key, tag]) => (
    <div className={styles.tag} key={key}>
      <input
        className={styles.input}
        value={tag}
        onChange={(event) => {
          edit(key, event.target.value);
        }}
        placeholder="Tag"
      />
      <button
        type="button"
        onClick={() => {
          remove(key);
        }}
      >
        Delete
      </button>
    </div>
  ));

  return (
    <div className={styles.root}>
      <p className={styles.labels}>Tags</p>
      <div className={styles.inputs}>
        <div className={styles.tags}>{tagsNodes}</div>
        <button
          className={styles.button}
          type="button"
          onClick={() => {
            add();
          }}
        >
          add
        </button>
      </div>
    </div>
  );
};

export { Title, ShortDescription, TextArea, FormTags };
