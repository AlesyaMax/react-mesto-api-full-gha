import React from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Card({
  cardData,
  handleCardClick,
  handleCardLike,
  handleDeleteClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = cardData.owner._id === currentUser._id;
  const isLiked = cardData.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like button ${
    isLiked && "elements__like_active"
  }`;

  function handleClick() {
    handleCardClick({ cardLink: cardData.link, cardName: cardData.name });
  }

  function handleLike() {
    handleCardLike(cardData);
  }

  function handleDelete() {
    handleDeleteClick(cardData);
  }

  return (
    <>
      {isOwn && (
        <button
          className="elements__delete button"
          onClick={handleDelete}
        ></button>
      )}
      <img
        className="elements__photo"
        src={cardData.link}
        alt={cardData.name}
        onClick={handleClick}
      />
      <div className="elements__caption">
        <h2 className="elements__text">{cardData.name}</h2>
        <div className="elements__like-area">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLike}
          ></button>
          <p className="elements__like-counter">{cardData.likes.length}</p>
        </div>
      </div>
    </>
  );
}

export default Card;
