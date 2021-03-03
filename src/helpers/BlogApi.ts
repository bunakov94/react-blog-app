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
}

// const aaa = {
//   author: {
//     bio: null,
//     following: false,
//     image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
//     username: 'malavita',
//   },

//   body: 'hello world',
//   createdAt: '2021-03-02T19:38:06.044Z',
//   description: 'world',
//   favorited: false,
//   favoritesCount: 0,
//   slug: 'hello-ksmdj9',
//   tagList: [],
//   title: 'hello',
//   updatedAt: '2021-03-02T19:38:06.044Z',
// };

const blogApi = new BlogApi();

export default blogApi;
