import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import blogAPI from '../../../helpers/BlogApi';
import { setUserToken } from '../../../helpers/localStorage';
import style from './Form.module.scss';
import { Email, Password } from './Form.fields';
import { IClientErrors, IFormInput, IServerErrors } from './interfaces';

interface IProps {
  setHasError: Function;
  setServerErrors: Function;
  setUser: Function;
  register: ReturnType<typeof useForm>['register'];
  errors: IClientErrors;
  serverErrors: IServerErrors;
  hasError: boolean;
  handleSubmit: Function;
}

const LogIn = ({
  setHasError,
  setServerErrors,
  setUser,
  register,
  errors,
  serverErrors,
  hasError,
  handleSubmit,
}: IProps) => {
  const history = useHistory();

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
};

export default LogIn;
