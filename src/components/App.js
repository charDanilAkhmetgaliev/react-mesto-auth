import { useState, useEffect } from "react";
import Header from './Header.js';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { ValidationContext} from "../contexts/ValidationContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isValid, setValid] = useState(false);
  const [deletedCardId, setDeletedCardId] = useState('');

  function handleDeleteCardClick(id) {
    setIsDeleteCardPopupOpen(true);
    setValid(true);
    setDeletedCardId(id);
  }

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
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setTimeout(setSelectedCard, 300, {name: '', link: ''});
    setValid(false);
  }

  function handleCardClick(cardData) {
    setIsImagePopupOpen(true);
    setSelectedCard(cardData);
  }

  function handleOutPopupClick(event) {
    if (event.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    api.changeLikeCardStatus(card.id, !isLiked).then((newCard) => {
      setCards((currentCards) => currentCards.map((currentCard) => currentCard._id === card.id ? newCard : currentCard))
    })
    .catch(err => console.log(err));
  }

  function handleCardDelete() {
    return api.deleteCardData(deletedCardId).then(() => {
      setCards((currentCards) => currentCards.filter((currentCard) => currentCard._id !== deletedCardId));
      closeAllPopups();
    })
  }

  function handleUpdateUser(newUserData) {
    return api.updateProfileData(newUserData).then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    })
  }

  function handleUpdateAvatar(avatarData) {
    return api.updateAvatarData(avatarData).then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    })
  }

  function handleAddPlaceSubmit(cardData) {
    return api.sendCardData(cardData).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
  }

  useEffect(() => {
    api.getUserInfo().then((userData) => {
      setCurrentUser(userData);
    })
    .catch(err => console.log(err));

    api.getCardsData().then(cardsData => {
      setCards(cardsData);
    })
    .catch(err => console.log(err));
  }, [])

  function handleValidation({ inputElement, spanElement }) {
    if (!inputElement.validity.valid) {
      setValid(false);
      inputElement.classList.add('popup__input_error');
      spanElement.classList.add('popup__error_active');
      spanElement.textContent = inputElement.validationMessage;
    } else {
      spanElement.textContent = '';
      spanElement.classList.remove('popup__error_active');
      inputElement.classList.remove('popup__input_error');
      setValid(true);
    }
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
          onCardDelete={handleDeleteCardClick}
          cards={cards}
        />
        <ValidationContext.Provider value={isValid}>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onOutPopupClick={handleOutPopupClick}
            onUpdateUser={handleUpdateUser}
            onValidation={handleValidation} />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onOutPopupClick={handleOutPopupClick}
            onUpdateAvatar={handleUpdateAvatar}
            onValidation={handleValidation} />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onOutPopupClick={handleOutPopupClick}
            onAddPlace={handleAddPlaceSubmit}
            onValidation={handleValidation} />
          <PopupWithForm isOpen={isDeleteCardPopupOpen}
                         name={'card-delete'}
                         title={'Вы уверены?'}
                         onClose={closeAllPopups}
                         onOutPopupClick={handleOutPopupClick}
                         onSubmit={handleCardDelete}
                         buttonText={'Да'} />
          <Footer/>
        </ValidationContext.Provider>
      </CurrentUserContext.Provider>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} onOutPopupClick={handleOutPopupClick} isOpen={isImagePopupOpen} />
    </>
  )
}

