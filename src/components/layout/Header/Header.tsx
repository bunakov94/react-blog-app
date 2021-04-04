import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/user';
import style from './Header.module.scss';
import { IState } from '../../../types/interfaces';
import { IUser } from '../../../redux/reducers/user';
import { getUserToken, removeUserToken } from '../../../helpers/localStorage';

import Avatar from '../../../assets/images/Avatar.png';

interface IProps {
  user: IUser;
  setUser: Function;
}

const Header: React.FC<IProps> = ({ user, setUser }: IProps) => {
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
              {user.username}
              <img src={user.image ? user.image : Avatar} alt="" />
            </Link>
            <Link
              to="/"
              onClick={() => {
                removeUserToken();
                setUser({});
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

const mapStateToProps = (state: IState) => ({
  user: state.user,
});

export default connect(mapStateToProps, actions)(Header);
