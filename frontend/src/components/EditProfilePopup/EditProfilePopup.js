import React from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={"Редактировать профиль"}
      name={"edit-profile"}
      buttonClass={"button_submit_profile"}
      buttonText={"Сохранить"}
    >
      <input
        className="popup__input popup__input_type_name"
        type="text"
        name="name"
        id="name"
        minLength="2"
        maxLength="40"
        placeholder="Введите имя"
        value={name || ""}
        onChange={handleChangeName}
        required
      />
      <span
        id="name-error"
        className="popup__error popup__error_visible"
      ></span>
      <input
        className="popup__input popup__input_type_description"
        type="text"
        name="about"
        id="about"
        minLength="20"
        maxLength="200"
        placeholder="Расскажите о себе"
        value={description || ""}
        onChange={handleChangeDescription}
        required
      />
      <span
        id="about-error"
        className="popup__error popup__error_visible"
      ></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
