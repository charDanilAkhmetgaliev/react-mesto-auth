import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef, useState } from "react";

export default function AddPlacePopup({ isOpen, onClose, onOutPopupClick, onAddPlace, onValidation }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const nameInputRef = useRef();
  const nameSpanRef = useRef();
  const linkInputRef = useRef()
  const linkSpanRef = useRef();

  function handleValidationName() {
    onValidation({ inputElement: nameInputRef.current, spanElement: nameSpanRef.current });
  }

  function handleValidationLink() {
    onValidation({ inputElement: linkInputRef.current, spanElement: linkSpanRef.current });
  }

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
    nameSpanRef.current.textContent = '';
    linkSpanRef.current.textContent = '';
    nameInputRef.current.classList.remove('popup__input_error');
    linkInputRef.current.classList.remove('popup__input_error');
  }, [isOpen])

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
          <input ref={nameInputRef}
                 id="new-card-name-input"
                 type="text"
                 className="popup__input popup__input_value-type_name"
                 onChange={handleChangeName}
                 value={name || ''}
                 name="name"
                 placeholder="Название"
                 minLength="2"
                 maxLength="30"
                 onInput={handleValidationName}
                 required/>
          <span ref={nameSpanRef} className="popup__error new-card-name-input-error"></span>
        </label>
        <label className="popup__input-field">
          <input ref={linkInputRef}
                 id="new-card-url-input"
                 type="url"
                 className="popup__input popup__input_value-type_link"
                 onChange={handleChangeLink}
                 value={link || ''}
                 name="link"
                 placeholder="Ссылка на картинку"
                 onInput={handleValidationLink}
                 required/>
          <span ref={linkSpanRef} className="popup__error new-card-url-input-error"></span>
        </label>
    </PopupWithForm>
  )
}