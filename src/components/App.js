import { useState, useEffect } from "react";
import Header from './Header.js';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

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

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    api.changeLikeCardStatus(card.id, !isLiked).then((newCard) => {
      setCards((currentCards) => currentCards.map((currentCard) => currentCard._id === card.id ? newCard : currentCard))
    })
    .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCardData(card.id).then((res) => {
      setCards((currentCards) => currentCards.filter((currentCard) => currentCard._id !== card.id))
    })
    .catch(err => console.log(err));
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
          onCardDelete={handleCardDelete}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onOutPopupClick={handleOutPopupClick}
          onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onOutPopupClick={handleOutPopupClick}
          onUpdateAvatar={handleUpdateAvatar} />
      </CurrentUserContext.Provider>
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onOutPopupClick={handleOutPopupClick}
        onAddPlace={handleAddPlaceSubmit}
        cards={cards}
      />
      <Footer/>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} onOutPopupClick={handleOutPopupClick} isOpen={isOpenImagePopup} />
    </>
  )
}

