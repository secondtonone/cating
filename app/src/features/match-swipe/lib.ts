export const changeButtonState = (isDisable: boolean, buttonBlockSelector: string) => {
  const buttons = document.querySelectorAll(buttonBlockSelector);

  buttons.forEach((button) => {
    if (isDisable) {
      button.setAttribute('disabled', '');
    } else {
      button.removeAttribute('disabled');
    }
  });
};
