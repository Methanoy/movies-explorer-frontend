import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function SearchForm({ search, isLoggedIn, handleFilterToggle, isFilterOn }) {
  const { values, handleChange, isValid, setIsValid } = useFormWithValidation();
  const [emptyInputMessage, setEmptyInputMessage] = useState('');
  const [notFoundMessage, setNotFoundMessage] = useState('');
  const currentUser = useContext(CurrentUserContext);
  const isMoviesLocation = useLocation().pathname === '/movies';

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
    if (isLoggedIn && currentUser) {
      const lastSearchRequest = JSON.parse(localStorage.getItem('request'));
      if (lastSearchRequest) {
        values.search = lastSearchRequest;
      }
      setIsValid(true);
    }
  }, [isLoggedIn, currentUser, setIsValid]);

  // монтируем сообщение о неудаче при пустом массиве
  useEffect(() => {
    const allMovies = JSON.parse(localStorage.getItem('allMovies'));
    !allMovies.length
      ? setNotFoundMessage('Ничего не найдено.')
      : setNotFoundMessage('');

    const shortMovies = JSON.parse(localStorage.getItem('shortMovies'));
    !shortMovies.length && isFilterOn && search
      ? setNotFoundMessage('Ничего не найдено.')
      : setNotFoundMessage('');
  }, [search, isFilterOn]);

  // сохраняет сообщение об ошибке в разделе movies, а на других страницах отключает
  useEffect(() => {
    !isMoviesLocation && setNotFoundMessage('');
  }, [isMoviesLocation]);

  // очищает сообщение об ошибке после введения в поиск валидного значения
  useEffect(() => {
    setEmptyInputMessage('');
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
          {emptyInputMessage || notFoundMessage}
        </span>
      </div>
    </section>
  );
}

export default SearchForm;