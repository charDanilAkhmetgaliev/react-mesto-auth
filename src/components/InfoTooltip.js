import {AppContext} from "../contexts/AppContext.js";
import {useContext} from "react";

const InfoTooltip = () => {
  const value = useContext(AppContext);

  return (
    <div className='infoTooltip'>
      <div className={`infoTooltip__container ${value.tooltipIsOpen && 'infoTooltip__container_active'}`}>
        <p className="infoTooltip__message">Что-то пошло не так!
          Попробуйте ещё раз.</p>
        <button className="infoTooltip__close-button"></button>
      </div>
    </div>
  )
}

export default InfoTooltip;