import { ICreateArticle } from '../types/article';

const limit = (count: number, pageNumber: number) => `limit=${count}&offset=${pageNumber ? pageNumber * count : 0}`;

class BlogApi {
  API_BASE_URL = 'https://conduit.productionready.io/api/';

  async getResources(url: string) {
    const res = await fetch(`${this.API_BASE_URL}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return res.json();
  }

  async getPostsPage(pageNumber: number) {
    const response = await this.getResources(`/articles?${limit(10, pageNumber)}`);
    return response.articles;
  }

  async getPost(slug: string) {
    const response = await this.getResources(`/articles/${slug}`);
    return response.article;
  }

  async registration(username: string, email: string, password: string) {
    const res = await fetch(`${this.API_BASE_URL}users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
        },
      }),
    });
    return res.json();
  }

  async login(email: string, password: string) {
    const res = await fetch(`${this.API_BASE_URL}users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    });
    return res.json();
  }

  async edit(email: string, password: string, username: string, image: string, token: string) {
    const res = await fetch(`${this.API_BASE_URL}user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        user: {
          email,
          username,
          password,
          image,
        },
      }),
    });
    return res.json();
  }

  async getUser(token: string) {
    const res = await fetch(`${this.API_BASE_URL}user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`Could not fetch, received ${res.status}`);
    }
    return res.json();
  }

  async createArticle(token: string, article: ICreateArticle) {
    const res = await fetch(`${this.API_BASE_URL}articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        article: {
          ...article,
        },
      }),
    });
    return res.json();
  }
}

const blogApi = new BlogApi();

export default blogApi;
