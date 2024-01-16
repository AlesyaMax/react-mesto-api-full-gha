function ImagePopup({ cardLink, cardName, onClose }) {
  return (
    <div
      className={`popup popup_card popup_darker 
      ${cardLink !== "" ? "popup_opened" : ""}`}
      id="popup_card"
    >
      <figure className="popup__figure">
        <button
          className="popup__close button"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__photo" src={cardLink} alt={cardName} />
        <figcaption className="popup__caption">{cardName}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
