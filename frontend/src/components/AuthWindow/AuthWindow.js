function AuthWindow(props) {
  return (
    <div className={`popup__container popup__container_auth`}>
      <h2 className={`popup__title popup__title_auth`}>{props.title}</h2>
      <form
        className="popup__form"
        id={`${props.name}`}
        onSubmit={props.onSubmit}
      >
        {props.children}
        <button className={`popup__save popup__save_auth button`} type="submit">
          {props.buttonText}
        </button>
        {props.link}
      </form>
    </div>
  );
}

export default AuthWindow;
