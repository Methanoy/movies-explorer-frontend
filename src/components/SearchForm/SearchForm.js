import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState, useEffect, useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function SearchForm({ search, isLoggedIn, handleShortMoviesFilter }) {
  const { values, handleChange, isValid, setIsValid } = useFormWithValidation();
  const [isSearchFormSubmit, setIsSearchFormSubmit] = useState(false);
  const [searchError, setSearchError] = useState('');
  const currentUser = useContext(CurrentUserContext);

    const handleSubmitRequest = (evt) => {
        evt.preventDefault();
        if (isValid) {
          search(values.search);
          setIsSearchFormSubmit(true);
        } else {
          setSearchError('Для поиска карточки введите не менее 2-х символов.');
        }
    };

    useEffect(() => {
      if (isLoggedIn && currentUser) {
        const lastSearchRequest = JSON.parse(localStorage.getItem('searchRequest'));
        if (lastSearchRequest) {
          values.search = lastSearchRequest;
        }
        setIsValid(true);
      }
    }, [isLoggedIn, currentUser, setIsValid]);

    useEffect(() => {
      setSearchError('')
    }, [isValid]);

  return (
    <section className="search">
      <div className="search__size-limiter">
        <form className="search__form" name="search" onSubmit={handleSubmitRequest} noValidate>
          <input
            id="search-input"
            className="search__input"
            type="text"
            name="search"
            value={values.search || ""}
            onChange={handleChange}
            minLength="2"
            maxLength="40"
            autoComplete="off"
            placeholder="Фильм"
            required
          />
          <button
            className="search__form-btn"
            type="submit"
            aria-label="Кнопка поиска фильмов"
          ></button>
          <FilterCheckbox isSearchFormSubmit={isSearchFormSubmit} handleShortMoviesFilter={handleShortMoviesFilter} isLoggedIn={isLoggedIn} />
        </form>
        <span className="search__error">{searchError}</span>
      </div>
    </section>
  );
}

export default SearchForm;