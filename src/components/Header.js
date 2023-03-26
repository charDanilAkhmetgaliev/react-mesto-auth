import { NavLink } from "react-router-dom";
export default function Header() {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__sign-container">
        {/*<p className="header__user-email">mailname@gmail.com</p>*/}
        <NavLink to='sign-up' className="header__sign-link">Регистрация</NavLink>
      </div>
    </header>
  )
}