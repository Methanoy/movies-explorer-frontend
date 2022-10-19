import './MoviesCard.css';

function MoviesCard({ isSavedMoviesLocation }) {

  return (
    <li className="card">
      <div className="card__header">
        <div className="card__description-container">
          <h2 className="card__title">33 слова о дизайне</h2>
          <p className="card__duration">1ч 47м</p>
        </div>
        <button className={`card__favourite-btn card__favourite-btn_${isSavedMoviesLocation ? "delete" : "active"}`} type="button" aria-label="Добавить карточку в избранные или удалить"></button>
      </div>
      <img className="card__img"/>
    </li>
  );
}

export default MoviesCard;