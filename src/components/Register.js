import AuthForm from './AuthForm.js';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { register } from '../utils/AuthApi.js';

const Register = () => {
	const navigate = useNavigate();
	const handleSubmit = formValue => {
		return register(formValue);
		//.then(() => navigate('/sign-in', { replace: true }));
	};

	useEffect(() => {
		if (localStorage.getItem('jwt')) {
			navigate('/', { replace: true });
		}
	}, [navigate]);

	return (
		<div className='register'>
			<AuthForm
				onSubmit={handleSubmit}
				formHeader='Регистрация'
				buttonText='Зарегистрироваться'
			/>
			<p className='register__login-question'>
				Уже зарегистрированы?{' '}
				<NavLink className='register__login-link' to='/sign-in'>
					Войти
				</NavLink>
			</p>
		</div>
	);
};

export default Register;
