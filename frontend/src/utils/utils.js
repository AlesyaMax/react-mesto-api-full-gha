export const renderLoading = (isLoading, button, text) => {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = text;
  }
};
