import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const placeNameRef = React.useRef("");
  const placeLinkRef = React.useRef("");

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: placeNameRef.current.value,
      link: placeLinkRef.current.value,
    });
  }

  React.useEffect(() => {
    clearInputs();
  }, [isOpen]);

  function clearInputs() {
    placeNameRef.current.value = "";
    placeLinkRef.current.value = "";
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={"Новое место"}
      name={"add-place"}
      buttonClass={"button_submit_card"}
      buttonText={"Создать"}
    >
      {" "}
      <input
        className="popup__input popup__input_type_place"
        type="text"
        name="photoName"
        id="photoName"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        ref={placeNameRef}
        required
      />
      <span
        id="photoName-error"
        className="popup__error popup__error_visible"
      ></span>
      <input
        className="popup__input popup__input_type_source"
        type="url"
        name="photoSource"
        id="photoSource"
        placeholder="Ссылка на картинку"
        ref={placeLinkRef}
        required
      />
      <span
        id="photoSource-error"
        className="popup__error popup__error_visible"
      ></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
