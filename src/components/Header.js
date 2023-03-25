import { NavLink } from "react-router-dom";
export default function Header() {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__sign-container">
        <p className="header__user-email">.@gmail.com</p>
        <NavLink to='sign-in' className="header__sign-button">Регистрация</NavLink>
      </div>
    </header>
  )
}