import './FilterCheckbox.css';

function FilterCheckbox({ handleFilterToggle, isFilterOn }) {

  return (
    <div className="filter">
    <span className="filter__decor-line"></span>
      <label className="filter__label">
        <input
          id="search-input"
          className="filter__checkbox"
          type="checkbox"
          name="checkbox"
          onChange={handleFilterToggle}
          checked={isFilterOn}
        />
        <span className="filter__slider"></span>
        <span className="filter__title">Короткометражки</span>
      </label>
    </div>
  );
}

export default FilterCheckbox;