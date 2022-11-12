import './NotFound.css';

function NotFound({ history }) {

  return (
    <main className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <button
        onClick={() => history.goBack()}
        className="not-found__button"
      >
        Назад
      </button>
    </main>
  );
}

export default NotFound;