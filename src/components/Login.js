const Login = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className='auth'>
      <form className='auth__form' onSubmit={handleSubmit}>
        <fieldset className='auth__form-fields'>
          <legend className='auth__header'>Вход</legend>
          <label className='auth__form-field'>
            <input id='auth-email-input' className='auth__input auth__input_value-type_email' type='email' placeholder='Email'/>
            <span className='auth__error auth__error_to_email'></span>
          </label>
          <label className='auth__form-field'>
            <input id='auth-password-input' className='auth__input auth__input_value-type_password' type='password' placeholder='Пароль'/>
            <span className='auth__error auth__error_to_password'></span>
          </label>
        </fieldset>
        <button type='submit' className='auth__submit-button'>Войти</button>
      </form>
    </div>
  )
}

export default Login;