import { Link } from "react-router-dom";

export default function Header({ isLogin }) {

  return (
    <header className="header">
      <div className="header__logo"></div>
      <Link className="header__auth-link" to='/login'>{!isLogin && 'Войти'}</Link>
    </header>
  )
}