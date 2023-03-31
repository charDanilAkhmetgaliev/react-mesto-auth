import Popup from "./Popup";

export default function ImagePopup({ card, onClose, isOpen }) {
  return (
    <Popup name='image-popup' isOpen={isOpen} onClose={onClose} containerType={'image'}>
      <img src={card.link} alt={`Изображение ${card.name}`} className="popup__image" />
      <figcaption className="popup__label">{card.name}</figcaption>
    </Popup>
  )
}