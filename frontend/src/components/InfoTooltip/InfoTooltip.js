import React from "react";

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__container popup__container_info-tooltip`}>
        <button
          className="popup__close button"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__icon"
          src={props.image}
          alt="Иконка результата регистрации"
        />
        <h2 className={`popup__title popup__title_info-tooltip`}>
          {props.title}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
