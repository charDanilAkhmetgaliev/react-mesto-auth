import AuthForm from './AuthForm.js';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/AuthApi.js';
import {AppContext} from "../contexts/AppContext.js";
import {useContext, useEffect} from "react";
const Login = () => {
	const navigate = useNavigate();
	const value = useContext(AppContext);
	const handleSubmit = formValue => {
		return loginUser(formValue).then(() => {
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
