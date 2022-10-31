// const MAIN_API_URL = 'https://api.methanoy.nomoredomains.icu';
const MAIN_API_URL = 'http://localhost:3000';
const MOVIES_API_URL = 'https://api.nomoreparties.co/beatfilm-movies';
const MOVIES_IMG_URL = 'https://api.nomoreparties.co';

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
  if(hours === 0) {
    return `${minutes}м`;
  } else {
    return `${hours}ч ${minutes}м`;
  }
}

const shortMoviesList = (moviesList) => moviesList.filter(i => i.duration <= 40);

const makeImgURL = (movieApiImgPath) => `${MOVIES_IMG_URL}${movieApiImgPath}`;


export { MAIN_API_URL, MOVIES_API_URL, MOVIES_IMG_URL, handleResponse, convertMinutesToHours, makeImgURL, shortMoviesList };