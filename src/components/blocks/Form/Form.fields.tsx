import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import style from './Form.module.scss';
import {
  IAcceptTermsProps,
  IAvatarProps,
  IConfirmPasswordProps,
  IEmailProps,
  IPasswordProps,
  IUserNameProps,
} from './interfaces';

const Username: FC<IUserNameProps> = ({ register, errors, serverErrors, value }: IUserNameProps) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (value) setInputValue(value);
  }, [value]);

  return (
    <>
      <label className={style.formItem}>
        Username
        <input
          onChange={(event) => setInputValue(event.target.value)}
          type="text"
          className={cn(
            `${style.formInput}`,
            { [style.error]: errors.username },
            { [style.error]: serverErrors?.username },
          )}
          placeholder="Username"
          ref={register({
            required: 'You must specify a username',
            minLength: {
              value: 3,
              message: 'Username must have at least 3 characters',
            },
            maxLength: {
              value: 20,
              message: 'Username must have not more then 20 characters',
            },
          })}
          name="username"
          value={inputValue}
        />
      </label>
      {errors.username?.message && <p className={style.errorMessage}>{errors.username?.message}</p>}
      {serverErrors.username && <p className={style.errorMessage}>{serverErrors.username}</p>}
    </>
  );
};

Username.defaultProps = {
  value: '',
};

const Email: FC<IEmailProps> = ({ register, errors, serverErrors, value }: IEmailProps) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (value) setInputValue(value);
  }, [value]);

  return (
    <>
      <label className={style.formItem}>
        Email address
        <input
          type="text"
          onChange={(event) => setInputValue(event.target.value)}
          className={cn(`${style.formInput}`, { [style.error]: errors.email }, { [style.error]: serverErrors.email })}
          placeholder="Email address"
          ref={register({
            required: 'Required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'invalid email address',
            },
          })}
          name="email"
          value={inputValue}
        />
      </label>
      {errors.email?.message && <p className={style.errorMessage}>{errors?.email?.message}</p>}
      {serverErrors.email && <p className={style.errorMessage}>{serverErrors.email}</p>}
    </>
  );
};

Email.defaultProps = {
  value: '',
};

const Password: FC<IPasswordProps> = ({ register, errors, serverErrors }: IPasswordProps) => (
  <>
    <label className={style.formItem}>
      Password
      <input
        name="password"
        type="password"
        placeholder="Password"
        className={cn(
          `${style.formInput}`,
          { [style.error]: errors.password },
          { [style.error]: serverErrors.password },
        )}
        ref={register({
          required: 'You must specify a password',
          minLength: {
            value: 8,
            message: 'Password must have at least 8 characters',
          },
          maxLength: {
            value: 40,
            message: 'Password must have not more then 40 characters',
          },
        })}
      />
    </label>
    {errors.password?.message && <p className={style.errorMessage}>{errors.password?.message}</p>}
    {serverErrors.password && <p className={style.errorMessage}>{serverErrors.password}</p>}
  </>
);

const ConfirmPassword: FC<IConfirmPasswordProps> = ({ register, errors, password }: IConfirmPasswordProps) => (
  <>
    <label className={style.formItem}>
      Repeat Password
      <input
        name="password_repeat"
        type="password"
        placeholder="Password"
        className={cn(`${style.formInput}`, { [style.error]: errors.password_repeat })}
        ref={register({
          validate: (value: string) => value === password.current || 'The passwords do not match',
        })}
      />
    </label>
    {errors.password_repeat?.message && <p className={style.errorMessage}>{errors.password_repeat?.message}</p>}
  </>
);

const AcceptTerm: FC<IAcceptTermsProps> = ({ register, errors }: IAcceptTermsProps) => (
  <>
    <label className={style.input}>
      <input
        className={style.inputInput}
        type="checkbox"
        ref={register({ validate: (value: boolean) => value || 'Field is required' })}
        name="acceptTerms"
      />
      <span className={cn(`${style.inputCheckmark}`, { [style.error]: errors.acceptTerms })} />
      <span className={style.inputLabel}>I agree to the processing of my personal information</span>
    </label>
    {errors.acceptTerms?.message && <p className={style.errorMessage}>{errors.acceptTerms?.message}</p>}
  </>
);

const Avatar: FC<IAvatarProps> = ({ register, errors }: IAvatarProps) => (
  <>
    <label className={style.formItem}>
      Avatar
      <input
        type="text"
        className={cn(`${style.formInput}`, { [style.error]: errors.avatar })}
        placeholder="Avatar Image"
        name="avatar"
        ref={register({
          pattern: {
            value: /^(ftp|http|https):\/\/[^ "]+$/,
            message: 'invalid avatar url',
          },
        })}
      />
    </label>
    {errors.avatar?.message && <p className={style.errorMessage}>{errors.avatar?.message}</p>}
  </>
);

export { Username, Password, ConfirmPassword, Avatar, AcceptTerm, Email };
