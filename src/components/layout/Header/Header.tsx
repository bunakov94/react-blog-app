import React from 'react';

import style from './Header.module.scss';

const Header: React.FC = () => (
  <header className={style.header}>
    <a className={style.logo}>Realworld Blog</a>
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
