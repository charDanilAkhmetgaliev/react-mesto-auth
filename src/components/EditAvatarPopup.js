import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef} from "react";

export default function EditAvatarPopup({ isOpen, onClose, onOutPopupClick, onUpdateAvatar, onValidation }) {

  const linkInputRef = useRef();
  const linkSpanRef = useRef();

  function handleValidationLink() {
    onValidation({ inputElement: linkInputRef.current, spanElement: linkSpanRef.current });
  }

  function handleSubmit() {
    return onUpdateAvatar({ avatar: linkInputRef.current.value })
  }

  useEffect(() => {
    linkInputRef.current.value = '';
    linkSpanRef.current.textContent = '';
    linkInputRef.current.classList.remove('popup__input_error');
  }, [isOpen])

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
          <input ref={linkInputRef}
                 id="new-card-url-input"
                 type="url"
                 className="popup__input popup__input_value-type_link"
                 name="link"
                 placeholder="Ссылка на картинку"
                 onInput={handleValidationLink}
                 required/>
          <span ref={linkSpanRef} className="popup__error new-card-url-input-error"></span>
      </label>
    </PopupWithForm>
  )
}