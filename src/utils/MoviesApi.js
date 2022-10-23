import { MOVIES_API_URL, handleResponse } from './utils';

class MoviesApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getMoviesApiData() {
    return fetch(`${this.baseUrl}`, {
      headers: this.headers,
    }).then(handleResponse);
  }
}

const moviesApi = new MoviesApi({
    baseUrl: MOVIES_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  export default moviesApi;