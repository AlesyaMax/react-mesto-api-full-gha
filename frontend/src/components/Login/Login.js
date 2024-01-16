import AuthWindow from "../AuthWindow/AuthWindow";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { NavLink } from "react-router-dom";
import Header from "../Header/Header";
import React, { useState } from "react";

const Login = (props) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(formValue);
  };

  return (
    <>
      <Header
        headerLink={
          <NavLink to="/sign-up" className="header__text header__text_link">
            Регистрация
          </NavLink>
        }
      />
      <AuthWindow
        title="Вход"
        name="login"
        buttonText="Войти"
        onSubmit={handleSubmit}
      >
        <input
          className="popup__input popup__input_auth popup__input_type_email"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className="popup__input popup__input_auth popup__input_type_password"
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          onChange={handleChange}
          required
        />
      </AuthWindow>
      <InfoTooltip
        title={props.authText}
        image={props.authImage}
        isOpen={props.isOpen}
        onClose={props.onClose}
      />
    </>
  );
};

export default Login;
