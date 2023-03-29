import AuthForm from './AuthForm.js';
import { NavLink, useNavigate } from 'react-router-dom';
import {useContext, useEffect} from 'react';
import { registerUser } from '../utils/AuthApi.js';
import {AppContext} from "../contexts/AppContext.js";

const Register = () => {
	const navigate = useNavigate();
	const value = useContext(AppContext);
	const handleSubmit = formValue => {
		return registerUser(formValue)
		.then(() => navigate('/sign-in', { replace: true }));
	};

	useEffect(() => {
		if (value.loggedIn) {
			navigate('/', {replace: true})
		}
	}, [])

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
