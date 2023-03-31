import PopupWithForm from "./PopupWithForm";
import { useContext, useEffect, useRef, useState } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import {useForm} from "../hooks/useForm";

export default function EditProfilePopup({ isOpen, onClose, onOutPopupClick, onUpdateUser, onValidation }) {
  const {values, handleChange, setValues} = useForm({about: '', name: ''})
  const currentUser = useContext(CurrentUserContext);

  const nameInputRef = useRef();
  const nameSpanRef = useRef();
  const descInputRef = useRef();
  const descSpanRef = useRef();

  function handleValidationName() {
    onValidation({ inputElement: nameInputRef.current, spanElement: nameSpanRef.current });
  }

  function handleValidationDesc() {
    onValidation({ inputElement: descInputRef.current, spanElement: descSpanRef.current });
  }

  function handleSubmit() {
    return onUpdateUser(values);
  }

  useEffect(() => {
    setValues({ name: currentUser.name, about: currentUser.about });
    nameInputRef.current.classList.remove('popup__input_error');
    descInputRef.current.classList.remove('popup__input_error');
    nameSpanRef.current.textContent = '';
    descSpanRef.current.textContent = '';
  }, [isOpen])

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={'profile-edit'}
      title={'Редактировать профиль'}
      onClose={onClose}
      onOutPopupClick={onOutPopupClick}
      buttonText={'Сохранить'}
      onSubmit={handleSubmit}>
        <label className="popup__input-field">
          <input ref={nameInputRef}
                 id="profile-name-input"
                 type="text"
                 className="popup__input popup__input_value-type_name"
                 name="name"
                 minLength="2"
                 maxLength="40"
                 value={values.name || ''}
                 onChange={handleChange}
                 onInput={handleValidationName}
                 required/>
          <span ref={nameSpanRef} className="popup__error profile-name-input-error"></span>
        </label>
        <label className="popup__input-field">
          <input ref={descInputRef} id="profile-status-input"
                 type="text"
                 className="popup__input popup__input_value-type_status"
                 name="about"
                 minLength="2"
                 maxLength="200"
                 value={values.about || ''}
                 onChange={handleChange}
                 onInput={handleValidationDesc}
                 required/>
          <span ref={descSpanRef} className="popup__error profile-status-input-error"></span>
      </label>
    </PopupWithForm>
  )
}