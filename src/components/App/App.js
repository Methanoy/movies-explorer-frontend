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
  const headerPaths = ["/", "/movies", "/saved-movies", "/profile"];
  const footerPaths = ["/", "/movies", "/saved-movies"];
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setIsCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleUserMoviesSearch(userRequest) {
    const initialMoviesList = JSON.parse(localStorage.getItem('initialMoviesList'));
    if (initialMoviesList.length !== 0) {
      const moviesSortByUserRequest = initialMoviesList.filter(movie => {
        const movieDescription = movie.description.toLowerCase();
        const ruMovie = movie.nameRU.toLowerCase();
        const enMovie = movie.nameEN.toLowerCase();
        const userRequestData = userRequest.toLowerCase();
        const movieSearchResult = (movieDescription || ruMovie || enMovie).includes(userRequestData);
        return movieSearchResult;
      });
      if (moviesSortByUserRequest) {
        setMovies(moviesSortByUserRequest);
      } else {
        setMovies([]);
      }
    }
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
        localStorage.removeItem('login-status');
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
    if (isLoggedIn) {
      // тут будет прелоадер
      moviesApi
        .getMoviesApiData()
        .then((moviesData) => {
          localStorage.setItem('initialMoviesList', JSON.stringify(moviesData));
        })
        .catch((err) => console.log(
          `Ошибка при получении первоначального списка фильмов от BeatFilm: ${err}`,
        ));
        //добавить final с прелоадером
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

          <ProtectedRoute path="/movies" component={Movies} isLoggedIn={isLoggedIn} movies={movies} handleUserMoviesSearch={handleUserMoviesSearch} />
          <ProtectedRoute path="/saved-movies" component={SavedMovies} isLoggedIn={isLoggedIn} />
          <ProtectedRoute path="/profile" component={Profile} isLoggedIn={isLoggedIn} onSignout={onSignout} handleUpdateUser={handleUpdateUser} />

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
