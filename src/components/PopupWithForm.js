export default function PopupWithForm({ name, isOpen, title, onClose, onOutPopupClick, buttonText, children, onSubmit }) {
  return (
      <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onOutPopupClick}>
        <div className="popup__container popup__container_form">
          <form className="popup__form" name={name} onSubmit={onSubmit}>
            <h3 className="popup__title">{title}</h3>
            {children}
            <button type="submit" className="popup__save-button">{buttonText}</button>
          </form>
          <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={onClose}></button>
        </div>
      </div>
  )
}