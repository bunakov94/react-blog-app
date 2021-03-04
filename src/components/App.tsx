import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'focus-visible';
import SingleArticlePage from './pages/SingleArticlePage/index';

import Header from './layout/Header';
import ArticlesPage from './pages/ArticlesPage';

const App: React.FC = () => (
  <BrowserRouter>
    <Header />
    <main className="main-content">
      <Switch>
        <Route path="/" component={ArticlesPage} exact />
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

export default App;
