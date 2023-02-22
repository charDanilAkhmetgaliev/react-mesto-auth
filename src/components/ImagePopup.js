export default function ImagePopup() {
  return (
    <div className="popup popup_card">
      <figure className="popup__container">
        <img src="src#" alt="" className="popup__image" />
        <figcaption className="popup__label"></figcaption>
        <button type="button" className="popup__close-button" aria-label="Закрыть"></button>
      </figure>
    </div>
  )
}