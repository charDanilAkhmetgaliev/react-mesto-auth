import { useEffect, useState } from 'react';
const AuthForm = ({ onSubmit, formHeader, buttonText }) => {
	const [formValue, setFormValue] = useState({
		password: '',
		email: ''
	});
	const resetForm = () => {
		setFormValue({
			password: '',
			email: ''
		});
	};
	const handleChange = e => {
		const { name, value } = e.target;

		setFormValue({
			...formValue,
			[name]: value
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		return onSubmit(formValue)
			.then(() => resetForm())
			.catch(err => console.log(err));
	};

	return (
		<form className='auth__form' onSubmit={handleSubmit}>
			<fieldset className='auth__form-fields'>
				<legend className='auth__header'>{formHeader}</legend>
				<label className='auth__form-field'>
					<input
						id='auth-email-input'
						name='email'
						className='auth__input auth__input_value-type_email'
						type='email'
						placeholder='Email'
						onChange={handleChange}
						value={formValue.email}
					/>
					<span className='auth__error auth__error_to_email'></span>
				</label>
				<label className='auth__form-field'>
					<input
						id='auth-password-input'
						name='password'
						className='auth__input auth__input_value-type_password'
						type='password'
						placeholder='Пароль'
						onChange={handleChange}
						value={formValue.password}
					/>
					<span className='auth__error auth__error_to_password'></span>
				</label>
			</fieldset>
			<button type='submit' className='auth__submit-button'>
				{buttonText}
			</button>
		</form>
	);
};

export default AuthForm;
