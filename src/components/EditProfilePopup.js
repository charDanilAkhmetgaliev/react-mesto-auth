import PopupWithForm from "./PopupWithForm";
import { useContext, useEffect, useRef, useState } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function EditProfilePopup({ isOpen, onClose, onOutPopupClick, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser])

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
          <input id="profile-name-input"
                 type="text"
                 className="popup__input popup__input_value-type_name"
                 name="name"
                 minLength="2"
                 maxLength="40"
                 value={name || ''}
                 onChange={handleChangeName}
                 required/>
          <span className="popup__error profile-name-input-error"></span>
        </label>
        <label className="popup__input-field">
          <input id="profile-status-input"
                 type="text"
                 className="popup__input popup__input_value-type_status"
                 name="about"
                 minLength="2"
                 maxLength="200"
                 value={description || ''}
                 onChange={handleChangeDescription}
                 required/>
          <span className="popup__error profile-status-input-error"></span>
      </label>
    </PopupWithForm>
  )
}