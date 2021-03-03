import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'focus-visible';
import ArticleList from './layout/ArticleList';
import Article from './blocks/Article';

import Header from './layout/Header';

const App: React.FC = () => (
  <BrowserRouter>
    <Header />
    <main className="main-content">
      <Switch>
        <Route path="/" component={ArticleList} exact />
        <Route
          path="/articles/:slug"
          render={({ match }) => {
            const { slug } = match.params;
            return <Article slug={slug} />;
          }}
        />
      </Switch>
    </main>
  </BrowserRouter>
);

export default App;
