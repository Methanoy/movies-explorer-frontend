import { useEffect } from 'react';

function useEscKeydown(handleClosePopup) {
  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        handleClosePopup();
      }
    }
    document.addEventListener('keydown', handleEscClose);
    return () => document.removeEventListener('keydown', handleEscClose);
  });
}

export default useEscKeydown;