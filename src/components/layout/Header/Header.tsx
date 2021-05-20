import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import style from './Header.module.scss';
import { getUserToken, removeUserToken } from '../../../helpers/localStorage';

import Avatar from '../../../assets/images/avatar.png';
import { removeUser } from '../../../store/action-creators/user';
import useTypeSelector from '../../../hooks/useTypeSelector';

const Header: React.FC = () => {
  const {
    user: { username, image },
  } = useTypeSelector((state) => state.user);
  const dispatch = useDispatch();
  const isAuth = !!getUserToken();

  return (
    <header className={style.header}>
      <Link to="/" className={style.logo}>
        Realworld Blog
      </Link>
      <div className="auth">
        {!isAuth && (
          <>
            <Link to="/sign-in" className={`${style.button} ${style.signIn}`}>
              Sign In
            </Link>
            <Link to="/sign-up" className={`${style.button} ${style.signUp}`}>
              Sign Up
            </Link>
          </>
        )}

        {isAuth && (
          <div className={style.userInfo}>
            <Link to="/new-article" onClick={() => {}} className={`${style.button} ${style.signUp}`}>
              Create article
            </Link>
            <Link to="/profile" className={`${style.button} ${style.profile}`}>
              {username}
              <img src={image || Avatar} alt="" />
            </Link>
            <Link
              to="/"
              onClick={() => {
                removeUserToken();
                dispatch(removeUser());
                window.location.reload();
              }}
              className={`${style.button} ${style.logOut}`}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
