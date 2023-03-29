import AuthForm from './AuthForm.js';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/AuthApi.js';
import {AppContext} from "../contexts/AppContext.js";
import {useContext, useEffect} from "react";
const Login = () => {
	const navigate = useNavigate();
	const value = useContext(AppContext);
	const handleSubmit = formValue => {
		return loginUser(formValue)
			.then((data) => {
				const jwtToken = JSON.stringify(data);
				if (jwtToken) {
					localStorage.setItem('jwt', jwtToken);
					return jwtToken;
				} else {
					console.log(`Ошибка получения jwt, ${jwtToken}`)
				}
			})
			.then(() => {
				value.handleLogin();
				navigate('/', { replace: true })
			})
	};

	return (
		<div className='login'>
			<AuthForm onSubmit={handleSubmit} formHeader='Вход' buttonText='Войти' />
		</div>
	);
};

export default Login;
