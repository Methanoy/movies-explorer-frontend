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
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/Preloader';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function App() {
  const history = useHistory();
  const headerPaths = ["/movies", "/saved-movies", "/profile", "/"];
  const footerPaths = ["/movies", "/saved-movies", "/"];
  // стейты булевы
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isPopupParams, setIsPopupParams] = useState({ isOpen: false, status: true, text: '' })
  const [isPreloader, setIsPreloader] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // стейты объектов
  const [currentUser, setIsCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);

  function closePopup() {
    setIsPopupParams({ ...isPopupParams, isOpen: false })
  }

  function goToLoginPage() {
    history.push('/signin');
  }

  function clearCurrentUsersData() {
    setIsLoggedIn(false);
    setIsCurrentUser({});
    setSavedMovies([]);
    localStorage.clear();
  }

  function handleLikeMovieCard(likedMovie) {
    mainApi
      .addNewMovieCard(likedMovie)
      .then((newMovieCard) => {
        const cardList = [newMovieCard, ...savedMovies];
        setSavedMovies(cardList);
        localStorage.setItem('savedMovies', JSON.stringify(cardList));
      })
      .catch((err) => {
        goToLoginPage();
        clearCurrentUsersData();
        setIsPopupParams({
          isOpen: true,
          status: false,
          text: `Ой, произошла ошибка при добавлении карточки в избранное. ${err}`,
        });
      });
  }

  function handleUnlikeMovieCard(unlikedMovie) {
    mainApi
      .deleteMovieCard(unlikedMovie._id)
      .then(() => {
        const localSavedMoviesCard = JSON.parse(
          localStorage.getItem('savedMovies')
        );
        const rewritedSavedMovieList = localSavedMoviesCard.filter(
          (i) => i.movieId !== unlikedMovie.movieId
        );
        setSavedMovies(rewritedSavedMovieList);
        localStorage.setItem(
          'savedMovies',
          JSON.stringify(rewritedSavedMovieList)
        );
      })
      .catch((err) => {
        goToLoginPage();
        clearCurrentUsersData();
        setIsPopupParams({
          isOpen: true,
          status: false,
          text: `Ой, произошла ошибка при удалении карточки из избранного. ${err}`,
        });
      })
  }

  function handleUpdateUser(data) {
    mainApi
      .editUserInfo(data)
      .then((userData) => {
        setIsCurrentUser(userData);
        setIsPopupParams({
          isOpen: true,
          status: true,
          text: 'Данные обновлены!',
        });
      })
      .catch((err) => {
        goToLoginPage();
        clearCurrentUsersData();
        setIsPopupParams({
          isOpen: true,
          status: false,
          text: `Ой, произошла ошибка при обновлении профиля. ${err}`,
        });
      });
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
        clearCurrentUsersData();
      })
      .catch((err) => setIsPopupParams({ isOpen: true, status: false, text: `Ой, произошла ошибка при завершении сеанса. ${err}` }));
  }

  // проверяет токен
  useEffect(() => {
    const isLoginStatus = localStorage.getItem('login-status') === 'logged-in';
    if (isLoginStatus) {
      auth
        .checkToken()
        .then((data) => {
          if (data) {
            setIsLoggedIn(true);
            setIsCurrentUser(data)
            history.push(headerPaths);
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
          localStorage.setItem('savedMovies', JSON.stringify(likedCards));
        })
        .catch((err) => setIsPopupParams({ isOpen: true, status: false, text: `Ой, произошла ошибка при получении избранных карточек. ${err}` }));
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
              isLoggedIn={isLoggedIn}
              setIsPopupParams={setIsPopupParams}
              setIsDataLoading={setIsDataLoading}
              savedMovies={savedMovies}
              handleLikeMovieCard={handleLikeMovieCard}
              handleUnlikeMovieCard={handleUnlikeMovieCard}
            />
            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              isLoggedIn={isLoggedIn}
              setIsPopupParams={setIsPopupParams}
              setIsDataLoading={setIsDataLoading}
              savedMovies={savedMovies}
              handleLikeMovieCard={handleLikeMovieCard}
              handleUnlikeMovieCard={handleUnlikeMovieCard}
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
