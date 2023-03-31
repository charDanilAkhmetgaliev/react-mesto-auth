import { useContext, useState } from "react";
import { ValidationContext } from '../contexts/ValidationContext';
import Popup from "./Popup.js";

export default function PopupWithForm({ name, isOpen, title, onClose, buttonText, children, onSubmit }) {
  const [butText, setButText] = useState(buttonText);

  const isValid = useContext(ValidationContext);

  function handleSubmit(e) {
    e.preventDefault();
    setButText('Сохранение...');
    onSubmit()
    .then(() => setTimeout(onClose, 300))
    .catch(err => console.log(err))
    .finally(() => setTimeout(setButText, 300, buttonText))
  }

  return (
    <Popup isOpen={isOpen} containerType={'form'} onClose={onClose} name={name}>
      <form className="popup__form" name={name} onSubmit={handleSubmit}>
        <h3 className="popup__title">{title}</h3>
        {children}
        <button type="submit" className={`popup__save-button ${!isValid && 'popup__save-button_inactive'}`}>{butText}</button>
      </form>
    </Popup>
  )
}