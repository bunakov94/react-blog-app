import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'focus-visible';
import { connect } from 'react-redux';
import SingleArticlePage from './pages/SingleArticlePage/index';
import blogApi from '../helpers/BlogApi';

import Header from './layout/Header';
import ArticlesPage from './pages/ArticlesPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import { getUserToken } from '../helpers/localStorage';
import * as actions from '../redux/actions/user';
import { IUser } from '../types/interfaces';

interface IProps {
  setUser: (payload: IUser) => void;
}

const App: React.FC<IProps> = ({ setUser }: IProps) => {
  useEffect(() => {
    (async () => {
      const UserToken = await getUserToken();
      if (!UserToken) return;
      const user = await blogApi.getUser(UserToken);
      setUser({ ...user.user });
    })();
  }, [setUser]);

  return (
    <BrowserRouter>
      <Header />
      <main className="main-content">
        <Switch>
          <Route path="/" component={ArticlesPage} exact />
          <Route path="/sign-in" component={SignInPage} exact />
          <Route path="/sign-up" component={SignUpPage} exact />
          <Route path="/profile" component={ProfilePage} exact />
          <Route
            path="/articles/:slug"
            render={({ match }) => {
              const { slug } = match.params;
              return <SingleArticlePage slug={slug} />;
            }}
          />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default connect(null, actions)(App);
