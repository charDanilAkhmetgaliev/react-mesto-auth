const Login = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className='login'>
      <form className='login__form' onSubmit={handleSubmit}>
        <fieldset className='login__form-fields'>
          <legend className='login__header'>Вход</legend>
          <label className='login__form-field'>
            <input id='login-email-input' className='login__input login__input_value-type_email' type='email' placeholder='Email'/>
            <span className='login__error login__error_to_email'></span>
          </label>
          <label className='login__form-field'>
            <input id='login-password-input' className='login__input login__input_value-type_password' type='password' placeholder='Пароль'/>
            <span className='login__error login__error_to_password'></span>
          </label>
        </fieldset>
        <button type='submit' className='login__submit-button'>Войти</button>
      </form>
    </div>
  )
}

export default Login;