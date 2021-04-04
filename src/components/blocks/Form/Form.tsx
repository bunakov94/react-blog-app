import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import cn from 'classnames';
import { connect } from 'react-redux';
import blogAPI from '../../../helpers/BlogApi';
import * as actions from '../../../redux/actions/user';
import { setUserToken } from '../../../helpers/localStorage';

import style from './Form.module.scss';
import { IState } from '../../../types/interfaces';
import { IUser } from '../../../redux/reducers/user';

interface IFormInput {
  username: string;
  email: string;
  password: string;
  avatar: string;
  token: string;
}

const Username = ({ register, errors, serverErrors, hasError, value }: any) => {
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
            { [style.error]: serverErrors.username },
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
      {errors.username && <p className={style.errorMessage}>{errors.username.message}</p>}
      {hasError && serverErrors.username && serverErrors.username && (
        <p className={style.errorMessage}>{serverErrors.username[0]}</p>
      )}
    </>
  );
};

const Email = ({ register, errors, serverErrors, hasError, value }: any) => {
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
      {errors.email && <p className={style.errorMessage}>{errors.email.message}</p>}
      {hasError && serverErrors.email && <p className={style.errorMessage}>{serverErrors.email[0]}</p>}
    </>
  );
};

const Password = ({ register, errors, serverErrors, hasError }: any) => (
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
    {errors.password && <p className={style.errorMessage}>{errors.password.message}</p>}
    {hasError && serverErrors.password && <p className={style.errorMessage}>{serverErrors.password[0]}</p>}
  </>
);

const ConfirmPassword = ({ register, errors, password }: any) => (
  <>
    <label className={style.formItem}>
      Repeat Password
      <input
        name="password_repeat"
        type="password"
        placeholder="Password"
        className={cn(`${style.formInput}`, { [style.error]: errors.password_repeat })}
        ref={register({
          validate: (value: any) => value === password.current || 'The passwords do not match',
        })}
      />
    </label>
    {errors.password_repeat && <p className={style.errorMessage}>{errors.password_repeat.message}</p>}
  </>
);

const AcceptTerm = ({ register, errors }: any) => (
  <>
    <label className={style.input}>
      <input
        className={style.inputInput}
        type="checkbox"
        ref={register({ validate: (value: any) => value === true || 'Field is required' })}
        name="acceptTerms"
      />
      <span className={cn(`${style.inputCheckmark}`, { [style.error]: errors.acceptTerms })} />
      <span className={style.inputLabel}>I agree to the processing of my personal information</span>
    </label>
    {errors.acceptTerms && <p className={style.errorMessage}>{errors.acceptTerms.message}</p>}
  </>
);

const Avatar = ({ register, errors }: any) => (
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
    {errors.avatar && <p className={style.errorMessage}>{errors.avatar.message}</p>}
  </>
);

interface IProps {
  type?: string;
  setUser: Function;
  userData: IUser;
}

const Form = ({ type, setUser, userData }: IProps) => {
  const history = useHistory();
  const [serverErrors, setServerErrors] = useState({});
  const [hasError, setHasError] = useState(false);
  const { register, errors, handleSubmit, watch } = useForm({});
  const password = useRef({});
  password.current = watch('password', '');

  const onRegistration = async (data: IFormInput) => {
    try {
      const res = await blogAPI.registration(data.username, data.email, data.password);
      if (res.errors) {
        setHasError(true);
        setServerErrors(res.errors);
      }
      const { user } = res;
      setUserToken(user.token);
      setUser({ ...user });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  const onLogin = async (data: IFormInput) => {
    try {
      const res = await blogAPI.login(data.email, data.password);
      if (res.errors) {
        setHasError(true);
        setServerErrors({ password: ['Email or password invalid'], email: ['Email or password invalid'] });
      }
      const { user } = res;
      setUserToken(user.token);
      setUser({ ...user });
      history.push('/');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  const onEdit = async (data: IFormInput) => {
    try {
      const res = await blogAPI.edit(data.email, data.password, data.username, data.avatar, userData.token);
      if (res.errors) {
        setHasError(true);
        setServerErrors(res.errors);
      }
      const { user } = res;
      setUser({ ...user });
      setUserToken(user.token);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  if (type === 'login') {
    return (
      <form className={style.form} onSubmit={(event) => event.preventDefault()}>
        <h1 className={style.formTitle}>Sign In</h1>
        <Email register={register} errors={errors} serverErrors={serverErrors} hasError={hasError} />
        <Password register={register} errors={errors} serverErrors={serverErrors} hasError={hasError} />

        <button className={style.submit} type="submit" onClick={handleSubmit(onLogin)}>
          Login
        </button>
      </form>
    );
  }

  if (type === 'edit') {
    return (
      <form className={style.form} onSubmit={(event) => event.preventDefault()}>
        <h1 className={style.formTitle}>Edit Profile</h1>
        <Username
          register={register}
          errors={errors}
          serverErrors={serverErrors}
          hasError={hasError}
          value={userData.username}
        />
        <Email
          register={register}
          errors={errors}
          serverErrors={serverErrors}
          hasError={hasError}
          value={userData.email}
        />
        <Password register={register} errors={errors} serverErrors={serverErrors} hasError={hasError} />
        <Avatar register={register} errors={errors} />

        <button className={style.submit} type="submit" onClick={handleSubmit(onEdit)}>
          Save
        </button>
      </form>
    );
  }

  return (
    <form className={style.form} onSubmit={(event) => event.preventDefault()}>
      <h1 className={style.formTitle}>Create new account</h1>
      <Username register={register} errors={errors} serverErrors={serverErrors} hasError={hasError} />
      <Email register={register} errors={errors} serverErrors={serverErrors} hasError={hasError} />
      <Password register={register} errors={errors} serverErrors={serverErrors} hasError={hasError} />
      <ConfirmPassword register={register} errors={errors} password={password} />
      <AcceptTerm register={register} errors={errors} />

      <button className={style.submit} type="submit" onClick={handleSubmit(onRegistration)}>
        Create
      </button>
      <p className={style.signIn}>
        Already have an account? <Link to="/sign-in">Sign In.</Link>
      </p>
    </form>
  );
};

Form.defaultProps = {
  type: 'signup',
};

const mapStateToProps = (state: IState) => ({
  userData: state.user,
});

export default connect(mapStateToProps, actions)(Form);
