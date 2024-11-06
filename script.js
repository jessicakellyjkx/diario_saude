let currentScreen = 1;
const totalScreens = 3;

function showScreen(screenNumber) {
  document.querySelectorAll('.screen').forEach((screen, index) => {
    screen.classList.toggle('active', index + 1 === screenNumber);
  });
}

document.querySelectorAll('.btn').forEach((button, index) => {
  button.addEventListener('click', () => {
    currentScreen = currentScreen < totalScreens ? currentScreen + 1 : 1;
    showScreen(currentScreen);
  });
});

showScreen(currentScreen);
