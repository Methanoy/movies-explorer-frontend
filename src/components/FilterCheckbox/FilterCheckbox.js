import './FilterCheckbox.css';

function FilterCheckbox() {

  return (
    <div className="filter">
    <span className="filter__decor-line"></span>
      <label className="filter__label">
        <input
          id="search-input"
          className="filter__checkbox"
          type="checkbox"
          name="checkbox"
        />
        <span className="filter__slider"></span>
        <span className="filter__title">Короткометражки</span>
      </label>
    </div>
  );
}

export default FilterCheckbox;