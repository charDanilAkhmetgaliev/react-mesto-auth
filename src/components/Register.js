import AuthForm from './AuthForm.js';
import { NavLink } from 'react-router-dom';
import AuthApi from "../utils/AuthApi.js";
const Register = ({onChangeEmail}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className='register'>
      <AuthForm onSubmit={handleSubmit} formHeader='Регистрация' buttonText='Зарегистрироваться'/>
      <p className="register__login-question">Уже зарегистрированы? <NavLink to='/sign-in'>Войти</NavLink></p>
    </div>
  )
}

export default Register;