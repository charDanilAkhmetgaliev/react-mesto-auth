import React, {useState, useEffect} from "react";
import Header from './Header.js';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
  }

  function handleOutPopupClick(event) {
    if (event.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  return (
    <>
      <Header/>
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlac={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onClose={closeAllPopups}
      />
      <Footer/>
      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        name={'profile-edit'}
        title={'Редактировать профиль'}
        onClose={closeAllPopups}
        onOutPopupClick={handleOutPopupClick}
        buttonText={'Сохранить'}>
        <ul className="popup__inputs">
          <label htmlFor="" className="popup__input-field">
            <input id="profile-name-input" type="text" className="popup__input popup__input_value-type_name"
                   name="name" minLength="2" maxLength="40" placeholder="Имя пользователя" required/>
            <span className="popup__error profile-name-input-error"></span>
          </label>
          <label className="popup__input-field">
            <input id="profile-status-input" type="text" className="popup__input popup__input_value-type_status"
                   name="about" minLength="2" maxLength="200" placeholder="О себе" required/>
            <span className="popup__error profile-status-input-error"></span>
          </label>
        </ul>
      </PopupWithForm>
      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        name={'card-add'}
        title={'Новое место'}
        onClose={closeAllPopups}
        onOutPopupClick={handleOutPopupClick}
        buttonText={'Создать'}>
        <ul className="popup__inputs">
          <label className="popup__input-field">
            <input id="new-card-name-input" type="text" className="popup__input popup__input_value-type_name" name="name" placeholder="Название" minLength="2" maxLength="30" required/>
            <span className="popup__error new-card-name-input-error"></span>
          </label>
          <label className="popup__input-field">
            <input id="new-card-url-input" type="url" className="popup__input popup__input_value-type_link" name="link" placeholder="Ссылка на картинку" required/>
            <span className="popup__error new-card-url-input-error"></span>
          </label>
        </ul>
      </PopupWithForm>
      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        name={'avatar-update'}
        title={'Обновить аватар'}
        onClose={closeAllPopups}
        onOutPopupClick={handleOutPopupClick}
        buttonText={'Сохранить'}>
        <ul className="popup__inputs">
          <label className="popup__input-field">
            <input id="new-card-name-input" type="text" className="popup__input popup__input_value-type_name" name="name" placeholder="Название" minLength="2" maxLength="30" required/>
            <span className="popup__error new-card-name-input-error"></span>
          </label>
          <label className="popup__input-field">
            <input id="new-card-url-input" type="url" className="popup__input popup__input_value-type_link" name="link" placeholder="Ссылка на картинку" required/>
            <span className="popup__error new-card-url-input-error"></span>
          </label>
        </ul>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} onOutPopupClick={handleOutPopupClick}/>
    </>
  )
}

