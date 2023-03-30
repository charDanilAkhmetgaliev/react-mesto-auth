import { useContext } from 'react';

const InfoTooltip = ({
	onClose,
	tooltipIsOpen,
	onOutTooltipClick,
	registerIsSuccess
}) => {
	return (
		<div
			className={`infoTooltip ${tooltipIsOpen && 'infoTooltip_active'}`}
			onClick={onOutTooltipClick}
		>
			<div
				className={`infoTooltip__container ${
					registerIsSuccess
						? 'infoTooltip__container_type_success'
						: 'infoTooltip__container_type_failed'
				}`}
			>
				<p className='infoTooltip__message'>
					{registerIsSuccess
						? 'Вы успешно зарегистрировались!'
						: 'Что-то пошло не так! Попробуйте ещё раз.'}
				</p>
				<button
					className='infoTooltip__close-button'
					onClick={onClose}
				></button>
			</div>
		</div>
	);
};

export default InfoTooltip;
