import {NavLink, useLocation} from 'react-router-dom';
import {useState} from 'react';

const Header = ({userData, signOut}) => {
  const [signIsOpen, setSignIsOpen] = useState(false);
  const {pathname} = useLocation();

  const onClickBurger = () => {
    if (signIsOpen) {
      setSignIsOpen(false);
    } else {
      setSignIsOpen(true);
    }
  };

  const handleSignOut = () => {
    setSignIsOpen(false);
    signOut();
  };

  return (
    <header className='header'>
      <div className={`header__sign-container ${signIsOpen && 'header__sign-container_active'}`}>
        <p className='header__sign-email' children={userData.email}/>
        <button
          className='header__sign-link'
          children='Выйти'
          onClick={handleSignOut}
        />
      </div>
      <div className='header__content'>
        <div className='header__logo'></div>
        <div className='header__sign-tools'>
          {pathname === '/sign-in' && (
            <NavLink
              to='/sign-up'
              className='header__sign-link'
              children='Регистрация'
            />
          )}
          {pathname === '/sign-up' && (
            <NavLink
              to='/sign-in'
              className='header__sign-link'
              children='Вход'
            />
          )}
          {pathname === '/' && (
            <>
              <button className={`header__burger ${signIsOpen && 'header__burger_opened'}`} onClick={onClickBurger}/>
              <div className={'header__sign-container header__sign-container_horizontal'}>
                <p className='header__sign-email' children={userData.email}/>
                <button
                  className='header__sign-link'
                  children='Выйти'
                  onClick={handleSignOut}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
