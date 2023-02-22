export default function PopupWithForm({ name, isOpen, title, children, onCLose}) {
  return (
    <>
      <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container popup__container_form">
          <form className="popup__form" name={name} noValidate>
            <h3 className="popup__title">{title}</h3>
            {children}
            <button type="submit" className="popup__save-button">Сохранить</button>
          </form>
          <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={onCLose}></button>
        </div>
      </div>
    </>
  )
}