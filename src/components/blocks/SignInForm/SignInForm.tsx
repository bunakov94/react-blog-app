import React from 'react';
import { Link } from 'react-router-dom';

import style from './SignInForm.module.scss';

const SignInForm = () => (
  <form action="#" className={style.form}>
    <h1 className={style.formTitle}>Sign In</h1>

    <label className={style.formItem}>
      Email address
      <input type="text" className={style.formInput} placeholder="Email address" />
    </label>
    <label className={style.formItem}>
      Password
      <input type="text" className={style.formInput} placeholder="Password" />
    </label>

    <button className={style.submit} type="submit">
      Login
    </button>
    <p className={style.signUp}>
      Already have an account? <Link to="/sign-in">Sign Up.</Link>
    </p>
  </form>
);

export default SignInForm;
