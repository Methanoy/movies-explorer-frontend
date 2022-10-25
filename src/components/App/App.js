import './App.css';
import { React, useState, useEffect } from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
/* components */
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
/* utils */
import * as auth from '../../utils/auth';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
/* contexts */
import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {
  const history = useHistory();
  const headerPaths = ['/', '/movies', '/saved-movies', '/profile'];
  const footerPaths = ["/", "/movies", "/saved-movies"];

  const [searchedMovies, setSearchedMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setIsCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleSearchMovie(searchRequest) {
    const initialMoviesList = JSON.parse(localStorage.getItem('allApisMoviesList'));
    if (initialMoviesList.length !== 0) {
      const moviesSortedByUserRequest = initialMoviesList.filter(movie => {
        const movieDescription = movie.description.toLowerCase();
        const ruMovie = movie.nameRU.toLowerCase();
        const enMovie = movie.nameEN.toLowerCase();
        const userRequestData = searchRequest.toLowerCase();
        const searchResult =
          movieDescription.includes(userRequestData) ||
          ruMovie.includes(userRequestData) ||
          enMovie.includes(userRequestData);
        return searchResult;
      });
      if (moviesSortedByUserRequest) {
        localStorage.setItem('searchedMoviesList', JSON.stringify(moviesSortedByUserRequest));
        localStorage.setItem('searchRequest', JSON.stringify(searchRequest));
        setSearchedMovies(moviesSortedByUserRequest);
      } else {
        setSearchedMovies([]);
      }
    }
  }

  function handleSearchSavedMovie(savedMoviesSearchRequest) {
    const savedMoviesList = JSON.parse(localStorage.getItem('savedMoviesList'));
    if (savedMoviesList.length !== 0) {
      const moviesSortedByUserRequest = savedMoviesList.filter(i => {
        const movieDescription = i.description.toLowerCase();
        const ruMovie = i.nameRU.toLowerCase();
        const enMovie = i.nameEN.toLowerCase();
        const userRequestData = savedMoviesSearchRequest.toLowerCase();
        const searchResult =
          movieDescription.includes(userRequestData) ||
          ruMovie.includes(userRequestData) ||
          enMovie.includes(userRequestData);
        return searchResult;
      });
      if (moviesSortedByUserRequest) {
        localStorage.setItem('savedMoviesList', JSON.stringify(moviesSortedByUserRequest));
        setSavedMovies(moviesSortedByUserRequest);
      } else {
        setSearchedMovies([]);
      }
    }
  }

  function handleLikeMovieCard(likedMovie) {
    mainApi
      .addNewMovieCard(likedMovie)
      .then((newMovieCard) => {
        const cardList = [newMovieCard, ...savedMovies];
        setSavedMovies(cardList);
        localStorage.setItem('savedMoviesList', JSON.stringify(cardList));
      })
      .catch((err) => console.log(`Ошибка при добавлении новой карточки фильма: ${err}`))
  }

  function handleUnlikeMovieCard(unlikedMovie) {
    mainApi
      .deleteMovieCard(unlikedMovie._id)
      .then(() => {
        const localSavedMoviesCard = JSON.parse(localStorage.getItem('savedMoviesList'));
        const rewritedSavedMovieList = localSavedMoviesCard.filter(i => i.movieId !== unlikedMovie.movieId);
        setSavedMovies(rewritedSavedMovieList);
        localStorage.setItem('savedMoviesList', JSON.stringify(rewritedSavedMovieList));
      })
      .catch((err) => console.log(`Ошибка при удалении карточки фильма: ${err}`))
  }

  function handleUpdateUser(data) {
    // тут будет прелоадер
    mainApi
      .editUserInfo(data)
      .then((userData) => {
        setIsCurrentUser(userData);
      })
      .catch((err) => console.log(`Ошибка при редактировании данных пользователя: ${err}`))
      //добавить final с прелоадером
      //добавить уведомление о результатах обновления профиля
  }

  function onSignup(userName, userEmail, userPassword) {
    auth
      .signup(userName, userEmail, userPassword)
      .then((res) => {
        if (res) {
          history.push('/signin');
        }
      })
      .catch((err) => {
        console.log(`Ошибка при регистрации пользователя: ${err}`);
      });
  }

  function onLogin(userEmail, userPassword) {
    auth
      .login(userEmail, userPassword)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          history.push('/movies');
          localStorage.setItem('login-status', 'logged-in');
        }
      })
      .catch((err) => {
        console.log(`Ошибка при логине пользователя: ${err}`);
      });
  }

  function onSignout() {
    auth
      .signout()
      .then(() => {
        history.push('/signin');
        setIsLoggedIn(false);
        setIsCurrentUser({});
        setSearchedMovies([]);
        setSavedMovies([]);
        localStorage.removeItem('login-status');
        localStorage.removeItem('allApisMoviesList');
        localStorage.removeItem('searchRequest');
        localStorage.removeItem('searchedMoviesList');
        localStorage.removeItem('savedMoviesList');
      })
      .catch((err) => {
        console.log(`Ошибка при прекращении пользователем сеанса: ${err}`);
      });
  }

  useEffect(() => {
    const token = localStorage.getItem('login-status');
    if (token) {
      auth
        .checkToken()
        .then((data) => {
          if (data) {
            setIsLoggedIn(true);
            setIsCurrentUser(data)
            history.push('/movies');
          }
        })
        .catch((err) => console.log(`Ошибка при авторизации пользователя: ${err}`));
    }
  }, [history]);

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getInitialUserData()
        .then((userData) => {
          setIsCurrentUser(userData);
        })
        .catch((err) => console.log(
          `Ошибка при получении первоначальных данных пользователя с сервера: ${err}`,
        ));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      mainApi
        .getSavedMoviesData()
        .then((likedCards) => {
          setSavedMovies(likedCards);
          localStorage.setItem('savedMoviesList', JSON.stringify(likedCards));
        })
        .catch((err) => console.log(
          `Ошибка при получении первоначальных данных избранных карточек с сервера: ${err}`,
        ));
    }
  }, [isLoggedIn, currentUser]);

  useEffect(() => {
    if (isLoggedIn) {
      moviesApi
        .getMoviesApiData()
        .then((moviesData) => {
          localStorage.setItem('allApisMoviesList', JSON.stringify(moviesData));
        })
        .catch((err) => console.log(
          `Ошибка при получении первоначального списка фильмов от BeatFilm: ${err}`,
        ));
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Route exact path={headerPaths}>
          <Header isLoggedIn={isLoggedIn} />
        </Route>

        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <Route exact path="/signup">
            <Register onSignup={onSignup} />
          </Route>
          <Route exact path="/signin">
            <Login onLogin={onLogin} />
          </Route>

          <ProtectedRoute
            path="/movies"
            component={Movies}
            isLoggedIn={isLoggedIn}
            savedMovies={savedMovies}
            searchedMovies={searchedMovies}
            setSearchedMovies={setSearchedMovies}
            handleSearchMovie={handleSearchMovie}
            handleLikeMovieCard={handleLikeMovieCard}
            handleUnlikeMovieCard={handleUnlikeMovieCard}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            isLoggedIn={isLoggedIn}
            savedMovies={savedMovies}
            setSavedMovies={setSavedMovies}
            handleLikeMovieCard={handleLikeMovieCard}
            handleUnlikeMovieCard={handleUnlikeMovieCard}
            handleSearchSavedMovie={handleSearchSavedMovie}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            onSignout={onSignout}
            isLoggedIn={isLoggedIn}
            handleUpdateUser={handleUpdateUser}
          />

          <Route path="*">
            <NotFound history={history} />
          </Route>
        </Switch>

        <Route exact path={footerPaths}>
          <Footer />
        </Route>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
