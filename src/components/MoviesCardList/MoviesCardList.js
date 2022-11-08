import './MoviesCardList.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from './MoviesCard/MoviesCard';
import useScreenSize from '../../hooks/useScreenSize';

function MoviesCardList(props) {
  const isSavedMoviesLocation = useLocation().pathname === '/saved-movies';
  const screenSize = useScreenSize();
  const [cardsDisplayParam, setCardsDisplayParam] = useState({});

  function handleAddMoreBtn() {
      const newCardsAmount = cardsDisplayParam.cardsAmount + cardsDisplayParam.addMore;
      setCardsDisplayParam({ cardsAmount: newCardsAmount, addMore: cardsDisplayParam.addMore });
  }

  function getLikedCard(arr, item) {
    if(arr) {
      const likedCard = arr.find((i) => i.movieId === item.id);
      return likedCard;
    }
  }
  
  useEffect(() => {
    if (!isSavedMoviesLocation) {
      if (screenSize > 1279) {
        setCardsDisplayParam({ cardsAmount: 12, addMore: 3 });
      } else if (screenSize > 766 && screenSize < 1280) {
        setCardsDisplayParam({ cardsAmount: 8, addMore: 2 })
      } else {
        setCardsDisplayParam({ cardsAmount: 5, addMore: 2 })
      }
    }
  }, [screenSize, isSavedMoviesLocation])

  return (
    <section className="movies-card-list">
        <ul className="movies-card-list__items-container">
          {props.movies.slice(0, cardsDisplayParam.cardsAmount).map((movie) => (
            <MoviesCard
              movie={movie}
              key={movie.id || movie.movieId}
              isSavedMoviesLocation={isSavedMoviesLocation}
              liked={getLikedCard(props.savedMovies, movie)}
              handleLikeMovieCard={props.handleLikeMovieCard}
              handleUnlikeMovieCard={props.handleUnlikeMovieCard}
            />
          ))}
        </ul>
      <button
        className={`movies-card-list__add-more-btn ${
          (isSavedMoviesLocation ||
            cardsDisplayParam.cardsAmount >= props.movies.length) &&
          'movies-card-list__add-more-btn_hidden'
        }`}
        type="button"
        aria-label="Вывести на экран больше карточек фильмов"
        onClick={handleAddMoreBtn}
      >
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;