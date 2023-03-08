import { useState } from "react";

export default function PopupWithForm({ name, isOpen, title, onClose, onOutPopupClick, buttonText, children, onSubmit }) {
  const [butText, setButText] = useState(buttonText);

  function handleSubmit(e) {
    e.preventDefault();
    setButText('Сохранение...');
    onSubmit(e)
    .catch(err => console.log(err))
    .finally(() => setTimeout(setButText, 300, buttonText));
  }

  return (
      <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onOutPopupClick}>
        <div className="popup__container popup__container_form">
          <form className="popup__form" name={name} onSubmit={handleSubmit}>
            <h3 className="popup__title">{title}</h3>
            {children}
            <button type="submit" className="popup__save-button">{butText}</button>
          </form>
          <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={onClose}></button>
        </div>
      </div>
  )
}