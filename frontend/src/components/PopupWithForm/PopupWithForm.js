function PopupWithForm({
  isOpen,
  onClose,
  onSubmit,
  title,
  name,
  children,
  buttonClass,
  buttonText,
  additionalTitleClass,
  additionalContainerClass,
}) {
  return (
    <div
      className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}
      id={`popup_${name}`}
    >
      <div className={`popup__container ${additionalContainerClass}`}>
        <button
          className="popup__close button"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className={`popup__title ${additionalTitleClass}`}>{title}</h2>
        <form
          className="popup__form popup__edit"
          id={`${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button className={`popup__save ${buttonClass} button`} type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
