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
}

const blogApi = new BlogApi();

export default blogApi;
