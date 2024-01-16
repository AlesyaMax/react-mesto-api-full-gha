import headerLogo from "../../images/logo.svg";
import React from "react";

function Header(props) {
  return (
    <header className={`header ${props.isMenuOpened ? "header_main" : ""}`}>
      <div
        className={`header__menu-container_main ${
          props.isMenuOpened
            ? "header__menu-container_main_visible"
            : "header__menu-container_main_hidden"
        }
        `}
      >
        <p className="header__text">{props.userEmail}</p>
        {props.headerLink}
      </div>
      <img className="header__logo" src={headerLogo} alt="логотип" />
      <div
        className={`header__menu-container ${
          props.loggedIn ? "header__menu-container_hidden" : ""
        }`}
      >
        <p className="header__text">{props.userEmail}</p>
        {props.headerLink}
      </div>
      {props.loggedIn && (
        <img
          className="header__menu-icon button"
          src={props.menuIcon}
          alr="иконка меню"
          onClick={props.onMenuClick}
        />
      )}
    </header>
  );
}

export default Header;
