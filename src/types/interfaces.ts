export interface IArticle {
  author: {
    bio: null | string;
    following: boolean;
    image: string;
    username: string;
  };

  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
}

export interface IArticlesState {
  articleList: IArticle[];
  currentPage: number;
  currentArticle: IArticle;
}

export interface IState {
  articles: IArticlesState;
}
