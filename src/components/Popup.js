import {useEffect} from "react";

const Popup = ({ name, containerType, isOpen, onClose, children}) => {
  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isOpen, onClose])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`} onClick={handleOverlayClick}>
      <div className={`popup__container popup__container_${containerType}`}>
        {children}
        <button type="button" className='popup__close-button' aria-label="Закрыть" onClick={onClose} ></button>
      </div>
    </div>
  )
}

export default Popup;