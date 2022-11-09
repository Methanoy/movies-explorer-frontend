import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { shortMovieList, filterMoviesByUserRequest } from '../../utils/utils';
import { React, useState, useEffect } from 'react';

function SavedMovies({
  savedMovies,
  setIsPopupParams,
  handleLikeMovieCard,
  handleUnlikeMovieCard,
}) {
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [allFoundSavedMovies, setAllFoundSavedMovies] = useState([]);
  const [shortSavedMovies, setShortSavedMovies] = useState([]);
  const [isFilterOn, setIsFilterOn] = useState(false);
  const [isCardListEmpty, setIsCardListEmpty] = useState(false);

  function handleFilterToggle() {
    setIsFilterOn(!isFilterOn);
    localStorage.setItem('isSavedFilterOn', JSON.stringify(!isFilterOn));
  }

  function handleSubmittedSavedSearch(request) {
    const filteredSavedList = filterMoviesByUserRequest(savedMovies, request);

    // если после фильтрации массив пуст, показывает попап неудачи и скрывает список фильмов
    if (!filteredSavedList.length) {
      setIsPopupParams({
        isOpen: true,
        status: false,
        text: 'Ничего не найдено.',
      });
      setIsCardListEmpty(true);
    } else {
      // если массив НЕ пуст, сохраняет запрос, фильтр и
      // результат в двух вариантах: короткометражки и полный метр
      setIsCardListEmpty(false);

      setAllFoundSavedMovies(filteredSavedList);
      localStorage.setItem('allSavedMovies', JSON.stringify(filteredSavedList));

      setShortSavedMovies(shortMovieList(filteredSavedList));
      localStorage.setItem(
        'shortSavedMovies',
        JSON.stringify(shortMovieList(filteredSavedList))
      );

      localStorage.setItem('requestSaved', JSON.stringify(request));
    }
  }

  // монтирует из localstorage результаты последнего поиска
  useEffect(() => {
    const allSavedMovieList = JSON.parse(
      localStorage.getItem('allSavedMovies')
    );
    if (allSavedMovieList) {
      setAllFoundSavedMovies(allSavedMovieList);
    }
    const shortSavedMovieList = JSON.parse(
      localStorage.getItem('shortSavedMovies')
    );
    if (shortSavedMovieList) {
      setShortSavedMovies(shortSavedMovieList);
    }
  }, []);

  // монтирует после перезагрузки страницы список фильмов из избранного в зависимости от состояния чекбокса
  useEffect(() => {
    if (!allFoundSavedMovies.length) {
      localStorage.setItem(
        'shortSavedMovies',
        JSON.stringify(shortMovieList(savedMovies))
      ); // отключает notFoundMessage до совершения поиска
      isFilterOn
        ? setDisplayedMovies(shortMovieList(savedMovies))
        : setDisplayedMovies(savedMovies);
    } else {
      isFilterOn
        ? setDisplayedMovies(shortSavedMovies)
        : setDisplayedMovies(allFoundSavedMovies);
    }
  }, [allFoundSavedMovies, shortSavedMovies, isFilterOn, savedMovies]);

  // монтирует из localstorage состояния чекбокса
  useEffect(() => {
    const savedFilterStatus = JSON.parse(
      localStorage.getItem('isSavedFilterOn')
    );
    if (savedFilterStatus) {
      setIsFilterOn(savedFilterStatus);
    }
  }, [isFilterOn]);

  return (
    <section className="saved-movies">
      <SearchForm
        search={handleSubmittedSavedSearch}
        isFilterOn={isFilterOn}
        handleFilterToggle={handleFilterToggle}
      />
      <MoviesCardList
        movies={displayedMovies}
        isFilterOn={isFilterOn}
        isCardListEmpty={isCardListEmpty}
        handleLikeMovieCard={handleLikeMovieCard}
        handleUnlikeMovieCard={handleUnlikeMovieCard}
      />
    </section>
  );
}

export default SavedMovies;