import { MAIN_API_URL, handleResponse } from './utils';

class MainApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  /* пользователь */
  getInitialUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      credentials: 'include',
      headers: this.headers,
    }).then(handleResponse);
  }

  editUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then(handleResponse);
  }

  /* карточки */
  addNewMovieCard(data) {
    return fetch(`${this.baseUrl}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        owner: data.owner,
        movieId: data.movieId,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    }).then(handleResponse);
  }

  getSavedMoviesData() {
    return fetch(`${this.baseUrl}/movies`, {
      credentials: 'include',
      headers: this.headers,
    }).then(handleResponse);
  }

  deleteMovieCard(data) {
    return fetch(`${this.baseUrl}/movies/${data}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.headers,
    }).then(handleResponse);
  }
}

const mainApi = new MainApi({
  baseUrl: MAIN_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;
