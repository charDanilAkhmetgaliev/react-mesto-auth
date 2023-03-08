import { useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
export default function Card({ onCardDelete, onCardClick, onCardLike, owner, likes, link, name, id }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = owner._id === currentUser._id;
  const isLiked = likes.some((like) => like._id === currentUser._id);
  function handleClick() {
    onCardClick({ name, link });
  }

  function handleCardLike() {
    onCardLike({ likes, id });
  }

  function handleCardDelete() {
    onCardDelete({ id });
  }

  return (
    <li className="card">
      <img src={link} alt={`${name}.`} className="card__image" onClick={handleClick} />
      <div className="card__info-container">
        <h2 className="card__title">{name}</h2>
        <div className="card__like-container">
          <button className={`card__like ${isLiked && 'card__like_active'}`} onClick={handleCardLike} type="button" aria-label="Лайк"></button>
          <p className="card__likes-count">{likes.length}</p>
        </div>
      </div>
      {isOwn && (<button className='card__delete-button card__delete-button_active' onClick={handleCardDelete}></button>)}
    </li>
  )
}