const MAIN_API_URL = 'http://localhost:3000';
const MOVIES_API_URL = 'https://api.nomoreparties.co/beatfilm-movies';
//http://localhost:3000
//https://api.methanoy.nomoredomains.icu

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(
    `Okay, Houston, we've had a problem here: ${res.status}`,
  ));
};

export { MAIN_API_URL, MOVIES_API_URL, handleResponse };