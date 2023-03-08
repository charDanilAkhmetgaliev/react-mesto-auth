import PopupWithForm from "./PopupWithForm";
import {useEffect, useState} from "react";

export default function AddPlacePopup({ isOpen, onClose, onOutPopupClick, onAddPlace, cards }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit() {
    return onAddPlace({ name, link })
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [cards])

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={'card-add'}
      title={'Новое место'}
      onClose={onClose}
      onOutPopupClick={onOutPopupClick}
      buttonText={'Создать'}
      onSubmit={handleSubmit}>
        <label className="popup__input-field">
          <input id="new-card-name-input"
                 type="text"
                 className="popup__input popup__input_value-type_name"
                 onChange={handleChangeName}
                 value={name || ''}
                 name="name"
                 placeholder="Название"
                 minLength="2"
                 maxLength="30"
                 required/>
          <span className="popup__error new-card-name-input-error"></span>
        </label>
        <label className="popup__input-field">
          <input id="new-card-url-input"
                 type="url"
                 className="popup__input popup__input_value-type_link"
                 onChange={handleChangeLink}
                 value={link || ''}
                 name="link"
                 placeholder="Ссылка на картинку"
                 required/>
          <span className="popup__error new-card-url-input-error"></span>
        </label>
    </PopupWithForm>
  )
}