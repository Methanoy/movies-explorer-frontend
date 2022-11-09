// const MAIN_API_URL = 'https://api.methanoy.nomoredomains.icu';
const MAIN_API_URL = 'http://localhost:3000';
const MOVIES_API_URL = 'https://api.nomoreparties.co/beatfilm-movies';
const MOVIES_IMG_URL = 'https://api.nomoreparties.co';
const SHORT_MOVIE_DURATION = 40;
const SCREEN_PARAMS = {
    desktop: {
        screenSize: 1280,
        cardsParams: {
            cardsAmount: 12, 
            addMore: 3,
        }
    },
    tablet: {
        screenSize: 768,
        cardsParams: {
            cardsAmount: 8, 
            addMore: 2,
        }
    },
    mobile: {
        screenSize: 480,
        cardsParams: {
            cardsAmount: 5, 
            addMore: 2,
        }
    },
}

export { SCREEN_PARAMS, SHORT_MOVIE_DURATION, MAIN_API_URL, MOVIES_API_URL, MOVIES_IMG_URL };