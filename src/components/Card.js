export default function Card({ name, link, likes}) {
  return (
    <li className="card">
      <img src={link} alt="Изображение места" className="card__image" />
      <div className="card__info-container">
        <h2 className="card__title">{name}</h2>
        <div className="card__like-container">
          <button className="card__like" type="button" aria-label="Лайк"></button>
          <p className="card__likes-count">{likes.length}</p>
        </div>
      </div>
      <button className="card__delete-button"></button>
    </li>
  )
}