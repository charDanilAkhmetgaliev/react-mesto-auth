import AuthForm from './AuthForm.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/AuthApi.js';
const Login = () => {
	const navigate = useNavigate();
	const handleSubmit = formValue => {
		return login(formValue)
			.then(jwt => localStorage.setItem('jwt', jwt))
			.then(() => navigate('/', { replace: true }));
	};

	useEffect(() => {
		if (localStorage.getItem('jwt')) {
			navigate('/', { replace: true });
		}
	}, [navigate]);

	return (
		<div className='login'>
			<AuthForm onSubmit={handleSubmit} formHeader='Вход' buttonText='Войти' />
		</div>
	);
};

export default Login;
