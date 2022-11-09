import { MOVIES_IMG_URL, SHORT_MOVIE_DURATION} from './constants';

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(
    `${res.status}`,
  ));
};

function convertMinutesToHours(movieDuration) {
  const hours = Math.trunc(movieDuration / 60);
  const minutes = movieDuration % 60;

  return hours === 0 ? `${minutes}м` : `${hours}ч ${minutes}м`;
}

function filterMoviesByUserRequest(movies, request) {
  const filteredList = movies.filter((movie) => {
    const ruMovie = movie.nameRU.toLowerCase();
    const enMovie = movie.nameEN.toLowerCase();
    const convertedSearchRequest = request.toLowerCase();
    const searchResult =
      ruMovie.includes(convertedSearchRequest) ||
      enMovie.includes(convertedSearchRequest);

    return searchResult;
  });
  return filteredList;
}

const shortMovieList = (moviesList) => moviesList.filter(i => i.duration <= SHORT_MOVIE_DURATION);

const makeImgURL = (movieApiImgPath) => `${MOVIES_IMG_URL}${movieApiImgPath}`;

export { handleResponse, convertMinutesToHours, makeImgURL, shortMovieList, filterMoviesByUserRequest };