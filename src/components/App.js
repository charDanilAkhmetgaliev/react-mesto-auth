import {useState, useEffect, useContext} from "react";
import Header from './Header.js';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import {logDOM} from "@testing-library/react";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isOpenImagePopup, setIsOpenImagePopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleSetCards(cardsData) {
    setCards(cardsData);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsOpenImagePopup(false);
    setTimeout(setSelectedCard, 300, {name: '', link: ''});
  }

  function handleCardClick(cardData) {
    setIsOpenImagePopup(true);
    setSelectedCard(cardData);
  }

  function handleOutPopupClick(event) {
    if (event.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  useEffect(() => {
    api.getUserInfo().then((userData) => {
      setCurrentUser(userData);
    })
    .catch(err => console.log(err));
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    api.changeLikeCardStatus(card.id, !isLiked).then((newCard) => {
      setCards((currentCards) => currentCards.map((currentCard) => currentCard._id === card.id ? newCard : currentCard))
    })
    .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCardData(card.id).then((res) => {
      console.log(res.message);
      setCards((currentCards) => currentCards.filter((currentCard) => currentCard._id !== card.id))
    })
    .catch(err => console.log(err));
  }

  function handleUpdateUser(newUserData) {
    api.updateProfileData(newUserData).then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    })
    .catch(err => console.log(err));
  }

  return (
    <>
      <Header/>
      <CurrentUserContext.Provider value={currentUser}>
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlac={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onClose={closeAllPopups}
          onCardLike={handleCardLike}
          cards={cards}
          setCards={handleSetCards}
          onCardDelete={handleCardDelete}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onOutPopupClick={handleOutPopupClick}
          onUpdateUser={handleUpdateUser}>
        </EditProfilePopup>
      </CurrentUserContext.Provider>
      <Footer/>
      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        name={'card-add'}
        title={'Новое место'}
        onClose={closeAllPopups}
        onOutPopupClick={handleOutPopupClick}
        buttonText={'Создать'}>
          <label className="popup__input-field">
            <input id="new-card-name-input" type="text" className="popup__input popup__input_value-type_name" name="name" placeholder="Название" minLength="2" maxLength="30" required/>
            <span className="popup__error new-card-name-input-error"></span>
          </label>
          <label className="popup__input-field">
            <input id="new-card-url-input" type="url" className="popup__input popup__input_value-type_link" name="link" placeholder="Ссылка на картинку" required/>
            <span className="popup__error new-card-url-input-error"></span>
          </label>
      </PopupWithForm>
      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        name={'avatar-update'}
        title={'Обновить аватар'}
        onClose={closeAllPopups}
        onOutPopupClick={handleOutPopupClick}
        buttonText={'Сохранить'}>
          <label className="popup__input-field">
            <input id="new-card-name-input" type="text" className="popup__input popup__input_value-type_name" name="name" placeholder="Название" minLength="2" maxLength="30" required/>
            <span className="popup__error new-card-name-input-error"></span>
          </label>
          <label className="popup__input-field">
            <input id="new-card-url-input" type="url" className="popup__input popup__input_value-type_link" name="link" placeholder="Ссылка на картинку" required/>
            <span className="popup__error new-card-url-input-error"></span>
          </label>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} onOutPopupClick={handleOutPopupClick} isOpen={isOpenImagePopup} />
    </>
  )
}

