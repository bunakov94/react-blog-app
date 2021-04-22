import React, { Dispatch, FC, MouseEventHandler, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import blogAPI from '../../../helpers/BlogApi';
import { setUserToken } from '../../../helpers/localStorage';
import style from './Form.module.scss';
import { Email, Password } from './Form.fields';
import { IClientErrors, IFormInput, IServerErrors } from './interfaces';
import { setUser } from '../../../store/action-creators/user';

interface LogInProps {
  register: ReturnType<typeof useForm>['register'];
  errors: IClientErrors;
  serverErrors: IServerErrors;
  handleSubmit: (cb: (data: IFormInput) => Promise<void>) => MouseEventHandler<HTMLButtonElement> | undefined;
  setServerErrors: Dispatch<SetStateAction<IServerErrors>>;
}

const LogIn: FC<LogInProps> = ({ setServerErrors, register, errors, serverErrors, handleSubmit }: LogInProps) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogin = async (data: IFormInput) => {
    try {
      const res = await blogAPI.login(data.email, data.password);
      if (res.errors) throw new Error('Email or password invalid!');
      const { user } = res;
      setUserToken(user.token);
      dispatch(setUser(res.user));
      history.push('/');
    } catch (error) {
      setServerErrors({ password: error.message, email: error.message });
    }
  };

  return (
    <form className={style.form} onSubmit={(event) => event.preventDefault()}>
      <h1 className={style.formTitle}>Sign In</h1>
      <Email register={register} errors={errors} serverErrors={serverErrors} />
      <Password register={register} errors={errors} serverErrors={serverErrors} />

      <button className={style.submit} type="submit" onClick={handleSubmit(onLogin)}>
        Login
      </button>
    </form>
  );
};

export default LogIn;
