import { MOVIES_API_URL, handleResponse } from './utils';

class MoviesApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getMoviesApiData() {
    return fetch(`${this.baseUrl}`, {
      credentials: 'include',
      headers: this.headers,
    }).then(handleResponse);
  }
}

const moivesApi = new MoviesApi({
    baseUrl: MOVIES_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  export default moivesApi;