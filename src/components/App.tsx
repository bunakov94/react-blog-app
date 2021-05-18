import React, { FC, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'focus-visible';
import { useDispatch } from 'react-redux';
import ArticlePage from './pages/ArticlePage';
import Header from './layout/Header';
import ArticlesPage from './pages/ArticlesPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import NewArticlePage from './pages/NewArticlePage';
import EditArticlePage from './pages/EditArticlePage';
import PrivateRoute from '../helpers/PrivateRoute';
import { fetchUser } from '../store/action-creators/user';
import { getUserToken } from '../helpers/localStorage';
import {
  ARTICLE_ROUTE,
  EDIT_ARTICLE_ROUTE,
  LOGIN_ROUTE,
  NEW_ARTICLE_ROUTE,
  PROFILE_ROUTE,
  ROOT_ROUTE,
  SIGNUP_ROUTE,
} from '../helpers/consts';

const App: FC = () => {
  const isAuth = !!getUserToken();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <main className="main-content">
        <Switch>
          <Route path={ROOT_ROUTE} component={ArticlesPage} exact />
          <Route path={LOGIN_ROUTE} component={SignInPage} exact />
          <Route path={SIGNUP_ROUTE} component={SignUpPage} exact />
          <Route
            path={EDIT_ARTICLE_ROUTE}
            render={({ match }) => {
              const { slug } = match.params;
              return <EditArticlePage slug={slug} />;
            }}
          />
          <Route
            path={ARTICLE_ROUTE}
            render={({ match }) => {
              const { slug } = match.params;
              return <ArticlePage slug={slug} />;
            }}
          />
          <PrivateRoute path={NEW_ARTICLE_ROUTE} auth={isAuth} component={() => <NewArticlePage />} exact />
          <PrivateRoute path={PROFILE_ROUTE} auth={isAuth} component={() => <ProfilePage />} exact />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default App;
