import React from "react";
import Card from "../Card/Card.js";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";
import Header from "../Header/Header";
import { NavLink } from "react-router-dom";
import Footer from "../Footer/Footer.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header
        headerLink={
          <NavLink
            to="/signin"
            className="header__text header__text_link"
            onClick={props.onExit}
          >
            Выйти
          </NavLink>
        }
        loggedIn={props.loggedIn}
        userEmail={props.userEmail}
        isMenuOpened={props.isMenuOpened}
        onMenuClick={props.onMenuClick}
        menuIcon={props.menuIcon}
      />
      <main>
        <section className="profile">
          <img
            className="profile__avatar profile__avatar-photo"
            src={currentUser.avatar}
            alt="Фото профиля"
          />
          <button
            className="profile__avatar-editor button"
            type="button"
            onClick={props.onEditAvatar}
          ></button>
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit button"
            type="button"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__description">{currentUser.about}</p>
          <button
            className="profile__add button"
            type="button"
            onClick={props.onAddPlace}
          ></button>
        </section>
        {props.loadingStatus ? (
          <p></p>
        ) : (
          <section className="elements">
            {props.cardsSet.map((card) => (
              <article key={card._id} className="elements__item">
                <Card
                  cardData={card}
                  handleCardClick={props.onCardClick}
                  handleCardLike={props.onCardLike}
                  handleDeleteClick={props.onCardDelete}
                />
              </article>
            ))}
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Main;
