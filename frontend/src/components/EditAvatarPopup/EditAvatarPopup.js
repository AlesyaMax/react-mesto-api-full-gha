import React from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [currentUser]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={"Обновить аватар"}
      name={"avatar"}
      buttonClass={"button_submit_avatar"}
      buttonText={"Сохранить"}
      additionalContainerClass={"popup__container_avatar"}
    >
      <input
        className="popup__input popup__input_type_avatar"
        type="url"
        name="avatarSource"
        id="avatarSource"
        placeholder="Ссылка на картинку"
        ref={avatarRef}
        required
      />
      <span
        id="avatarSource-error"
        className="popup__error popup__error_visible"
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
