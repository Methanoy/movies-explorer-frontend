import './MoviesCard.css';

function MoviesCard({ movie, isSavedMoviesLocation }) {

  return (
    <li className="card">
      <div className="card__header">
        <div className="card__description-container">
          <h2 className="card__title">{movie.nameRU}</h2>
          <p className="card__duration">{`${movie.duration}м`}</p>
        </div>
        <button className={`card__favourite-btn card__favourite-btn_${isSavedMoviesLocation ? "delete" : "active"}`} type="button" aria-label="Добавить карточку в избранные или удалить"></button>
      </div>
      <a href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
        <img className="card__img" src={movie.image} title={movie.nameRU} alt={movie.description} />
      </a>
    </li>
  );
}

export default MoviesCard;