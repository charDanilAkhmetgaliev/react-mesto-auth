import AuthForm from './AuthForm.js'
const Login = () => {
	const handleSubmit = e => {
		e.preventDefault()
	}

	return (
		<div className='login'>
			<AuthForm onSubmit={handleSubmit} formHeader='Вход' buttonText='Войти' />
		</div>
	)
}

export default Login
