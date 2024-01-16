import AuthWindow from "../AuthWindow/AuthWindow";
import { NavLink } from "react-router-dom";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import React, { useState } from "react";
import Header from "../Header/Header";

const Register = (props) => {
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
          <NavLink to="/sign-in" className="header__text header__text_link">
            Войти
          </NavLink>
        }
      />
      <AuthWindow
        title="Регистрация"
        name="register"
        buttonText="Зарегистрироваться"
        link={
          <NavLink to="/sign-in" className="popup__link">
            Уже зарегистрированы? Войти
          </NavLink>
        }
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
        isOpen={props.isOpen}
        title={props.authText}
        image={props.authImage}
        onClose={props.onClose}
      />
    </>
  );
};

export default Register;
