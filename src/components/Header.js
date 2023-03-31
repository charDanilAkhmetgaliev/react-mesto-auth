import {Routes, useLocation, Route, Link} from 'react-router-dom';
import React, {useState} from 'react';

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
          <Routes>
            <Route exact path="/" element={
              <div className="header__wrapper">
                <button className={`header__burger ${signIsOpen && 'header__burger_opened'}`} onClick={onClickBurger}/>
                <div className={'header__sign-container header__sign-container_horizontal'}>
                  <p className='header__sign-email' children={userData.email}/>
                  <button className='header__sign-link' children='Выйти' onClick={handleSignOut}/>
                </div>
              </div>
            }/>
            <Route path="/sign-up" element={
              <Link className="header__sign-link" to="/sign-in" children='Войти'/>
            }/>
            <Route path="/sign-in" element={
              <Link className="header__sign-link" to="/sign-up" children='Регистрация'/>
            }/>
          </Routes>
        </div>
      </div>
    </header>
  );
};

export default Header;
