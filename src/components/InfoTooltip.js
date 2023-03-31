import {useContext} from 'react';
import Popup from "./Popup";

const InfoTooltip = ({onClose, tooltipIsOpen, registerIsSuccess}) => {
  return (
    <Popup onClose={onClose} isOpen={tooltipIsOpen} containerType='tooltip' name='tooltip'>
      <div className={`infoTooltip__image ${registerIsSuccess ? 'infoTooltip__image_type_success' : 'infoTooltip__image_type_failed'}`}/>
      <p className='infoTooltip__message'>
        {registerIsSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
      </p>
    </Popup>
  );
};

export default InfoTooltip;
