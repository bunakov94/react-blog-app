import React, { Dispatch, MouseEventHandler, SetStateAction } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import style from './Form.module.scss';
import { AcceptTerm, ConfirmPassword, Email, Password, Username } from './Form.fields';
import blogAPI from '../../../helpers/BlogApi';
import { setUserToken } from '../../../helpers/localStorage';
import { IServerErrors, IClientErrors, IFormInput } from './interfaces';
import { setUser } from '../../../store/action-creators/user';
import { ROOT_ROUTE } from '../../../helpers/consts';

interface SignUpProps {
  register: ReturnType<typeof useForm>['register'];
  errors: IClientErrors;
  serverErrors: IServerErrors;
  password: { current: string };
  handleSubmit: (cb: (data: IFormInput) => Promise<void>) => MouseEventHandler<HTMLButtonElement> | undefined;
  setServerErrors: Dispatch<SetStateAction<IServerErrors>>;
}

const SignUp: React.FC<SignUpProps> = ({
  register,
  errors,
  serverErrors,
  password,
  handleSubmit,
  setServerErrors,
}: SignUpProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onRegistration = async (data: IFormInput) => {
    try {
      const res = await blogAPI.registration(data.username, data.email, data.password);
      if (res.errors) throw new Error(JSON.stringify(res.errors));
      const { user } = res;
      setUserToken(user.token);
      dispatch(setUser(res.user));
      history.push(ROOT_ROUTE);
    } catch (error) {
      setServerErrors(JSON.parse(error.message));
    }
  };

  return (
    <form className={style.form} onSubmit={(event) => event.preventDefault()}>
      <h1 className={style.formTitle}>Create new account</h1>
      <Username register={register} errors={errors} serverErrors={serverErrors} />
      <Email register={register} errors={errors} serverErrors={serverErrors} />
      <Password register={register} errors={errors} serverErrors={serverErrors} />
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
