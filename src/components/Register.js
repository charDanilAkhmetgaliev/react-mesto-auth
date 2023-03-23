const Login = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className='register'>
      <form className='register__form' onSubmit={handleSubmit}>
        <fieldset className='register__form-fields'>
          <legend className='register__header'>Вход</legend>
          <label className='register__form-field'>
            <input id='register-email-input' className='register__input register__input_value-type_email' type='email' placeholder='Email'/>
            <span className='register__error register__error_to_email'></span>
          </label>
          <label className='register__form-field'>
            <input id='register-password-input' className='register__input register__input_value-type_password' type='password' placeholder='Пароль'/>
            <span className='register__error register__error_to_password'></span>
          </label>
        </fieldset>
        <button type='submit' className='register__submit-button'>Войти</button>
      </form>
    </div>
  )
}

export default Login;