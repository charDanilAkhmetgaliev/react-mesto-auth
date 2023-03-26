import {useState} from "react";

const AuthForm = ({ onSubmit, formHeader, buttonText}) => {

  // const handleChangeEmail = (e) => {
  //   setEmail(e.target.value);
  // }
  //
  // const handleChangePassword = (e) => {
  //   setPassword(e.target.value);
  // }

  return (
    <form className='auth__form' onSubmit={onSubmit}>
      <fieldset className='auth__form-fields'>
        <legend className='auth__header'>{formHeader}</legend>
        <label className='auth__form-field'>
          <input id='auth-email-input'
                 className='auth__input auth__input_value-type_email'
                 type='email'
                 placeholder='Email'/>
          <span className='auth__error auth__error_to_email'></span>
        </label>
        <label className='auth__form-field'>
          <input id='auth-password-input'
                 className='auth__input auth__input_value-type_password'
                 type='password'
                 placeholder='Пароль'/>
          <span className='auth__error auth__error_to_password'></span>
        </label>
      </fieldset>
      <button type='submit' className='auth__submit-button'>{buttonText}</button>
    </form>
  )
}

export default AuthForm;