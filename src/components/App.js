import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { ValidationContext } from '../contexts/ValidationContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import PopupWithForm from './PopupWithForm.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import { getContent } from '../utils/AuthApi.js';
import { AppContext } from '../contexts/AppContext.js';
import InfoTooltip from './InfoTooltip.js';

export default function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
	const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
	const [currentUser, setCurrentUser] = useState({});
	const [cards, setCards] = useState([]);
	const [isValid, setValid] = useState(false);
	const [deletedCardId, setDeletedCardId] = useState('');
	const isOpen =
		isAddPlacePopupOpen ||
		isEditAvatarPopupOpen ||
		isEditProfilePopupOpen ||
		isImagePopupOpen;
	const [loggedIn, setLoggedIn] = useState(false);
	const [userData, setUserData] = useState({
		_id: '',
		email: ''
	});
	const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
	const [registerIsSuccess, setRegisterIsSuccess] = useState(false);
	const navigate = useNavigate();

	const handleRegisterToSuccess = () => {
		setRegisterIsSuccess(true);
	};

	const handleRegisterToFailed = () => {
		setRegisterIsSuccess(false);
	};

	const handleTooltipToOpen = () => {
		setTooltipIsOpen(true);
	};

	const handleLogin = () => {
		setLoggedIn(true);
	};

	// обработчик клика кнопки удаления карточки
	function handleDeleteCardClick(id) {
		setIsDeleteCardPopupOpen(true);
		setValid(true);
		setDeletedCardId(id);
	}
	// обработчик клика кнопки изменения аватара
	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}
	// обработчик клика кнопки редактирования профиля
	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	}
	// обработчик клика кнопки создания карточки
	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}
	// обработчик клика по карточке
	function handleCardClick(cardData) {
		setIsImagePopupOpen(true);
		setSelectedCard(cardData);
	}
	// функция закрытия всех попапов
	function closeAllPopups() {
		setIsEditAvatarPopupOpen(false);
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsImagePopupOpen(false);
		setIsDeleteCardPopupOpen(false);
		setTimeout(setSelectedCard, 300, { name: '', link: '' });
		setValid(false);
		setTooltipIsOpen(false);
	}

	// обработчик клика проставления лайка
	function handleCardLike(card) {
		const isLiked = card.likes.some(like => like._id === currentUser._id);
		api
			.changeLikeCardStatus(card.id, !isLiked)
			.then(newCard => {
				setCards(currentCards =>
					currentCards.map(currentCard =>
						currentCard._id === card.id ? newCard : currentCard
					)
				);
			})
			.catch(err => console.log(err));
	}
	// обработчик клика удаления лайка
	function handleCardDelete() {
		return api.deleteCardData(deletedCardId).then(() => {
			setCards(currentCards =>
				currentCards.filter(currentCard => currentCard._id !== deletedCardId)
			);
		});
	}
	// обработчик обновления данных профиля
	function handleUpdateUser(newUserData) {
		return api.updateProfileData(newUserData).then(userData => {
			setCurrentUser(userData);
		});
	}
	// обработчик обновления аватара
	function handleUpdateAvatar(avatarData) {
		return api.updateAvatarData(avatarData).then(userData => {
			setCurrentUser(userData);
		});
	}
	// обработчик добавления новой карточки
	function handleAddPlaceSubmit(cardData) {
		return api.sendCardData(cardData).then(newCard => {
			setCards([newCard, ...cards]);
		});
	}

	const getUserAuthData = jwt => {
		return getContent(jwt.token).then(res => {
			setLoggedIn(true);
			const userData = {
				_id: res.data._id,
				email: res.data.email
			};
			setUserData(userData);
		});
	};

	const tokenCheck = () => {
		if (localStorage.getItem('jwt')) {
			const jwt = JSON.parse(localStorage.getItem('jwt'));
			if (jwt) {
				getUserAuthData(jwt)
					.then(() => {
						navigate('/', { replace: true });
					})
			}
		} else {
			navigate('sign-in', { replace: true });
		}
	};

	useEffect(() => {
		tokenCheck();
	}, [loggedIn]);

	// хук для реализации закрытия попапов на Escape
	useEffect(() => {
		function closeByEscape(e) {
			if (e.key === 'Escape') {
				closeAllPopups();
			}
		}

		if (isOpen || tooltipIsOpen) {
			document.addEventListener('keydown', closeByEscape);
			return () => {
				document.removeEventListener('keydown', closeByEscape);
			};
		}
	}, [isOpen, tooltipIsOpen]);
	// хук для получения исходных данных с сервера
	useEffect(() => {
		api
			.getUserInfo()
			.then(userData => {
				setCurrentUser(userData);
			})
			.catch(err => console.log(err));

		api
			.getCardsData()
			.then(cardsData => {
				setCards(cardsData);
			})
			.catch(err => console.log(err));
	}, []);
	// обработчик валидации форм
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

	const signOut = () => {
		localStorage.removeItem('jwt');
		setLoggedIn(false);
		setUserData({
			_id: '',
			email: ''
		});
		navigate('/sign-in', { replace: true });
	};

	return (
		<>
			<Header userData={userData} signOut={signOut} />
			<CurrentUserContext.Provider value={currentUser}>
				<ValidationContext.Provider value={isValid}>
					<AppContext.Provider value={{ loggedIn: loggedIn, handleLogin: handleLogin }}>
						<Routes>
							<Route path='/' element={
									<ProtectedRoute
										element={Main}
										onEditProfile={handleEditProfileClick}
										onAddPlac={handleAddPlaceClick}
										onEditAvatar={handleEditAvatarClick}
										onCardClick={handleCardClick}
										onClose={closeAllPopups}
										onCardLike={handleCardLike}
										onCardDelete={handleDeleteCardClick}
										cards={cards}
										loggedIn={loggedIn}/>
								}/>
							<Route path='/sign-up' element={
									<Register
										handleTooltipToOpen={handleTooltipToOpen}
										handleRegisterToSuccess={handleRegisterToSuccess}
										handleRegisterToFailed={handleRegisterToFailed}/>
							}/>
							<Route path='/sign-in' element={<Login />} />
						</Routes>
						<InfoTooltip
							onClose={closeAllPopups}
							tooltipIsOpen={tooltipIsOpen}
							registerIsSuccess={registerIsSuccess}
						/>
					</AppContext.Provider>
					<EditProfilePopup
						isOpen={isEditProfilePopupOpen}
						onClose={closeAllPopups}
						onUpdateUser={handleUpdateUser}
						onValidation={handleValidation}
					/>
					<EditAvatarPopup
						isOpen={isEditAvatarPopupOpen}
						onClose={closeAllPopups}
						onUpdateAvatar={handleUpdateAvatar}
						onValidation={handleValidation}
					/>
					<AddPlacePopup
						isOpen={isAddPlacePopupOpen}
						onClose={closeAllPopups}
						onAddPlace={handleAddPlaceSubmit}
						onValidation={handleValidation}
					/>
					<PopupWithForm
						isOpen={isDeleteCardPopupOpen}
						name={'card-delete'}
						title={'Вы уверены?'}
						onClose={closeAllPopups}
						onSubmit={handleCardDelete}
						buttonText={'Да'}
					/>
				</ValidationContext.Provider>
			</CurrentUserContext.Provider>
			<Footer />
			<ImagePopup
				card={selectedCard}
				onClose={closeAllPopups}
				isOpen={isImagePopupOpen}
			/>
		</>
	);
}
