import { useContext, memo } from "react";
import Card from './Card.js';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default memo(function Main({ onEditAvatar, onEditProfile, onAddPlac, onCardClick, onCardLike, cards, onCardDelete }) {
  const { name, about, avatar } = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-container">
            <img className="profile__avatar" src={avatar} alt="Аватар пользователя" />
            <div className="profile__avatar-overlay"></div>
            <button className="profile__edit-avatar-button" onClick={onEditAvatar} type="button" aria-label="Изменить аватар"></button>
          </div>
          <div className="profile__info">
            <div className="profile__info-container">
              <h1 className="profile__name" aria-label='Имя пользователя'>{name}</h1>
              <button className="profile__edit-button" onClick={onEditProfile} type="button" aria-label="Редактировать"></button>
            </div>
            <p className="profile__status">{about}</p>
          </div>
        </div>
        <button className="profile__add-button" onClick={onAddPlac} type="button" aria-label="Добавить"></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {
            cards.map(({ _id, ...props}) => (
              <Card key={_id}
                    id={_id}
                    onCardClick={onCardClick}
                    onCardLike={onCardLike}
                    onCardDelete={onCardDelete}
                    { ...props } />
            ))
          }
        </ul>
      </section>
    </main>
  )
})