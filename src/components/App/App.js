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
import { shortMoviesList, filterMoviesByUserRequest } from '../../utils/utils';
/* contexts */
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/Preloader';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function App() {
  const history = useHistory();
  const headerPaths = ["/", "/movies", "/saved-movies", "/profile"];
  const footerPaths = ["/", "/movies", "/saved-movies"];
  //стейты булевы
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isPopupParams, setIsPopupParams] = useState({ isOpen: false, status: true, text: '' })
  const [isPreloader, setIsPreloader] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFilterOn, setIsFilterOn] = useState(false);
  const [isMovieListEmpty, setIsMovieListEmpty] = useState(false);
  //стейты объектов
  const [currentUser, setIsCurrentUser] = useState({});
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [allFoundMovies, setAllFoundMovies] = useState([]);
  const [shortMovies, setShortMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  function closePopup() {
    setIsPopupParams({ ...isPopupParams, isOpen: false })
  }

  function handleFilterToggle() {
    setIsFilterOn(!isFilterOn);
    localStorage.setItem('isFilterOn', JSON.stringify(!isFilterOn));
  }

  function setFilteredMovieLists(movies, request) {
    // фильтрует массив фильмов API по ключевым символам из запроса пользователя
    const filteredMovieList = filterMoviesByUserRequest(movies, request);
    
    // если после фильтрации массив пуст, показывает попап неудачи и отключает альбом карточек
    if(!filteredMovieList.length) {
      setIsPopupParams({
        isOpen: true,
        status: false,
        text: 'Ничего не найдено.',
      });
      setIsMovieListEmpty(true);
      // если массив НЕ пуст, сохраняет запрос и результат в двух вариантах: короткометражки и полный метр
    } else {
      setIsMovieListEmpty(false);

    setAllFoundMovies(filteredMovieList);
    localStorage.setItem('allMovies', JSON.stringify(filteredMovieList));

    setShortMovies(shortMoviesList(filteredMovieList));
    localStorage.setItem('shortMovies', JSON.stringify(shortMoviesList(filteredMovieList)));

    localStorage.setItem('request', JSON.stringify(request));
    }
  }

  function handleSubmittedMoviesSearch(request) {
    // если список фильмов ранее запрашивался у API, достает его из хранилища и фильтрует
    const movieListFromAPI = JSON.parse(localStorage.getItem('allMoviesAPI'));
    if (movieListFromAPI !== null) {
      setFilteredMovieLists(movieListFromAPI, request);
    } else {
      setIsDataLoading(true);
      moviesApi
        .getMoviesApiData()
        .then((moviesData) => {
          localStorage.setItem('allMoviesAPI', JSON.stringify(moviesData));
          setFilteredMovieLists(moviesData, request);
        })
        .catch((err) =>
          setIsPopupParams({
            isOpen: true,
            status: false,
            text: `Во время запроса произошла ошибка: ${err}. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.`,
          })
        )
        .finally(() => setIsDataLoading(false));
    }
  }

  function handleLikeMovieCard(likedMovie) {
    mainApi
      .addNewMovieCard(likedMovie)
      .then((newMovieCard) => {
        const cardList = [newMovieCard, ...savedMovies];
        setSavedMovies(cardList);
        localStorage.setItem('savedMovieList', JSON.stringify(cardList));
      })
      .catch((err) => setIsPopupParams({ isOpen: true, status: false, text: `Ой, произошла ошибка при добавлении карточки в избранное. ${err}` }));
  }

  function handleUnlikeMovieCard(unlikedMovie) {
    mainApi
      .deleteMovieCard(unlikedMovie._id)
      .then(() => {
        const localSavedMoviesCard = JSON.parse(localStorage.getItem('savedMovieList'));
        const rewritedSavedMovieList = localSavedMoviesCard.filter(i => i.movieId !== unlikedMovie.movieId);
        setSavedMovies(rewritedSavedMovieList);
        localStorage.setItem('savedMovieList', JSON.stringify(rewritedSavedMovieList));
      })
      .catch((err) => setIsPopupParams({ isOpen: true, status: false, text: `Ой, произошла ошибка при удалении карточки из избранного. ${err}` }));
  }

  function handleUpdateUser(data) {
    mainApi
      .editUserInfo(data)
      .then((userData) => {
        setIsCurrentUser(userData);
        setIsPopupParams({ isOpen: true, status: true, text: 'Данные обновлены!' });
      })
      .catch((err) => setIsPopupParams({ isOpen: true, status: false, text: `Ой, произошла ошибка при обновлении профиля. ${err}` }));
  }

  function onSignup(userName, userEmail, userPassword) {
    auth
      .signup(userName, userEmail, userPassword)
      .then((res) => {
        if (res) {
          onLogin(userEmail, userPassword);
          setIsPopupParams({ isOpen: true, status: true, text: 'Вы успешно зарегистрировались!' });
        }
      })
      .catch((err) => setIsPopupParams({ isOpen: true, status: false, text: `Ой, произошла ошибка при регистрации. ${err}` }));
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
      .catch((err) => setIsPopupParams({ isOpen: true, status: false, text: `Ой, произошла ошибка аутентификации. ${err}` }));
  }

  function onSignout() {
    auth
      .signout()
      .then(() => {
        history.push('/');
        setIsLoggedIn(false);
        setIsCurrentUser({});
        setAllFoundMovies([]);
        setShortMovies([]);
        setSavedMovies([]);
        localStorage.clear();
      })
      .catch((err) => setIsPopupParams({ isOpen: true, status: false, text: `Ой, произошла ошибка при завершении сеанса. ${err}` }));
  }

  // проверка токена
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
        .catch((err) => setIsPopupParams({ isOpen: true, status: false, text: `Ой, произошла ошибка аутентифиуации. ${err}` }));
    }
  }, [history]);

  // монтирует данные пользователя
  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getInitialUserData()
        .then((userData) => {
          setIsCurrentUser(userData);
        })
        .catch((err) => setIsPopupParams({ isOpen: true, status: false, text: `Ой, произошла ошибка при загрузке профиля. ${err}` }));
    }
  }, [isLoggedIn]);

  // монтирует избранные карточки
  useEffect(() => {
    if (isLoggedIn && currentUser) {
      mainApi
        .getSavedMoviesData()
        .then((likedCards) => {
          setSavedMovies(likedCards);
          localStorage.setItem('savedMovieList', JSON.stringify(likedCards));
        })
        .catch((err) => setIsPopupParams({ isOpen: true, status: false, text: `Ой, произошла ошибка при получении избранных карточек. ${err}` }));
    }
  }, [isLoggedIn, currentUser]);

  // устанавливает карточек короткометражек либо полного метра
  useEffect(() => {
    if (isFilterOn) {
      setSearchedMovies(shortMovies);
    } else {
      setSearchedMovies(allFoundMovies);
    }
  }, [isFilterOn, shortMovies, allFoundMovies, setSearchedMovies]);

  // монтирует сохраненные результаты после перезагрузки страницы
  useEffect(() => {
    if (isLoggedIn && currentUser) {
      const shortMovieList = JSON.parse(localStorage.getItem('shortMovies'));
      setShortMovies(shortMovieList);
      const allMovieList = JSON.parse(localStorage.getItem('allMovies'));
      setAllFoundMovies(allMovieList);
    }
  }, [isLoggedIn, currentUser]);

  // монтирует состояние чекбокса из локального хранилища
  useEffect(() => {
    if (isLoggedIn && currentUser) {
      const localFilterStatus = JSON.parse(localStorage.getItem('isFilterOn'));
      if (localFilterStatus) {
        setIsFilterOn(localFilterStatus);
      }
    }
  }, [isLoggedIn, currentUser]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {isDataLoading ? (
        <Preloader isPreloader={true} />
      ) : (
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

              handleSubmittedMoviesSearch={handleSubmittedMoviesSearch}
              
              isFilterOn={isFilterOn}
              isLoggedIn={isLoggedIn}
              isMovieListEmpty={isMovieListEmpty}

              searchedMovies={searchedMovies}
              savedMovies={savedMovies}

              handleFilterToggle={handleFilterToggle}
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
              // handleSearchSavedMovie={handleSearchSavedMovie}
              // filterShortSavedMovies={filterShortSavedMovies}
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

          <Preloader isPreloader={isPreloader} />

          <InfoTooltip closePopup={closePopup} isPopupParams={isPopupParams} />
        </div>
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;
