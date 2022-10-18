import './MoviesCard.css';

function MoviesCard() {

  return (
    <li className="card">
      <div className="card__header">
        <div className="card__description-container">
          <h2 className="card__title">33 слова о дизайне</h2>
          <p className="card__duration">1ч 47м</p>
        </div>
        <button className="card__favourite-btn"></button>
      </div>
      <img className="card__img"/>
    </li>
  );
}

export default MoviesCard;