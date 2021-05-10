import React, { FC, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'focus-visible';
import { useDispatch } from 'react-redux';
import ArticlePage from './pages/ArticlePage/index';

import Header from './layout/Header';
import ArticlesPage from './pages/ArticlesPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';

import { fetchUser } from '../store/action-creators/user';
import CreateArticle from './blocks/CreateArticle/CreateArticle';
import EditArticle from './blocks/CreateArticle/EditArticle';
import PrivateRoute from '../helpers/PrivateRoute';
import { getUserToken } from '../helpers/localStorage';

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
          <Route path="/" component={ArticlesPage} exact />
          <Route path="/sign-in" component={SignInPage} exact />
          <Route path="/sign-up" component={SignUpPage} exact />
          <Route
            path="/articles/:slug/edit"
            render={({ match }) => {
              const { slug } = match.params;
              return <EditArticle slug={slug} />;
            }}
          />
          <Route
            path="/articles/:slug"
            render={({ match }) => {
              const { slug } = match.params;
              return <ArticlePage slug={slug} />;
            }}
          />
          <PrivateRoute path="/new-article" auth={isAuth} component={() => <CreateArticle />} exact />
          <PrivateRoute path="/profile" auth={isAuth} component={() => <ProfilePage />} exact />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default App;
