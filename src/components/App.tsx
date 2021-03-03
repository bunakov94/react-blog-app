import React from 'react';
import 'focus-visible';
import ArticleList from './layout/ArticleList';
import Header from './layout/Header';

const App: React.FC = () => (
  <>
    <Header />
    <main className="main-content">
      <ArticleList />
    </main>
  </>
);

export default App;
