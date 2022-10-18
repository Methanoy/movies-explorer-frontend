import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {

    const handleSubmit = (evt) => {
        evt.preventDefault();
    };

  return (
    <section className="search">
      <div className="search__size-limiter">
        <form className="search__form" name="search" onSubmit={handleSubmit}>
          <input
            id="search-input"
            className="search__input"
            type="text"
            name="search"
            //   value={}
            //   onChange={}
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
          <FilterCheckbox />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;