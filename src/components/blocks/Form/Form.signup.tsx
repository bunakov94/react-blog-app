import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import style from './Form.module.scss';
import { AcceptTerm, ConfirmPassword, Email, Password, Username } from './Form.fields';
import blogAPI from '../../../helpers/BlogApi';
import { setUserToken } from '../../../helpers/localStorage';
import { IServerErrors, IClientErrors, IFormInput } from './interfaces';
import { setUser } from '../../../store/action-creators/user';

interface IProps {
  register: ReturnType<typeof useForm>['register'];
  errors: IClientErrors;
  serverErrors: IServerErrors;
  hasError: boolean;
  password: { current: string };
  handleSubmit: Function;
  setHasError: Function;
  setServerErrors: Function;
}

const SignUp: React.FC<IProps> = ({
  register,
  errors,
  serverErrors,
  hasError,
  password,
  handleSubmit,
  setHasError,
  setServerErrors,
}: IProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onRegistration = async (data: IFormInput) => {
    try {
      const res = await blogAPI.registration(data.username, data.email, data.password);
      if (res.errors) {
        setHasError(true);
        setServerErrors(res.errors);
      }
      const { user } = res;
      setUserToken(user.token);
      dispatch(setUser(res.user));
      history.push('/');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

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

export default SignUp;
