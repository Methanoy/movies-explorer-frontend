import './MoviesCardList.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from './MoviesCard/MoviesCard';
import useScreenSize from '../../hooks/useScreenSize';
import { SCREEN_PARAMS } from '../../utils/constants';

function MoviesCardList(props) {
  const isSavedMoviesLocation = useLocation().pathname === '/saved-movies';
  const { desktop, tablet, mobile } = SCREEN_PARAMS;
  const screenSize = useScreenSize();
  const [cardsDisplayParams, setCardsDisplayParams] = useState({});

  function handleAddMoreBtn() {
      const newCardsAmount = cardsDisplayParams.cardsAmount + cardsDisplayParams.addMore;
      setCardsDisplayParams({ cardsAmount: newCardsAmount, addMore: cardsDisplayParams.addMore });
  }

  function getLikedCard(arr, item) {
    if(arr) {
      const likedCard = arr.find((i) => i.movieId === item.id);
      return likedCard;
    }
  }
  
  useEffect(() => {
    if (!isSavedMoviesLocation) {
      if (screenSize >= desktop.screenSize) {
        setCardsDisplayParams(desktop.cardsParams);
      } else if (screenSize >= tablet.screenSize && screenSize < desktop.screenSize) {
        setCardsDisplayParams(tablet.cardsParams)
      } else {
        setCardsDisplayParams(mobile.cardsParams)
      }
    }
  }, [screenSize, isSavedMoviesLocation, desktop, tablet, mobile])

  return (
    <section className="movies-card-list">
      {!props.isCardListEmpty && (
        <>
          <ul className="movies-card-list__items-container">
            {props.movies
              .slice(0, cardsDisplayParams.cardsAmount)
              .map((movie) => (
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
                cardsDisplayParams.cardsAmount >= props.movies.length) &&
              'movies-card-list__add-more-btn_hidden'
            }`}
            type="button"
            aria-label="Вывести на экран больше карточек фильмов"
            onClick={handleAddMoreBtn}
          >
            Ещё
          </button>
        </>
      )}
    </section>
  );
}

export default MoviesCardList;