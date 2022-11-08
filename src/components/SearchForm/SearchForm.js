import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function SearchForm({ search, handleFilterToggle, isFilterOn }) {
  const isMoviesLocation = useLocation().pathname === '/movies';
  const { values, handleChange, isValid, setIsValid } = useFormWithValidation();
  const [emptyInputMessage, setEmptyInputMessage] = useState('');
  const [notFoundMessage, setNotFoundMessage] = useState('');

  const handleSubmitRequest = (evt) => {
    evt.preventDefault();
    if (isValid && values.search !== undefined) {
      search(values.search);
    } else {
      setEmptyInputMessage('Нужно ввести ключевое слово.');
    }
  };

  // монтирует в поисковую строку последний запрос из хранилища
  useEffect(() => {
    if (isMoviesLocation) {
      const lastSearchMoviesRequest = JSON.parse(localStorage.getItem('requestMovies'));
      if (lastSearchMoviesRequest) {
        values.search = lastSearchMoviesRequest;
      }
      setIsValid(true);
    } else {
      const lastSearchSavedRequest = JSON.parse(localStorage.getItem('requestSaved'));
      if (lastSearchSavedRequest) {
        values.search = lastSearchSavedRequest;
      }
      setIsValid(true);
    }
  }, [setIsValid, isMoviesLocation]);

  // монтирует сообщение о неудаче при пустом массиве короткометражек
  useEffect(() => {
    if (isMoviesLocation) {
      const shortMovies = JSON.parse(localStorage.getItem('shortMovies'));
      isFilterOn && (shortMovies === null || !shortMovies.length)
        ? setNotFoundMessage('Ничего не найдено.')
        : setNotFoundMessage('');
    } else {
      const shortSavedMovies = JSON.parse(localStorage.getItem('shortSavedMovies'));
      isFilterOn && (shortSavedMovies === null || !shortSavedMovies.length)
        ? setNotFoundMessage('Ничего не найдено.')
        : setNotFoundMessage('');
    }
  }, [isFilterOn, search, isMoviesLocation])

  // очищает сообщение об ошибке после ввода в поисковую строку валидного значения
  useEffect(() => {
    isValid && setEmptyInputMessage('');
  }, [isValid]);

  return (
    <section className="search">
      <div className="search__size-limiter">
        <form
          className="search__form"
          name="search"
          onSubmit={handleSubmitRequest}
          noValidate
        >
          <input
            id="search-input"
            className="search__input"
            type="text"
            name="search"
            value={values.search || ''}
            onChange={handleChange}
            minLength="1"
            maxLength="99"
            autoComplete="off"
            placeholder="Фильм"
            required
          />
          <button
            className="search__form-btn"
            type="submit"
            aria-label="Кнопка поиска фильмов"
          ></button>
          <FilterCheckbox
            handleFilterToggle={handleFilterToggle}
            isFilterOn={isFilterOn}
          />
        </form>
        <span className="search__error">
          {notFoundMessage || emptyInputMessage}
        </span>
      </div>
    </section>
  );
}

export default SearchForm;