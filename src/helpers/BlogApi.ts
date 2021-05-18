import { IArticle, ICreateArticle } from '../types/article';

class BlogApi {
  private readonly API_BASE_URL = 'https://conduit.productionready.io/api/';

  private readonly API_ARTICLES_URL = 'articles';

  private readonly API_USERS_URL = 'users';

  private readonly API_USER_URL = 'user';

  private readonly API_LOGIN_URL = '/login';

  private readonly API_FAVORITE_URL = '/favorite';

  generateOffset(count: number, page: number) {
    return `?limit=${count}&offset=${page ? page * count : 0}`;
  }

  async getResources(url: string, token: string, method: string = 'GET', body?: any) {
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: token ? `Token ${token}` : '',
    };
    const res = await fetch(`${this.API_BASE_URL}${url}`, {
      method,
      headers,
      body,
    });
    return res.json();
  }

  async getArticlesPage(pageNumber: number, token: string): Promise<IArticle[]> {
    const currentUrl = `${this.API_ARTICLES_URL}${this.generateOffset(10, pageNumber)}`;
    const { articles } = await this.getResources(currentUrl, token);
    return articles;
  }

  async getArticle(slug: string, token: string) {
    const { article } = await this.getResources(`${this.API_ARTICLES_URL}/${slug}`, token);
    return article;
  }

  async registration(username: string, email: string, password: string) {
    const body = JSON.stringify({
      user: {
        username,
        email,
        password,
      },
    });
    return this.getResources(this.API_USERS_URL, '', 'POST', body);
  }

  async login(email: string, password: string) {
    const body = JSON.stringify({
      user: {
        email,
        password,
      },
    });
    return this.getResources(`${this.API_USERS_URL}${this.API_LOGIN_URL}`, '', 'POST', body);
  }

  async edit(email: string, password: string, username: string, image: string, token: string) {
    const body = JSON.stringify({
      user: {
        email,
        username,
        password,
        image,
      },
    });

    return this.getResources(this.API_USER_URL, token, 'PUT', body);
  }

  async getUser(token: string) {
    return this.getResources(this.API_USER_URL, token, '');
  }

  async createArticle(token: string, article: ICreateArticle) {
    const body = JSON.stringify({
      article: {
        ...article,
      },
    });
    return this.getResources(this.API_ARTICLES_URL, token, 'POST', body);
  }

  async deleteArticle(token: string, slug: string) {
    return this.getResources(`${this.API_ARTICLES_URL}/${slug}`, token, 'DELETE');
  }

  async favoriteArticle(token: string, slug: string) {
    return this.getResources(`${this.API_ARTICLES_URL}/${slug}${this.API_FAVORITE_URL}`, token, 'POST');
  }

  async unfavoriteArticle(token: string, slug: string) {
    return this.getResources(`${this.API_ARTICLES_URL}/${slug}${this.API_FAVORITE_URL}`, token, 'DELETE');
  }
}

const blogApi = new BlogApi();

export default blogApi;
