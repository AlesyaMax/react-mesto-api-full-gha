import Main from "../Main/Main";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import ImagePopup from "../ImagePopup/ImagePopup";
import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Success from "../../images/success.svg";
import Fail from "../../images/fail.svg";
import apiAuth from "../../utils/apiAuth";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import headerMenuOpen from "../../images/menu.svg";
import headerMenuClose from "../../images/Close-Icon-small.svg";
import PageNotFound from "../PageNotFound/PageNotFound";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    cardLink: "",
    cardName: "",
  });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [resultText, setResultText] = useState("");
  const [resultImage, setResultImage] = useState(null);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [authData, setAuthData] = useState({});
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [menuIcon, setMenuIcon] = useState(headerMenuOpen);

  const navigate = useNavigate();

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard({
      cardLink: "",
      cardName: "",
    });
  }

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
    if (loggedIn) {
      navigate("/", { replace: true });
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id || i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c !== card));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(userInfo) {
    api
      .editUserInfo(userInfo)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo.updatedUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatarLink) {
    api
      .editAvatar(avatarLink)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo.updatedUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(cardInfo) {
    api
      .addNewCard(cardInfo)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLoginSubmit(data) {
    apiAuth
      .authorization(data)
      .then((res) => {
        localStorage.setItem("userId", res._id);
        setLoggedIn(true);
        setAuthData(data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        handleFailedAuth();
      });
  }

  function handleSuccessfulAuth() {
    setIsInfoTooltipOpen(true);
    setResultText("Вы успешно зарегистрировались!");
    setResultImage(Success);
    navigate("/signin");
  }

  function handleFailedAuth() {
    setIsInfoTooltipOpen(true);
    setResultText("Что-то пошло не так! Попробуйте ещё раз.");
    setResultImage(Fail);
  }

  function handleRegisterSubmit(data) {
    apiAuth
      .register(data)
      .then((res) => {
        setAuthData(res);
        handleSuccessfulAuth();
      })
      .catch((err) => {
        console.log(err);
        handleFailedAuth();
      });
  }

  function signOut() {
    navigate("/signout", {replace: true});
    api.signOut()
    .then(() => {
      navigate("/signin", {replace: true})
    })
    .catch((err) => {
      console.log(err)
    });
  }

  function handleExit() {
    setLoggedIn(false);
    setAuthData({});
    handleMenuClose();
    localStorage.removeItem("userId");
    signOut();
  }

  function auth() {
    const jwt = localStorage.getItem("userId");
    if (jwt) {
      apiAuth
        .checkAuth(jwt)
        .then((res) => {
          setAuthData(res.user);
          setLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleMenuOpen() {
    setIsMenuOpened(true);
    setMenuIcon(headerMenuClose);
  }

  function handleMenuClose() {
    setIsMenuOpened(false);
    setMenuIcon(headerMenuOpen);
  }

  function handleMenuClick() {
    if (isMenuOpened) {
      handleMenuClose();
    } else {
      handleMenuOpen();
    }
  }

  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      api
        .getCards()
        .then((cardsData) => {
          setCards(cardsData);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
      api
        .getUserInfo()
        .then((userData) => {
          setCurrentUser(userData.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    auth();
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRouteElement
              loggedIn={loggedIn}
              element={Main}
              cardsSet={cards}
              loadingStatus={isLoading}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={setSelectedCard}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              userEmail={authData.email}
              onExit={handleExit}
              isMenuOpened={isMenuOpened}
              onMenuClick={handleMenuClick}
              menuIcon={menuIcon}
            />
          }
        />
        <Route
          path="/signin"
          element={
            <Login
              authText={resultText}
              authImage={resultImage}
              onSubmit={handleLoginSubmit}
              isOpen={isInfoTooltipOpen}
              onClose={closeInfoTooltip}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Register
              authText={resultText}
              authImage={resultImage}
              onSubmit={handleRegisterSubmit}
              isOpen={isInfoTooltipOpen}
              onClose={closeInfoTooltip}
            />
          }
        />
        <Route path="/signout" element={<PageNotFound />} loggedIn={loggedIn} />
        <Route path="*" element={<PageNotFound />} loggedIn={loggedIn} />
      </Routes>

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <PopupWithForm
        title={"Вы уверены?"}
        name={"delete"}
        buttonClass={"popup__save-delete"}
        buttonText={"Да"}
        additionalTitleClass={"popup__title-delete"}
        additionalContainerClass={"popup__container_delete"}
      />
      <ImagePopup
        cardLink={selectedCard.cardLink}
        cardName={selectedCard.cardName}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
