import PopupWithForm from "./PopupWithForm";
import {useContext, useEffect, useRef} from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function EditAvatarPopup({ isOpen, onClose, onOutPopupClick, onUpdateAvatar }) {
  const inputLinkRef = useRef();
  const currentUser = useContext(CurrentUserContext);
  function handleSubmit() {
    return onUpdateAvatar({ avatar: inputLinkRef.current.value })
  }

  useEffect(() => {
    inputLinkRef.current.value = '';
  }, [currentUser])

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={'avatar-update'}
      title={'Обновить аватар'}
      onClose={onClose}
      onOutPopupClick={onOutPopupClick}
      buttonText={'Сохранить'}
      onSubmit={handleSubmit}>
        <label className="popup__input-field">
          <input ref={inputLinkRef}
                 id="new-card-url-input"
                 type="url"
                 className="popup__input popup__input_value-type_link"
                 name="link"
                 placeholder="Ссылка на картинку"
                 required/>
          <span className="popup__error new-card-url-input-error"></span>
      </label>
    </PopupWithForm>
  )
}