import useEscKeydown from '../../hooks/useEscKeydown';
import allowed from '../../images/auth__allowed.svg';
import denied from '../../images/auth__denied.svg';

function InfoTooltip({ onClose, infoTooltip }) {
  useEscKeydown(onClose);

  function handleOutsideClickClose(evt) {
    if (evt.target === evt.currentTarget && infoTooltip.isOpen) {
      onClose();
    }
  }

  return (
    <section className='popup popup_opened' onMouseDown={handleOutsideClickClose}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        ></button>
        <div className="popup__content">
          <img
            className="popup__auth-image"
            src={allowed}
            alt="Сообщение о результате авторизации"
          ></img>
          <h3 className="popup__title popup__title_auth">Вы успешно зарегистрировались!</h3>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;
