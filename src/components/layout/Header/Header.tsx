import React from 'react';
import { Link } from 'react-router-dom';

import style from './Header.module.scss';

const Header: React.FC = () => (
  <header className={style.header}>
    <Link to="/" className={style.logo}>
      Realworld Blog
    </Link>
    <div className="auth">
      <button type="button" className={`${style.button} ${style.signIn}`}>
        Sign In
      </button>
      <button type="button" className={`${style.button} ${style.signUp}`}>
        Sign Up
      </button>
    </div>
  </header>
);

export default Header;
