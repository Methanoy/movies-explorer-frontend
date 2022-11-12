import { handleResponse } from './utils';
import { MOVIES_API_URL } from './constants';

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