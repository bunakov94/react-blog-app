import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'focus-visible';
import { useDispatch } from 'react-redux';
import SingleArticlePage from './pages/SingleArticlePage/index';

import Header from './layout/Header';
import ArticlesPage from './pages/ArticlesPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';

import { fetchUser } from '../store/action-creators/user';

const App: React.FC = () => {
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

export default App;
