import './InfoTooltip.css';
import useEscKeydown from '../../hooks/useEscKeydown';
import allowed from '../../images/auth__allowed.svg';
import denied from '../../images/auth__denied.svg';

function InfoTooltip({ closePopup, isPopupParams }) {
  useEscKeydown(closePopup);

  function handleOutsideClickClose(evt) {
    if (evt.target === evt.currentTarget && isPopupParams.isOpen) {
      closePopup();
    }
  }

  return (
    <section className={`popup ${isPopupParams.isOpen && 'popup_opened'}`} onMouseDown={handleOutsideClickClose}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          aria-label="Закрыть"
          type="button"
          onClick={closePopup}
        ></button>
        <div className="popup__content">
          <img
            className="popup__auth-image"
            src={isPopupParams.status ? allowed : denied}
            alt="Сообщение о результате авторизации"
          ></img>
          <h3 className="popup__title popup__title_auth">{isPopupParams.text}</h3>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;
